import React, { useContext, useState } from 'react'
import { Container, RowContainer } from '../../Components/Containers'
import { Icon, PressableIcon, UserImage } from '../../Components/Images'
import { Line, Text, Title } from '../../Components/Texts'
import { DataContext } from '../../Data/Context'
import { userDetails } from '../../Data/Database'
import user from '../../Data/images/chef.png'


const User = ({ navigation }) => {

   const { setIsSignedIn, userData } = useContext(DataContext)
   const { userImage } = useContext(DataContext)


   const onPressAction = (action) => {
      if (action === 'logout') {
         setIsSignedIn(false)
      } else if ( action == 'profile'){
         navigation.navigate('Edit Profile')
      } else if ( action == 'recipes'){
         navigation.navigate('My Recipes')
      }
   }


   return (
      <Container>
         <RowContainer
            width='120px'
            noPadding
            center
         >
            <UserImage
               source={userImage?  {uri: userImage }: user}
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