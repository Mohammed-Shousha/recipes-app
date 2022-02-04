import React, { useContext } from 'react'
import { View } from 'react-native'
import { API_KEY } from '@env'
import { RowContainer } from '../Components/Containers'
import { Icon, PressableIcon } from '../Components/Images'
import { Text, Title } from '../Components/Texts'
import { RecipesContext } from '../Data/Context'
import searchImg from '../Data/images/search.png'
import xImg from '../Data/images/x.png'
import { useNavigation } from '@react-navigation/native'


const Ingredients = ({ ingredients, setIngredients }) => {
   const navigation = useNavigation()

   const { setRecipes } = useContext(RecipesContext)

   let recipesNumber = 50
   
   const searchRecipesByIngredients = async () => {
      const query = ingredients.map(i => i + ',').join('+')
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&number=${recipesNumber}&ranking=2&ingredients=${query}`)
      const data = await response.json()
      console.log(data)
      if (!data.length) {
         setRecipes([null])
      } else {
         setRecipes(data)
      }
      navigation.navigate('Recipes')
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