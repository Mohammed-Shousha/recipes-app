import React, { useContext, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Container, RowContainer } from '../../Components/Containers'
import { EditImage, Icon, PressableIcon, UserImage } from '../../Components/Images'
import { Line, Text, Title } from '../../Components/Texts'
import { DataContext } from '../../Data/Context'
import { userDetails } from '../../Data/Database'
import user from '../../Data/images/chef.png'
import edit from '../../Data/images/edit.png'


const User = () => {

   const { setIsSignedIn } = useContext(DataContext)
   const [userImage, setUserImage] = useState(null)

   let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (permissionResult.granted === false) {
         alert("Permission to access camera roll is required!")
         return
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync()
      setUserImage(pickerResult.uri)
   }


   const onPressAction = (action) => {
      if (action === 'logout') {
         setIsSignedIn(false)
      } else {
         console.log(action)
      }
   }
   return (
      <Container center>
         <RowContainer
            width='120px'
         >
            <UserImage
               source={userImage?  {uri: userImage }: user}
            />
            <EditImage onPress={openImagePickerAsync}>
               <Icon
                  source={edit}
                  size='15'
               />
            </EditImage>
         </RowContainer>
         <Title>Mohammed Shousha</Title>
         <Text center>Passionate Cooker</Text>
         <Line />
         {userDetails.map((detail, i) =>
            <RowContainer
               key={i}
               between
               user
               onPress={() => onPressAction(detail.action)}
            >
               <Text size='30'>{detail.name}</Text>
               <PressableIcon onPress={() => onPressAction(detail.action)}>
                  <Icon
                     source={detail.img}
                     size={detail.size}
                  />
               </PressableIcon>
            </RowContainer>
         )}
      </Container>

   )
}


export default User