import React, { useContext, useState } from 'react'
import { Modal } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { Container, RowContainer, ConfirmContainer } from '../../Components/Containers'
import { StyledButton, ButtonText } from '../../Components/Buttons'
import { Icon, PressableIcon, UserImage } from '../../Components/Images'
import { Line, Text, Title } from '../../Components/Texts'
import { DataContext, initData } from '../../Data/Context'
import { userDetails } from '../../Data/Database'
import user from '../../Data/images/chef.png'


const User = ({ navigation }) => {

   const { setIsSignedIn, userData, setUserData } = useContext(DataContext)
   const { image } = userData

   const [confirm, setConfirm] = useState(false)

   const onPressAction = (action) => {
      if (action === 'logout') {
         setConfirm(true)
      } else if (action === 'profile') {
         navigation.navigate('Edit Profile')
      } else if (action === 'recipes') {
         navigation.navigate('My Recipes')
      } else if (action == 'rate') {
         WebBrowser.openBrowserAsync('https://forms.gle/JrtqqiygVRPgsgxn9')
      }
   }

   const logOut = () => {
      setConfirm(false)
      setIsSignedIn(false)
      setUserData(initData)
   }


   return (
      <Container>
         <Modal
            animationType='fade'
            visible={confirm}
            transparent={true}
            onRequestClose={() => setConfirm(false)}
         >
            <ConfirmContainer>
               <Text>Are you sure you want to log out?</Text>
               <RowContainer>
                  <StyledButton
                     width='45%'
                     onPress={logOut}
                  >
                     <ButtonText size='20px'>
                        Confirm
                     </ButtonText>
                  </StyledButton>
                  <StyledButton
                     width='45%'
                     onPress={() => setConfirm(false)}
                     rev
                  >
                     <ButtonText
                        rev
                        size='20px'
                     >
                        Cancel
                     </ButtonText>
                  </StyledButton>
               </RowContainer>
            </ConfirmContainer>
         </Modal>
         <RowContainer
            width='120px'
            noPadding
            center
         >
            <UserImage
               source={image ? { uri: image } : user}
            />
         </RowContainer>
         <Title>{userData.name}</Title>
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