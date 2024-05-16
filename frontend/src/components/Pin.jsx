import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import PinOverlay from './PinOverlay'

import { urlFor } from '../client'
import { fetchUser } from '../utils/fetchUser'
import useIsMobileOrTablet from '../hooks/useIsMobileOrTablet'

const Pin = ({ pin: { image, _id, save } }) => {
  const [saveList, setSaveList] = useState(save)
  const [postHovered, setPostHovered] = useState(false)
  const [alreadySaved, setAlreadySaved] = useState(false)
  const navigate = useNavigate()
  const isMoblieOrTablet = useIsMobileOrTablet()
  const user = fetchUser()

  useEffect(() => {
    if (!user) return
    const alreadySaved = saveList?.some(
      item => item?.postedBy?._id === user?.sub,
    )
    setAlreadySaved(alreadySaved)
  }, [user, saveList])

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
          <PinOverlay
            user={user}
            alreadySaved={alreadySaved}
            saveList={saveList}
            setSaveList={setSaveList}
            pinId={_id}
            image={image}
          />
        )}
      </div>
    </div>
  )
}

Pin.propTypes = {
  pin: PropTypes.shape({
    image: PropTypes.object.isRequired,
    _id: PropTypes.string.isRequired,
    save: PropTypes.array,
  }),
}

export default Pin
