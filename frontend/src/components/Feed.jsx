import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState([])
  const { categoryId } = useParams()

  // ! TODO: search for users

  useEffect(() => {
    setLoading(true)

    if (categoryId) {
      const query = searchQuery(categoryId)
      client
        .fetch(query)
        .then(data => {
          setPins(data)
          setLoading(false)
        })
        .catch(error => {
          console.error(error)
          setLoading(false)
        })
    } else {
      client
        .fetch(feedQuery)
        .then(data => {
          setPins(data)
          setLoading(false)
        })
        .catch(error => {
          console.error(error)
          setLoading(false)
        })
    }
  }, [categoryId])

  if (loading)
    return <Spinner message='we are adding new ideas to your feed...' />
  return (
    <div>
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <h1 className='text-center mt-5'>No pins available</h1>
      )}
    </div>
  )
}

export default Feed
