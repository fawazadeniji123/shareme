import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

import { client, urlFor } from '../client'
import { fetchUser } from '../utils/fetchUser'

const Pin = ({ pin: { image, postedBy, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false)
  const [savingPost, setSavingPost] = useState(false)
  const navigate = useNavigate()

  const user = fetchUser()

  const alreadySaved = save?.includes(user.googleId)

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
        {postHovered && (
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
              {alreadySaved ? <button>Saved</button> : <button>Save</button>}
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
