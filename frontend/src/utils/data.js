export const userQuery = userId => {
  const query = `*[_type == "user" && _id == "${userId}"]`

  return query
}

export const userPinsQuery = userId => {
  const query = `*[_type == "pin" && postedBy._ref == "${userId}"] | order(_createdAt desc){
    image {
      asset-> {
        url
      }
    },
    _id,
    destination,
    postedBy-> {
      _id,
      userName,
      image {
        asset-> {
          url
        }
      }
    },
    save[] {
      _key,
      postedBy-> {
        _id
        userName,
        image 
        }
      }
    }
  }`

  return query
}

export const pinQuery = pinId => {
  const query = `*[_type == "pin" && _id == "${pinId}"] {
    image {
      asset-> {
        url
      }
    },
    _id,
    destination,
    postedBy-> {
      _id,
      userName,
      image {
        asset-> {
          url
        }
      }
    },
    save[] {
      _key,
      postedBy-> {
        _id
        userName,
        image 
        }
      }
    }
  }`

  return query
}

export const searchQuery = searchTerm => {
  const query = `*[_type == "pin" && title match "${searchTerm}*" || category match "${searchTerm}*" || about match "${searchTerm}*"] | order(_createdAt desc){
    image {
      asset-> {
        url
      }
    },
    _id,
    destination,
    postedBy-> {
      _id,
      userName,
      image {
        asset-> {
          url
        }
      }
    },
    save[] {
      _key,
      postedBy-> {
        _id
        userName,
        image 
        }
      }
    }
  }`

  return query
}

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc){
    image {
      asset-> {
        url
      }
    },
    _id,
    destination,
    postedBy-> {
      _id,
      userName,
      image {
        asset-> {
          url
        }
      }
    },
    save[] {
      _key,
      postedBy-> {
        _id
        userName,
        image 
        }
      }
    }
  }`


