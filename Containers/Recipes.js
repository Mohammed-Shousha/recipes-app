import React, { useContext, useState } from 'react'
import { ScrollView } from 'react-native'
import { Container, RowContainer, CenterContainer } from '../Components/Containers'
import { Text, Title } from '../Components/Texts'
import { RecipeMiniImage } from '../Components/Images'
import { Icon } from '../Components/Images'
import { RecipesContext, DataContext } from '../Data/Context'
import emptyDish from '../Data/images/emptyDish.png'
import { StyledButton, ButtonText } from '../Components/Buttons'
import { useNavigation, useRoute } from '@react-navigation/core'

const Recipes = ({ favourite = false }) => {

   const navigation = useNavigation()
   
   const route = useRoute()
   const { recipes } = useContext(RecipesContext)
   const { userData } = useContext(DataContext)

   const { favRecipes } = userData
   const [recipesNum, setRecipesNum] = useState(20) //intial recipes number

   return (
      <>
         {favourite && (!favRecipes || favRecipes.length === 0) ?
            <Container center>
               <Icon
                  source={emptyDish}
                  size='100'
               />
               <Title>You have no favourite recipes yet, Search and you will for sure find alot of tasteful recipes</Title>
            </Container>
            : favourite && favRecipes.length ?
               <Container>
                  <ScrollView>
                     {favRecipes.map(recipe =>
                        <RowContainer
                           key={recipe.id}
                           flexStart
                           onPress={() => navigation.navigate('FavRecipe', { id: recipe.id })}
                        >
                           <RecipeMiniImage
                              source={{ uri: recipe.image }}
                           />
                           <Text style={{ width: 240 }}>{recipe.title}</Text>
                        </RowContainer>
                     )}
                  </ScrollView>
               </Container>
               : recipes[0] === null ?
                  <Container center>
                     <Icon
                        source={emptyDish}
                        size='100'
                     />
                     <Title>Sorry We Couldn't Find Any Recipe</Title>
                  </Container>
                  : !favourite && recipes.length ?
                     <Container>
                        <ScrollView>
                           {recipes.slice(0, recipesNum).map(recipe =>
                              <RowContainer
                                 key={recipe.id}
                                 flexStart
                                 onPress={() => route.name === 'Recipes' ? navigation.navigate('Recipe', { id: recipe.id }) : navigation.navigate('Search Recipe', { id: recipe.id })}
                              >
                                 <RecipeMiniImage
                                    source={{ uri: recipe.image }}
                                 />
                                 <Text style={{ width: 240 }}>{recipe.title}</Text>
                              </RowContainer>
                           )}
                           {recipesNum < recipes.length &&
                              <StyledButton
                                 width='80%'
                                 onPress={() => setRecipesNum(recipesNum + 10 )} //view more recipes
                              >
                                 <ButtonText>Show More</ButtonText>
                              </StyledButton>
                           }
                        </ScrollView>
                     </Container>
                     : null}
      </>
   )
}

export default Recipes
