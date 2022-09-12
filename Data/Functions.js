import * as ImagePicker from 'expo-image-picker'

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

// from multiline input to an array then to a string sperated by '‖'
export const joinLines = str => str.split(/\r?\n/).join('‖')

// from string separated by '‖' to an array to a multiline string
export const separateLines = str => str.split('‖').join("\n")

// string separated by '‖' to an array
export const splitLines = str => str.split('‖')