import React, { useContext } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { API_KEY } from '@env'
import { Box, BoxesContainer } from '../Components/Containers'
import { Icon } from '../Components/Images'
import { Text } from '../Components/Texts'
import { RecipesContext } from '../Data/Context'


const Boxes = ({ array, text = true, time = false, diet = false, calories = false, styledText = false }) => {

   const route = useRoute()
   const navigation = useNavigation()

   const { setRecipes } = useContext(RecipesContext)

   const copy = [...array]
   const finalArray = []
   while (copy.length) {
      finalArray.push(copy.splice(0, 2)) //to have two boxes in each row
   }

   const recipesNumber = 50 // number of recipes to be fetched

   const searchRecipesByTime = async (name) => {
      let time = Number(name.split(' ')[0])
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=${recipesNumber}&maxReadyTime=${time}&minReadyTime=${time - 15}`)
      const { results } = await response.json()
      setRecipes(results)
      navigation.navigate('Search Recipes')
   }

   const searchRecipesByDiet = async (diet) => {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=${recipesNumber}&diet=${diet}`)
      const { results } = await response.json()
      setRecipes(results)
      navigation.navigate('Search Recipes')
   }

   const searchRecipesByCalories = async (name) => {
      const nameArray = name.split(' ')
      let calories = ''
      if (nameArray.length === 2) { // 'under 250'
         calories = nameArray[1]
      } else { // '250 to 500' (3)
         calories = nameArray[2]
      }
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=${recipesNumber}&maxCalories=${calories}&minCalories=${calories - 250}`)
      const { results } = await response.json()
      setRecipes(results)
      navigation.navigate('Search Recipes')
   }

   const redirect = async (name) => {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=${recipesNumber}&type=${name}`)
      const { results } = await response.json()
      setRecipes(results)
      if (route.name === 'Main') {
         navigation.navigate('Recipes')
      } else {
         navigation.navigate(name)
      }
   }

   return (
      <>
         {finalArray.map((Two, i) =>
            <BoxesContainer key={i}>
               {Two.map((C, i) =>
                  <Box
                     key={i}
                     color={C.color}
                     onPress={
                        time ? () => searchRecipesByTime(C.name)
                           : diet ? () => searchRecipesByDiet(C.name)
                              : calories ? () => searchRecipesByCalories(C.name)
                                 : () => redirect(C.name)
                     }
                     underlayColor="#eff7e1"
                  >
                     <>
                        <Icon
                           source={C.image}
                           size={C.imgSize}
                        />
                        {styledText ?
                           <Text style={{ color: 'white', fontSize: 28 }} > {C.name} </Text>
                           : text && <Text > {C.name} </Text>
                        }
                     </>
                  </Box>
               )}
            </BoxesContainer>
         )}
      </>
   )
}

export default Boxes