import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-native'
import * as ImagePicker from 'expo-image-picker'
import { Container, RowContainer } from '../../Components/Containers'
import { Icon, PressableIcon, UserImage } from '../../Components/Images'
import { Line, Text, Title } from '../../Components/Texts'
import { DataContext } from '../../Data/Context'
import { userDetails } from '../../Data/Database'
import user from '../../Data/images/chef.png'


const User = () => {

   const { setIsSignedIn, userData } = useContext(DataContext)
   const { userImage } = useContext(DataContext)


   const history = useHistory()

   const url = 'https://res.cloudinary.com/dn8thrc9l/image/upload/v1619016794/t33h3i78tccef9uatq5h.png'


   const onPressAction = (action) => {
      if (action === 'logout') {
         setIsSignedIn(false)
      } else if ( action == 'profile'){
         history.push('/editprofile')
      } else if ( action == 'recipes'){
         history.push('/userrecipes')
      }
   }


   return (
      <Container>
         <Title>Hi, Chef</Title>
         <RowContainer
            width='120px'
            noPadding
            center
         >
            <UserImage
               source={userImage?  {uri: userImage }: user}
               // source={{uri: url}}
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