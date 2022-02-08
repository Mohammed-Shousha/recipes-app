import React, { useContext } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { AddButton } from '../../Components/Buttons'
import { Container, RowContainer } from '../../Components/Containers'
import { Icon, RecipeMiniImage } from '../../Components/Images'
import { Title, Text } from '../../Components/Texts'
import { DataContext } from '../../Data/Context'
import cookbook from '../../Data/images/cookbook.png'
import plus from '../../Data/images/plus.png'


const UserRecipes = ({ navigation }) => {

   const { userData, loading } = useContext(DataContext)
   const { recipes } = userData


   return (
      <>
         {loading ?
            <Container center>
               <ActivityIndicator color='green' size='large' />
            </Container>
            :
            <Container>
               {!recipes || recipes.length === 0 ?
                  <Container center>
                     <Icon
                        source={cookbook}
                        size='110'
                     />
                     <Title>
                        Your recipes book is empty,
                        add your own recipes to get started!
                     </Title>
                  </Container>
                  :
                  <ScrollView>
                     {recipes.map(recipe =>
                        <RowContainer
                           key={recipe.id}
                           flexStart
                           onPress={() => navigation.navigate('User Recipe', { id: recipe.id })}
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
                  onPress={() => navigation.navigate('Add Recipe')}
               >
                  <Icon
                     source={plus}
                     size='25'
                  />
               </AddButton>
            </Container>
         }
      </>
   )
}

export default UserRecipes