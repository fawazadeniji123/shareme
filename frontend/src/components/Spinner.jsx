import PropTypes from 'prop-types'
import { Circles } from 'react-loader-spinner'

const Spinner = ({ message }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <Circles
        color='#00BFFF'
        height={'50'}
        width={'200'}
        wrapperClass='m-5'
        visible={true}
      />
      <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

Spinner.propTypes = {
  message: PropTypes.string,
}

export default Spinner
