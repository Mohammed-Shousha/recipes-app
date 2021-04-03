import React, { useContext } from 'react'
import { View } from 'react-native'
import { API_KEY } from '@env'
import { RowContainer } from '../Components/Containers'
import { Icon, PressableIcon } from '../Components/Images'
import { Text, Title } from '../Components/Texts'
import { RecipesContext } from '../Data/Context'
import searchImg from '../Data/images/search.png'
import xImg from '../Data/images/x.png'


const Ingredients = ({ ingredients, setIngredients }) => {

   const { setRecipes } = useContext(RecipesContext)

   const searchRecipesByIngredients = async () => {
      const query = ingredients.map(i => i + ',').join('+')
      let recipesNumber = 7
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&number=${recipesNumber}&ranking=2&ingredients=${query}`)
      const data = await response.json()
      if (!data.length) {
         setRecipes([null])
      } else {
         setRecipes(data)
      }
      setIngredients([])
   }

   const removeIngredient = (i) => {
      const newIngredients = [...ingredients]
      newIngredients.splice(i, 1)
      setIngredients(newIngredients)
   }

   return (
      <>
         <RowContainer>
            <Title>
               Ingredients
            </Title>
            <PressableIcon onPress={searchRecipesByIngredients}>
               <Icon
                  source={searchImg}
                  size='25'
               />
            </PressableIcon>
         </RowContainer>
         <View>
            {ingredients.map((ingredient, i) =>
               <RowContainer key={i}>
                  <Text> {ingredient} </Text>
                  <PressableIcon onPress={() => removeIngredient(i)}>
                     <Icon
                        source={xImg}
                        size='20'
                     />
                  </PressableIcon>
               </RowContainer>
            )}
         </View>
      </>
   )
}

export default Ingredients