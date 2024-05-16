import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

import { client, urlFor } from '../client'
import { pinQuery } from '../utils/data'
import { fetchUser } from '../utils/fetchUser'

const savePin = (pinId, user, alreadySaved, navigate, save, setSaveList) => {
  if (!user) {
    navigate('/login')
    return
  }

  if (!alreadySaved) {
    try {
      client
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
        .then(() => {
          client.fetch(pinQuery(pinId)).then(data => {
            console.log(data)
            setSaveList(data[0].save)
          })
        })
    } catch (error) {
      console.error(error)
    }
  } else {
    try {
      const saved = save?.find(item => item?.postedBy?._id === user?.sub)
      const saveId = saved?._key
      console.log(saveId)

      client
        .patch(pinId)
        .unset([`save[_key=="${saveId}"]`])
        .commit()
        .then(() => {
          client.fetch(pinQuery(pinId)).then(data => {
            console.log(data)
            setSaveList(data[0].save)
          })
        })
    } catch (error) {
      console.error(error)
    }
  }
}

const handleSave =
  (pinId, user, alreadySaved, navigate, saveList, setSaveList) => e => {
    e.stopPropagation()
    e.target.disabled = true

    savePin(pinId, user, alreadySaved, navigate, saveList, setSaveList)

    e.target.disabled = false
  }

const Pin = ({ pin: { image, postedBy, _id, destination, save } }) => {
  const [saveList, setSaveList] = useState(save)
  const [postHovered, setPostHovered] = useState(false)
  const navigate = useNavigate()

  // check if device is tablet or mobile
  const isMoblieOrTablet =
    window.innerWidth < 1024 && window.matchMedia('(pointer: coarse)').matches

  const user = fetchUser()

  const alreadySaved = saveList?.some(item => item?.postedBy?._id === user?.sub)
  // console.log(save, user.sub, alreadySaved)

  return (
    <div className='m-2 '>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
        <img
          src={urlFor(image).width(250).url()}
          alt='User post'
          className='rounded-lg w-full'
        />
        {(postHovered || isMoblieOrTablet) && (
          <div
            style={{ height: '100%' }}
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
          >
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <a
                  href={'#'}
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()

                    // only download if user is signed in, else redirect to sign in
                    if (!user) {
                      navigate('/login')
                      return
                    }

                    // if user is signed in, download the image
                    const a = document.createElement('a')
                    a.href = `${image?.asset?.url}?dl=`
                    a.download = 'image.jpg'
                    a.click()
                    a.remove()
                  }}
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  className='flex items-center justify-between opacity-70 text-red-600 hover:opacity-100 font-bold px-1 py-1 text-base rounded-3xl hover:shadow-md outline-none transition-all duration-100 ease-in'
                  onClick={handleSave(
                    _id,
                    user,
                    alreadySaved,
                    navigate,
                    saveList,
                    setSaveList,
                  )}
                >
                  <AiFillHeart className='text-lg' />
                  <span className='px-1'>
                    {saveList?.length ? saveList?.length : null}
                  </span>
                </button>
              ) : (
                <button
                  className='flex items-center justify-between opacity-70 text-white hover:text-red-600 hover:opacity-100 font-bold px-1 py-1 text-base rounded-3xl hover:shadow-md outline-none transition-all duration-100 ease-in'
                  onClick={handleSave(
                    _id,
                    user,
                    alreadySaved,
                    navigate,
                    saveList,
                    setSaveList,
                  )}
                >
                  <AiOutlineHeart className=' text-lg' />
                  <span className='px-1'>
                    {saveList?.length ? saveList?.length : null}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

Pin.propTypes = {
  pin: PropTypes.shape({
    image: PropTypes.object.isRequired,
    postedBy: PropTypes.object.isRequired,
    _id: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    save: PropTypes.array,
  }).isRequired,
}

export default Pin
