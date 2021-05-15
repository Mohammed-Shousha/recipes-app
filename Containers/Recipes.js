import React, { useContext, useState } from 'react'
import { ScrollView } from 'react-native'
import { useHistory } from 'react-router-native'
import { CenterContainer, RowContainer } from '../Components/Containers'
import { Text, Title } from '../Components/Texts'
import { RecipeMiniImage } from '../Components/Images'
import { Icon } from '../Components/Images'
import { RecipesContext, DataContext } from '../Data/Context'
import emptyDish from '../Data/images/emptyDish.png'
import { StyledButton, ButtonText } from '../Components/Buttons'

const Recipes = ({ favourite }) => {

   const { recipes } = useContext(RecipesContext)
   const { userData } = useContext(DataContext)
   const { favRecipes } = userData
   const history = useHistory()
   const [recpicesNum, setRecipesNum] = useState(7)

   return (
      <>
         {favourite && !favRecipes ?
            <CenterContainer>
               <Icon
                  source={emptyDish}
                  size='100'
               />
               <Title>You have no favourite recipes yet, Search and you will for sure find alot of tasteful recipes</Title>
            </CenterContainer>
            : favourite && favRecipes.length ?
               <ScrollView>
                  {favRecipes.map(recipe =>
                     <RowContainer
                        key={recipe.id}
                        flexStart
                        onPress={() => history.push(`/recipes/${recipe.id}`)}
                     >
                        <RecipeMiniImage
                           source={{ uri: recipe.image }}
                        />
                        <Text style={{ width: 240 }}>{recipe.title}</Text>
                     </RowContainer>
                  )}
               </ScrollView>
               : recipes[0] === null ?
                  <CenterContainer>
                     <Icon
                        source={emptyDish}
                        size='100'
                     />
                     <Title>Sorry We Couldn't Find Any Recipe</Title>
                  </CenterContainer>
                  : recipes.length ?
                     <ScrollView>
                        {recipes.slice(0, recpicesNum).map(recipe =>
                           <RowContainer
                              key={recipe.id}
                              flexStart
                              onPress={() => history.push(`/recipes/${recipe.id}`)}
                           >
                              <RecipeMiniImage
                                 source={{ uri: recipe.image }}
                              />
                              <Text style={{ width: 240 }}>{recipe.title}</Text>
                           </RowContainer>
                        )}
                        {recpicesNum < 8 &&
                           <StyledButton
                              width='80%'
                              onPress={() => setRecipesNum(recipes.length)}
                           >
                              <ButtonText>Show More</ButtonText>
                           </StyledButton>
                        }
                     </ScrollView>
                     : null}
      </>
   )
}

export default Recipes
