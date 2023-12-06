import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'

import { CLOUDINARY_URL, CLOUDINARY_PRESET } from '@utils/constants'

const useImageUploader = (initialImage) => {
  const [image, setImage] = useState(initialImage)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const requestPermissions = async () => {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (permissionResult.granted === false) {
        setError('Permission to access camera roll is required!')
      }
    }

    requestPermissions()
  }, [])

  const uploadImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    })

    if (pickerResult.canceled) {
      setError('Image upload cancelled.')
      return
    }

    const base64Img = `data:image/jpg;base64,${pickerResult.assets[0].base64}`

    const data = {
      file: base64Img,
      upload_preset: CLOUDINARY_PRESET,
    }

    setLoading(true)

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
      })

      const { secure_url } = await response.json()
      setImage(secure_url)
    } catch (err) {
      console.error({ err })
      setError('Error uploading image.')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    image,
    error,
    uploadImage,
  }
}

export default useImageUploader
