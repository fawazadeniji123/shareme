import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
// import { IoIosArrowForward } from 'react-icons/io'
import { MdAccountCircle } from 'react-icons/md'
import PropTypes from 'prop-types';

import logo from '../assets/logo.png'

const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
const isActiveStyle =
  'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'

const categories = [
  { name: 'Animals' },
  { name: 'Coding' },
  { name: 'Wallpapers' },
  { name: 'Photography' },
  { name: 'Gaming' },
  { name: 'Other' },
]

const handleCloseSidebar = closeToggle => () => {
  if (closeToggle) closeToggle(false)
}

const Sidebar = ({ user, closeToggle }) => {
  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar '>
      <div className='flex flex-col'>
        <Link
          to={'/'}
          className='flex px-5 my-6 pt-1 w-190 items-center'
          onClick={handleCloseSidebar(closeToggle)}
        >
          <img src={logo} alt='ShareMe Logo' className='w-full' />
        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar(closeToggle)}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map(category => (
            <NavLink
              to={`/categories/${category.name}`}
              key={category.name}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar(closeToggle)}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user ? (
        <Link
          className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
          onClick={handleCloseSidebar(closeToggle)}
        >
          <img
            src={user.image}
            alt='User Profile'
            className='w-10 h-10 rounded-full'
          />{' '}
          <p>{user.userName}</p>
        </Link>
      ) : (
        <Link
          to={'/login'}
          className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
        >
          <MdAccountCircle fontSize={40} className='cursor-pointer' />
          Login
        </Link>
      )}
    </div>
  )
}


Sidebar.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    _type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  }),
  closeToggle: PropTypes.func,
}

export default Sidebar
