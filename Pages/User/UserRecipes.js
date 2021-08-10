import React, { useContext } from 'react'
import { ScrollView } from 'react-native'
import { AddButton } from '../../Components/Buttons'
import { Container, RowContainer } from '../../Components/Containers'
import { Icon, RecipeMiniImage } from '../../Components/Images'
import { Title, Text } from '../../Components/Texts'
import { DataContext } from '../../Data/Context'
import cookbook from '../../Data/images/cookbook.png'
import plus from '../../Data/images/plus.png'


const UserRecipes = ({ navigation }) => {

   const { userData } = useContext(DataContext)
   const { recipes } = userData
   const A = <Container center>
      <Icon
         source={cookbook}
         size='110'
      />
      <Title>
         Your Recipes Book is Empty,
         Add Your Own Recipes to Get Started!
      </Title>
   </Container>

   const B = <ScrollView>
      {recipes.map((recipe, i) =>
         <RowContainer
            key={i}
            flexStart
            onPress={() => navigation.navigate('User Recipe', { id: i })}
         >
            <RecipeMiniImage
               source={{ uri: recipe.image ? recipe.image : 'https://source.unsplash.com/Mz__0nr1AM8' }}
            />
            <Text style={{ width: 240 }}>{recipe.title}</Text>
         </RowContainer>
      )}
   </ScrollView>

   return (
      <Container>
         {!recipes ?
            A
            :
            B
         }
         <AddButton
            onPress={() => navigation.navigate('Add Recipe')}
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