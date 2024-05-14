import PropTypes from 'prop-types'
import Masonry from 'react-masonry-css'

import Pin from './Pin'

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  700: 2,
  500: 1,
}

const MasonryLayout = ({ pins }) => {
  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='flex animate-slide-fwd'
      >
        {pins?.map(pin => (
          <Pin key={pin._id} pin={pin} className='w-max' />
        ))}
      </Masonry>
    </div>
  )
}

MasonryLayout.propTypes = {
  pins: PropTypes.array.isRequired,
}

export default MasonryLayout
