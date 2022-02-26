import * as ImagePicker from 'expo-image-picker'
// import { ANDROID_CLIENT_ID } from '@env'
// import * as Google from "expo-google-app-auth"
// import * as GoogleSignIn from 'expo-google-sign-in'


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

// export const googleAuth = async (setLoading, GoogleAuth) => {
//    try {
//       const { user, type } = await Google.logInAsync({
//          androidClientId: '280822769053-ej7fl7piqqav380rggbkdbdc52pvmsvq.apps.googleusercontent.com',
//          androidStandaloneAppClientId: ANDROID_CLIENT_ID,
//          clientId: ANDROID_CLIENT_ID
//       })
//       setLoading(true)

//       if (type === "success") {
//          const { email, name, photoUrl } = user
//          GoogleAuth({
//             variables: {
//                email,
//                name,
//                image: photoUrl,
//             }
//          })
//       } else {
//          setLoading(false)
//       }
//    } catch (error) {
//       setLoading(false)
//       alert(error)
//    }
// }

// export const googleInit = async () => {
//    try {
//       await GoogleSignIn.initAsync({
//          clientId: ANDROID_CLIENT_ID
//       })
//    } catch ({ message }) {
//       alert('GoogleSignIn.initAsync(): ' + message)
//    }
// }

// export const handleGoogleSignIn = async () => {
//    try {
//       await GoogleSignIn.askForPlayServicesAsync()
//       const { type, user } = await GoogleSignIn.signInAsync()
//       const { email, displayName, photoURL } = user

//       if (type === 'success') {
//          alert('success')
//          GoogleAuth({
//             variables: {
//                email,
//                name: displayName,
//                image: photoURL,
//             }
//          })
//       } else {
//          alert('failed')
//       }
//    } catch (error) {
//       alert(error)
//    }
// }
