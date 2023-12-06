import { ToastAndroid } from 'react-native'
import { useMutation } from '@apollo/client'

import { RowContainer } from '@components/styles/Containers.styles'
import { RecipeImage } from '@components/styles/Images.styles'
import { RecipeTitle } from '@components/styles/Texts.styles'

import { useDataContext } from '@root/Context'

import heart from '@assets/icons/greyHeart.png'
import redHeart from '@assets/icons/redHeart.png'

import {
  HANDLE_LIKING_RECIPE,
  HANDLE_UNLIKING_RECIPE,
} from '@utils/graphql/mutations'

import {
  LoadingDisplay,
  RecipeDetails,
  RecipeSummary,
  PressableIcon,
} from '@components'

import useFetchRecipe from '@utils/hooks/useFetchRecipe'

import { DEFAULT_RECIPE_IMAGE } from '@utils/constants'

export const Recipe = ({ route }) => {
  const { id } = route.params

  const {
    userData: { email },
    setUserData,
    isSignedIn,
  } = useDataContext()

  const {
    recipe,
    instructions,
    ingredients,
    nutrients,
    calories,
    recipeType,
    loading,
    like,
    setLike,
  } = useFetchRecipe(id)

  const recipeDetails = {
    Ingredients: ingredients,
    Directions: instructions,
    Nutrients: nutrients,
  }

  const [LikeRecipe] = useMutation(HANDLE_LIKING_RECIPE, {
    onCompleted({ LikeRecipe }) {
      if (LikeRecipe.result === 1) {
        setUserData((userData) => ({
          ...userData,
          favRecipes: LikeRecipe.data,
        }))
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
      setLike(true)
    } else {
      showToast()
    }
  }

  const [UnlikeRecipe] = useMutation(HANDLE_UNLIKING_RECIPE, {
    onCompleted({ UnlikeRecipe }) {
      if (UnlikeRecipe.result === 1) {
        setUserData((userData) => ({
          ...userData,
          favRecipes: UnlikeRecipe.data,
        }))
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
    setLike(false)
  }

  const toggleLike = () => {
    if (like) {
      unlikeRecipe()
    } else {
      likeRecipe(recipe)
    }
  }

  const showToast = () => {
    ToastAndroid.show('Sign in or Resigter to like recipes', ToastAndroid.SHORT)
  }

  if (loading) return <LoadingDisplay />

  return (
    <>
      <RecipeImage source={{ uri: recipe.image ?? DEFAULT_RECIPE_IMAGE }} />

      <RowContainer>
        <RecipeTitle>{recipe.title}</RecipeTitle>
        <PressableIcon
          onPress={toggleLike}
          icon={like ? redHeart : heart}
          size="30"
        />
      </RowContainer>

      <RecipeSummary
        recipe={{
          type: recipeType,
          time: recipe.readyInMinutes,
          calories,
        }}
      />

      <RecipeDetails recipeDetails={recipeDetails} />
    </>
  )
}
