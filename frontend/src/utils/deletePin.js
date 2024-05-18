import { client } from '../client'
import { pinQuery } from './data'

export const deletePin = async (pinId, setSaveList) => {
  try {
    await client.delete(pinId)
  } catch (error) {
    console.error(error)
  }

  const data = await client.fetch(pinQuery(pinId))
  setSaveList(data[0].save)
}
