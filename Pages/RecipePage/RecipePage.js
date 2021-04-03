import React, { useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { API_KEY } from '@env'
import { useHistory, useParams } from 'react-router-native'
import { RecipeDetailsContainer, RecipeDetail, RecipeInfo, RowContainer, Container } from '../../Components/Containers'
import { RecipeImage, PressableIcon, Icon } from '../../Components/Images'
import { RecipeTitle, Text } from '../../Components/Texts'
import { RecipesContext } from '../../Data/Context'
import heart from '../../Data/images/greyHeart.png'
import redHeart from '../../Data/images/redHeart.png'
import recipeTypeImg from '../../Data/images/recipeType.png'
import recipeTime from '../../Data/images/recipeTime.png'
import recipeCalories from '../../Data/images/recipeCalories.png'
import backArrow from '../../Data/images/backArrow.png'


const RecipePage = () => {

   const { id } = useParams()
   const history = useHistory()

   const { favRecipes, setFavRecipes } = useContext(RecipesContext)
   const [recipe, setRecipe] = useState({})
   const [nutrients, setNutrients] = useState([])
   const [ingredients, setIngredients] = useState([])
   const [instructions, setInstructions] = useState([])
   const [calories, setCalories] = useState('')
   const [recipeType, setRecipeType] = useState('')
   const [activeDetail, setActiveDetail] = useState(0)
   const [like, setLike] = useState(false)


   const recipesTypes = ['breakfast', 'dinner', 'salad', 'snack', 'drink', 'dessert']

   const recipeInfo = [
      {
         name: recipeType,
         color: '#ccf2f4',
         image: recipeTypeImg,
         size: 17
      },
      {
         name: recipe.readyInMinutes + ' m',
         color: '#e8e9a1',
         image: recipeTime,
         size: 18
      },
      {
         name: Math.floor(calories) + ' kcal',
         color: '#f1d1d0',
         image: recipeCalories,
         size: 18
      },
   ]

   const recipeDetails = [
      {
         name: 'Ingredients',
         data: ingredients
      },
      {
         name: 'Directions',
         data: instructions
      },
      {
         name: 'Nutrients',
         data: nutrients
      },
   ]

   const likeRecipe = (recipe) => {
      const { title, image } = recipe
      const favRecipeCopy = [...favRecipes]
      favRecipeCopy.push({ id, title, image })
      setFavRecipes(favRecipeCopy)
      setLike(true)
   }

   const unlikeRecipe = () => {
      const recipeIndex = favRecipes.findIndex(recipe => recipe.id === id)
      const favRecipeCopy = [...favRecipes]
      favRecipeCopy.splice(recipeIndex, 1)
      setFavRecipes(favRecipeCopy)
      setLike(false)
   }

   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`)
         const { title, image, readyInMinutes, nutrition, extendedIngredients, analyzedInstructions, dishTypes } = await response.json()
         setRecipe({ title, image, readyInMinutes })
         setNutrients(nutrition.nutrients)
         setCalories(nutrition.nutrients[0].amount)
         setIngredients(extendedIngredients)
         setInstructions(analyzedInstructions[0].steps)
         const filteredTypes = dishTypes.filter(type => recipesTypes.some(t => t === type))
            .map(t => t.charAt(0).toUpperCase() + t.slice(1)) // Capitalize First Letter
         setRecipeType(filteredTypes[0])
         const liked = favRecipes.some(recipe => recipe.id === id)
         liked && setLike(true)
      }
      fetchData()
   }, [id])



   return (
      <Container>
         <PressableIcon
            onPress={() => history.goBack()}
            back
         >
            <Icon
               source={backArrow}
               size='30'
            />
         </PressableIcon>
         <RecipeImage
            source={{ uri: recipe.image }}
         />
         <ScrollView>
            <RowContainer >
               <RecipeTitle>{recipe.title}</RecipeTitle>
               <PressableIcon onPress={!like ? () => likeRecipe(recipe) : unlikeRecipe}>
                  <Icon
                     source={like ? redHeart : heart}
                     size='30'
                  />
               </PressableIcon>
            </RowContainer>
            <RowContainer>
               {recipeInfo.map((r, i) => (
                  <RecipeInfo
                     key={i}
                     color={r.color}
                  >
                     <Icon
                        source={r.image}
                        size={r.size}
                     />
                     <Text
                        size={r.size}
                     >
                        {r.name}
                     </Text>
                  </RecipeInfo>
               ))}
            </RowContainer>
            <RowContainer noPadding>
               {recipeDetails.map((detail, i) =>
                  <RecipeDetail
                     onPress={() => setActiveDetail(i)}
                     active={activeDetail === i}
                     key={i}
                  >
                     <Text color='#214151'>{detail.name}</Text>
                  </RecipeDetail>
               )}
            </RowContainer>
            {activeDetail === 0 ?
               <RecipeDetailsContainer>
                  {ingredients.map((ingredient, i) =>
                     <Text key={i} color='#393e46'>• {ingredient.originalString}</Text>
                  )}
               </RecipeDetailsContainer>
               : activeDetail === 1 ?
                  <RecipeDetailsContainer>
                     {instructions.map((instruction, i) =>
                        <Text key={i}>• {instruction.step}</Text>
                     )}
                  </RecipeDetailsContainer>
                  : <RecipeDetailsContainer>
                     {nutrients.map((nutrient, i) =>
                        <Text key={i}>• {nutrient.name}: {nutrient.amount} {nutrient.unit}</Text>
                     )}
                  </RecipeDetailsContainer>
            }
         </ScrollView>
      </Container>
   )
}

export default RecipePage