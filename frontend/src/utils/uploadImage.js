export const uploadImage =
  (setWrongImageType, setImageAsset, setLoading, client) => async e => {
    const { type, name } = e.target.files[0]

    if (
      !(
        type === 'image/png' ||
        type === 'image/jpgg' ||
        type === 'image/svg' ||
        type === 'image/gif' ||
        type === 'image/tiff'
      )
    ) {
      return setWrongImageType(true)
    }

    try {
      setWrongImageType(false)
      setLoading(true)
  
      const document = await client.assets.upload('image', e.target.files[0], {
        contentType: type,
        fileName: name,
      })
  
      setImageAsset(document)
      setLoading(false)
    } catch (error) {
      console.log('Image upload error', error)
    }
  }
