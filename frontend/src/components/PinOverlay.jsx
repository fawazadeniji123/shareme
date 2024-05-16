import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { handleSave } from '../utils/handleSave'

const PinOverlay = ({
  user,
  alreadySaved,
  saveList,
  setSaveList,
  pinId,
  image,
}) => {
  const navigate = useNavigate()

  return (
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
              if (!user) {
                navigate('/login')
                return
              }
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
        <button
          className={`flex items-center justify-between opacity-70 ${
            alreadySaved ? 'text-red-600' : 'text-white'
          } hover:opacity-100 font-bold px-1 py-1 text-base rounded-3xl hover:shadow-md outline-none transition-all duration-100 ease-in`}
          onClick={handleSave(pinId, user, saveList, setSaveList, navigate)}
        >
          {alreadySaved ? (
            <AiFillHeart className='text-lg' />
          ) : (
            <AiOutlineHeart className=' text-lg' />
          )}
          <span className='px-1'>{saveList?.length || null}</span>
        </button>
      </div>
    </div>
  )
}

PinOverlay.propTypes = {
  user: PropTypes.object,
  alreadySaved: PropTypes.bool,
  saveList: PropTypes.array,
  setSaveList: PropTypes.func.isRequired,
  pinId: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
}

export default PinOverlay
