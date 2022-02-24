import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, ActivityIndicator, Modal, Pressable } from 'react-native'
import { gql, useMutation } from '@apollo/client'
import { API_KEY } from '@env'
import { RecipeDetailsContainer, RecipeDetail, RecipeInfo, RowContainer, Container, AlertContainer } from '../../Components/Containers'
import { RecipeImage, PressableIcon, Icon, Exit } from '../../Components/Images'
import { RecipeTitle, Text } from '../../Components/Texts'
import { DataContext } from '../../Data/Context'
import { recipeDetails, recipesTypes } from '../../Data/Database'
import heart from '../../Data/images/greyHeart.png'
import redHeart from '../../Data/images/redHeart.png'
import recipeTypeImg from '../../Data/images/recipeType.png'
import recipeTime from '../../Data/images/recipeTime.png'
import recipeCalories from '../../Data/images/recipeCalories.png'
import xImg from '../../Data/images/x.png'


const RecipePage = ({ route, navigation }) => {

   const { id } = route.params

   const { userData, setUserData, isSignedIn } = useContext(DataContext)
   const { email, favRecipes } = userData
  
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

   const redirect = (route) => {
      navigation.navigate(route)
      setAlert(false)
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
         if (analyzedInstructions.length) {
            setInstructions(analyzedInstructions[0].steps)
         } else {
            setInstructions([{ step: 'No Directions Available' }])
         }
         const filteredTypes = dishTypes.filter(type => recipesTypes.some(t => t === type))
            .map(t => t.charAt(0).toUpperCase() + t.slice(1)) // Capitalize First Letter
         setRecipeType(filteredTypes[0])
         if (favRecipes) {
            let liked = favRecipes.some(recipe => recipe.id == id) // id 'string', recipe.id 'int'
            if(liked){
               setLike(true)
            }
         }
         setLoading(false)
      }
      fetchData()
   }, [id])



   return (
      <Container>
         {loading ?
            <Container center>
               <ActivityIndicator color='green' size='large' />
            </Container>
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
                        <Pressable 
                           onPress={() => redirect('Sign In')}
                        >
                           <Text bold>Sign in</Text>
                        </Pressable>
                        <Text> or </Text>
                        <Pressable
                           onPress={() => redirect('Register')}
                        >
                           <Text bold>Register</Text>
                        </Pressable>
                        <Text> to Like Recipes</Text>
                     </RowContainer>
                  </AlertContainer>
               </Modal>
               <RecipeImage
                  source={{ uri: recipe.image }}
               />
               <ScrollView>
                  <RowContainer >
                     <RecipeTitle>{recipe.title}</RecipeTitle>
                     <PressableIcon
                        onPress={!like ? () => likeRecipe(recipe) : unlikeRecipe}
                     >
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
                           <Text color='#214151'>{detail}</Text>
                        </RecipeDetail>
                     )}
                  </RowContainer>
                  {activeDetail === 0 ?
                     <RecipeDetailsContainer>
                        {ingredients.map((ingredient, i) =>
                           <Text key={i} color='#393e46'>• {ingredient.original}</Text>
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