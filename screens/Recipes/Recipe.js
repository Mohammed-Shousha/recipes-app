import { useContext, useEffect, useState } from 'react'
import { ScrollView, Modal, Pressable } from 'react-native'
import { useMutation } from '@apollo/client'

import {
  RecipeDetailsContainer,
  RecipeDetail,
  RecipeInfo,
  RowContainer,
  Container,
  AlertContainer,
} from '@components/styles/Containers.styles.'
import {
  RecipeImage,
  PressableIcon,
  Icon,
  Exit,
} from '@components/styles/Images.styles'
import { RecipeTitle, Text } from '@components/styles/Texts.styles'

import { DataContext } from '@root/Context'

import heart from '@assets/icons/greyHeart.png'
import redHeart from '@assets/icons/redHeart.png'
import recipeTypeImg from '@assets/icons/recipeType.png'
import recipeTime from '@assets/icons/recipeTime.png'
import recipeCalories from '@assets/icons/recipeCalories.png'
import xImg from '@assets/icons/x.png'

import { RECIPE_URL } from '@utils/constants'
import { recipeDetails, recipesTypes } from '@utils/database'
import {
  HANDLE_LIKING_RECIPE,
  HANDLE_UNLIKING_RECIPE,
} from '@utils/graphql/mutations'

import { LoadingDisplay } from '@components'

export const Recipe = ({ route, navigation }) => {
  const { id } = route.params

  const { userData, setUserData, isSignedIn } = useContext(DataContext)
  const { email, favRecipes } = userData

  const [loading, setLoading] = useState(false)
  const [activeDetail, setActiveDetail] = useState(0)
  const [like, setLike] = useState(false)
  const [alert, setAlert] = useState(false)

  const showAlert = () => {
    setAlert(true)
  }

  const hideAlert = () => {
    setAlert(false)
  }

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
      size: 17,
    },
    {
      name: recipe.readyInMinutes + ' m',
      color: '#e8e9a1',
      image: recipeTime,
      size: 18,
    },
    {
      name: Math.floor(calories) + ' kcal',
      color: '#f1d1d0',
      image: recipeCalories,
      size: 18,
    },
  ]

  const [LikeRecipe] = useMutation(HANDLE_LIKING_RECIPE, {
    onCompleted({ LikeRecipe }) {
      if (LikeRecipe.result === 1) {
        setUserData({
          ...userData,
          favRecipes: LikeRecipe.data,
        })
        setLike(true)
      }
    },
  })

  const likeRecipe = (recipe) => {
    const { title, image } = recipe
    if (!isSignedIn) {
      LikeRecipe({
        variables: {
          email,
          id,
          title,
          image,
        },
      })
    } else {
      showAlert()
    }
  }

  const [UnlikeRecipe] = useMutation(HANDLE_UNLIKING_RECIPE, {
    onCompleted({ UnlikeRecipe }) {
      if (UnlikeRecipe.result === 1) {
        setUserData({
          ...userData,
          favRecipes: UnlikeRecipe.data,
        })
        setLike(false)
      }
    },
  })

  const unlikeRecipe = () => {
    UnlikeRecipe({
      variables: {
        email,
        id,
      },
    })
  }

  const redirect = (route) => {
    navigation.navigate(route)
    hideAlert()
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await fetch(RECIPE_URL(id))
      const {
        title,
        image,
        readyInMinutes,
        nutrition,
        extendedIngredients,
        analyzedInstructions,
        dishTypes,
      } = await response.json()
      setRecipe({ title, image, readyInMinutes })
      setNutrients(nutrition.nutrients)
      setCalories(nutrition.nutrients[0].amount)
      setIngredients(extendedIngredients)
      if (analyzedInstructions.length) {
        setInstructions(analyzedInstructions[0].steps)
      } else {
        setInstructions([{ step: 'No Directions Available' }])
      }
      const filteredTypes = dishTypes
        .filter((type) => recipesTypes.some((t) => t === type))
        .map((t) => t.charAt(0).toUpperCase() + t.slice(1)) // Capitalize First Letter
      setRecipeType(filteredTypes[0])
      if (favRecipes) {
        const liked = favRecipes.some((recipe) => recipe.id === +id) // id 'string', recipe.id 'int'
        if (liked) {
          setLike(true)
        }
      }
      setLoading(false)
    }
    fetchData()
  }, [id])

  if (loading) return <LoadingDisplay />

  return (
    <Container>
      <Modal
        animationType="fade"
        visible={alert}
        transparent
        onRequestClose={() => hideAlert()}
      >
        <AlertContainer>
          <Exit onPress={() => hideAlert()}>
            <Icon source={xImg} size="12" />
          </Exit>
          <RowContainer>
            <Pressable onPress={() => redirect('Sign In')}>
              <Text bold>Sign in</Text>
            </Pressable>
            <Text> or </Text>
            <Pressable onPress={() => redirect('Register')}>
              <Text bold>Register</Text>
            </Pressable>
            <Text> to Like Recipes</Text>
          </RowContainer>
        </AlertContainer>
      </Modal>

      <RecipeImage source={{ uri: recipe.image }} />
      <ScrollView>
        <RowContainer>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <PressableIcon
            onPress={!like ? () => likeRecipe(recipe) : unlikeRecipe}
          >
            <Icon source={like ? redHeart : heart} size="30" />
          </PressableIcon>
        </RowContainer>
        <RowContainer>
          {recipeInfo.map((r, i) => (
            <RecipeInfo key={i} color={r.color}>
              <Icon source={r.image} size={r.size} />
              <Text size={r.size}>{r.name}</Text>
            </RecipeInfo>
          ))}
        </RowContainer>
        <RowContainer noPadding>
          {recipeDetails.map((detail, i) => (
            <RecipeDetail
              onPress={() => setActiveDetail(i)}
              active={activeDetail === i}
              key={i}
            >
              <Text color="#214151">{detail}</Text>
            </RecipeDetail>
          ))}
        </RowContainer>
        {activeDetail === 0 ? (
          <RecipeDetailsContainer>
            {ingredients.map((ingredient, i) => (
              <Text key={i} color="#393e46">
                • {ingredient.original}
              </Text>
            ))}
          </RecipeDetailsContainer>
        ) : activeDetail === 1 ? (
          <RecipeDetailsContainer>
            {instructions.map((instruction, i) => (
              <Text key={i}>• {instruction.step}</Text>
            ))}
          </RecipeDetailsContainer>
        ) : (
          <RecipeDetailsContainer>
            {nutrients.map((nutrient, i) => (
              <Text key={i}>
                • {nutrient.name}: {nutrient.amount} {nutrient.unit}
              </Text>
            ))}
          </RecipeDetailsContainer>
        )}
      </ScrollView>
    </Container>
  )
}