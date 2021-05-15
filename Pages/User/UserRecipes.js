import React, { useContext } from 'react'
import { ScrollView } from 'react-native'
import { useHistory } from 'react-router-native'
import Back from '../../Components/Back'
import { AddButton } from '../../Components/Buttons'
import { CenterContainer, Container, RowContainer } from '../../Components/Containers'
import { Icon, RecipeMiniImage } from '../../Components/Images'
import { Title, Text } from '../../Components/Texts'
import { DataContext } from '../../Data/Context'
import cookbook from '../../Data/images/cookbook.png'
import plus from '../../Data/images/plus.png'


const UserRecipes = () => {

   const history = useHistory()
   const { userData } = useContext(DataContext)
   const { recipes } = userData

   return (
      <Container>
         <Back to='/user' />
         <Title>My Recipes</Title>
         {!recipes ?
            <CenterContainer>
               <Icon
                  source={cookbook}
                  size='110'
               />
               <Title>
                  Your Recipes Book is Empty,
                  Add Your Own Recipes to Get Started!
               </Title>
            </CenterContainer>
            :
            <ScrollView>
               {recipes.map((recipe, i) =>
                  <RowContainer
                     key={i}
                     flexStart
                     onPress={() => history.push(`/userrecipes/${i}`)}
                  >
                     <RecipeMiniImage
                        source={{ uri: recipe.image ? recipe.image : 'https://source.unsplash.com/Mz__0nr1AM8' }}
                     />
                     <Text style={{ width: 240 }}>{recipe.title}</Text>
                  </RowContainer>
               )}
            </ScrollView>
         }
         <AddButton
            onPress={() => history.push('/addrecipe')}
         >
            <Icon
               source={plus}
               size='25'
            />
         </AddButton>
      </Container>
   )
}

export default UserRecipes