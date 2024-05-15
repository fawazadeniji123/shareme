import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

import { client, urlFor } from '../client'

const Pin = ({ pin: { image, postedBy, _id, destination } }) => {
  return (
    <div>
      <img
        src={urlFor(image).width(250).url()}
        alt='User post'
        className='rounded-lg w-full'
      />
    </div>
  )
}

export default Pin
