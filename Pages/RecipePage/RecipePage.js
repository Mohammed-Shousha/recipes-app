import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, ActivityIndicator, Modal } from 'react-native'
import { API_KEY } from '@env'
import { Link, useParams } from 'react-router-native'
import { gql, useMutation } from '@apollo/client'
import { RecipeDetailsContainer, RecipeDetail, RecipeInfo, RowContainer, Container, CenterContainer, AlertContainer } from '../../Components/Containers'
import { RecipeImage, PressableIcon, Icon, Exit } from '../../Components/Images'
import { RecipeTitle, Text } from '../../Components/Texts'
import Back from '../../Components/Back'
import { DataContext } from '../../Data/Context'
import heart from '../../Data/images/greyHeart.png'
import redHeart from '../../Data/images/redHeart.png'
import recipeTypeImg from '../../Data/images/recipeType.png'
import recipeTime from '../../Data/images/recipeTime.png'
import recipeCalories from '../../Data/images/recipeCalories.png'
import xImg from '../../Data/images/x.png'


const RecipePage = () => {

   const { id } = useParams()

   const { userData, setUserData, isSignedIn } = useContext(DataContext)
   const { favRecipes } = userData
   const { email } = userData

   const [loading, setLoading] = useState(false)
   const [activeDetail, setActiveDetail] = useState(0)
   const [like, setLike] = useState(false)
   const [alert, setAlert] = useState(false)

   const [recipe, setRecipe] = useState({})
   const [nutrients, setNutrients] = useState([])
   const [ingredients, setIngredients] = useState([])
   const [instructions, setInstructions] = useState([])
   const [calories, setCalories] = useState('')
   const [recipeType, setRecipeType] = useState('')



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


   const HANDLE_LIKING_RECIPE = gql`
      mutation LikeRecipe($email: String!, $id: ID!, $title: String!, $image: String!){
         LikeRecipe(email: $email, id: $id, title: $title, image: $image){
            data {
               ... on FavRecipe{
                  id
                  title
                  image
               }
            }
            result
         }
      }
	`

   const [LikeRecipe] = useMutation(HANDLE_LIKING_RECIPE, {
      onCompleted({ LikeRecipe }) {
         if (LikeRecipe.result === 1) {
            setUserData({
               ...userData,
               favRecipes: LikeRecipe.data
            })
            setLike(true)
         }
      }
   })

   const likeRecipe = (recipe) => {
      const { title, image } = recipe
      if (isSignedIn) {
         LikeRecipe({
            variables: {
               email,
               id,
               title,
               image
            }
         })
      } else {
         setAlert(true)
      }
   }


   const HANDLE_UNLIKING_RECIPE = gql`
      mutation UnlikeRecipe($email: String!, $id: ID!){
         UnlikeRecipe(email: $email, id: $id){
            data {
               ... on FavRecipe{
                  id
                  title
                  image
               }
            }
            result
         }
      }
	`

   const [UnlikeRecipe] = useMutation(HANDLE_UNLIKING_RECIPE, {
      onCompleted({ UnlikeRecipe }) {
         if (UnlikeRecipe.result === 1) {
            setUserData({
               ...userData,
               favRecipes: UnlikeRecipe.data
            })
            setLike(false)
         }
      }
   })

   const unlikeRecipe = () => {
      UnlikeRecipe({
         variables: {
            email,
            id
         }
      })
   }


   useEffect(() => {
      const fetchData = async () => {
         setLoading(true)
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
         if (favRecipes) {
            const liked = favRecipes.some(recipe => recipe.id === id)
            liked && setLike(true)
         }
         setLoading(false)
      }
      fetchData()
   }, [id])



   return (
      <Container>
         {loading ?
            <CenterContainer>
               <ActivityIndicator color='green' size='large' />
            </CenterContainer>
            :
            <>
               <Modal
                  animationType='fade'
                  visible={alert}
                  transparent={true}
                  onRequestClose={() => setAlert(false)}
               >
                  <AlertContainer>
                     <Exit
                        onPress={() => setAlert(false)}
                     >
                        <Icon
                           source={xImg}
                           size='12'
                        />
                     </Exit>
                     <RowContainer>
                        <Link to='/signin'>
                           <Text bold>Sign in</Text>
                        </Link>
                        <Text>or</Text>
                        <Link to='/signup'>
                           <Text bold>Sign up</Text>
                        </Link>
                        <Text>to</Text>
                        <Text>Like</Text>
                        <Text>Recipes</Text>
                     </RowContainer>
                  </AlertContainer>
               </Modal>
               <Back recipe />
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
            </>
         }
      </Container>
   )
}

export default RecipePage