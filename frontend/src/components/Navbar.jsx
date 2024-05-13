import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'
import { MdAccountBox } from 'react-icons/md'

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  user = null
  const navigate = useNavigate()

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex w-full justify-start items-center px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className='ml-1' />
        <input
          type='search'
          placeholder='Search...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onFocus={() => navigate('/search')}
          className='w-full p-2 outline-none bg-white'
        />
      </div>
      <div className='flex gap-3'>
        {user ? (
          <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
            <img
              src={user?.image}
              alt='User Profile'
              className='w-14 h-12 rounded-lg justify-center items-center'
            />
          </Link>
        ) : (
          <Link
            to={'/login'}
            className='w-12 h-12 md:w-14 md:h-12 rounded-lg flex justify-center items-center'
          >
            <MdAccountBox fontSize={60} />
          </Link>
        )}
        <Link
          to='/create-pin'
          className='bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  )
}

Navbar.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  user: PropTypes.object,
}

export default Navbar
