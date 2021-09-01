import React, { useContext } from 'react'
import { Container, RowContainer } from '../../Components/Containers'
import { Icon, PressableIcon, UserImage } from '../../Components/Images'
import { Line, Text, Title } from '../../Components/Texts'
import { DataContext } from '../../Data/Context'
import { userDetails } from '../../Data/Database'
import user from '../../Data/images/chef.png'


const User = ({ navigation }) => {

   const { setIsSignedIn, userData, setUserData } = useContext(DataContext)
   const { image } = userData


   const onPressAction = (action) => {
      if (action === 'logout') {
         setIsSignedIn(false)
         setUserData({
            name: '',
            email: '',
            image: '',
            favRecipes: null,
            recipes: []
         })
      } else if (action === 'profile') {
         navigation.navigate('Edit Profile')
      } else if (action === 'recipes') {
         navigation.navigate('User Recipes')
      } else if (action == 'rate') {
         console.log(userData)
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