import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Navbar, Feed, PinDetail, CreatePin, Search } from '../components'

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Feed searchTerm={searchTerm} />} />
          <Route
            path='/categories/:categoryId'
            element={<Feed searchTerm={searchTerm} />}
          />
          <Route
            path='/search'
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
          <Route
            path='/pin-detail/:pinId'
            element={<PinDetail user={user} />}
          />
          <Route path='/create-pin' element={<CreatePin user={user} />} />
        </Routes>
      </div>
    </div>
  )
}

Pins.propTypes = {
  user: PropTypes.object,
}

export default Pins
