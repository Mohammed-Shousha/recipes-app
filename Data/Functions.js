import * as ImagePicker from 'expo-image-picker'
import { ANDROID_CLIENT_ID, ANDROID_CLIENT_ID_PRODUCTION } from '@env'
import * as Google from "expo-google-app-auth"


export const uploadImage = async (setLoading, setImage) => {
   let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

   if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!")
      return
   }

   let pickerResult = await ImagePicker.launchImageLibraryAsync({ base64: true })

   if (!pickerResult.cancelled) { // if not cancelled upload image to cloudinary
      let base64Img = `data:image/jpg;base64,${pickerResult.base64}`

      let data = {
         file: base64Img,
         upload_preset: 'recipes_preset'
      }

      setLoading(true)
      const response = await fetch("https://api.cloudinary.com/v1_1/dn8thrc9l/image/upload", {
         method: "POST",
         body: JSON.stringify(data),
         headers: {
            'content-type': 'application/json'
         }
      })

      const { secure_url } = await response.json()
      setImage(secure_url)
      setLoading(false)
   }
}

export const googleAuth = async (setLoading, GoogleAuth) => {
   try {
      const result = await Google.logInAsync({
         androidClientId: ANDROID_CLIENT_ID,
         androidStandaloneAppClientId: ANDROID_CLIENT_ID_PRODUCTION
      })
      setLoading(true)

      if (result.type === "success") {
         const { email, name, photoUrl } = result.user
         GoogleAuth({
            variables: {
               email,
               name,
               image: photoUrl,
            }
         })
      } else {
         setLoading(false)
      }
   } catch (error) {
      setLoading(false)
   }
}