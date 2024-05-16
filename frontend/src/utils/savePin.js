import { client } from '../client'
import { pinQuery } from './data'
import { v4 as uuidv4 } from 'uuid'

export const savePin = async (pinId, user, saveList, setSaveList, navigate) => {
  if (!user) {
    navigate('/login')
    return
  }

  const alreadySaved = saveList?.some(item => item?.postedBy?._id === user?.sub)

  try {
    if (!alreadySaved) {
      await client
        .patch(pinId)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [
          {
            _key: uuidv4(),
            userid: user?.sub,
            postedBy: {
              _type: 'postedBy',
              _ref: user?.sub,
            },
          },
        ])
        .commit()
    } else {
      const saved = saveList?.find(item => item?.postedBy?._id === user?.sub)
      const saveId = saved?._key

      await client
        .patch(pinId)
        .unset([`save[_key=="${saveId}"]`])
        .commit()
    }

    const data = await client.fetch(pinQuery(pinId))
    setSaveList(data[0].save)
  } catch (error) {
    console.error(error)
  }
}
