import { ToastAndroid } from 'react-native'

import { RowContainer } from '@components/styles/Containers.styles'
import { RecipeImage } from '@components/styles/Images.styles'
import { RecipeTitle } from '@components/styles/Texts.styles'

import { useDataContext } from '@context'

import heart from '@assets/icons/greyHeart.png'
import redHeart from '@assets/icons/redHeart.png'
import emptyDish from '@assets/images/emptyDish.png'

import {
  LoadingDisplay,
  RecipeDetails,
  RecipeSummary,
  PressableIcon,
  ErrorDisplay,
} from '@components'

import { useFetchRecipe, useRecipesMutations } from '@hooks'

import { DEFAULT_RECIPE_IMAGE } from '@utils/constants'

export const Recipe = ({ route }) => {
  const { id } = route.params

  const { likeRecipe, unlikeRecipe } = useRecipesMutations()

  const { email, isSignedIn } = useDataContext()

  const {
    recipe,
    instructions,
    ingredients,
    nutrients,
    calories,
    recipeType,
    like,
    loading,
    error,
  } = useFetchRecipe(id)

  const recipeDetails = {
    Ingredients: ingredients,
    Directions: instructions,
    Nutrients: nutrients,
  }

  const handleLikeRecipe = (recipe) => {
    const { title, image } = recipe
    if (isSignedIn) {
      likeRecipe({
        variables: {
          email,
          id,
          title,
          image,
        },
      })
    } else {
      showToast()
    }
  }

  const handleUnlikeRecipe = () => {
    unlikeRecipe({
      variables: {
        email,
        id,
      },
    })
  }

  const toggleLike = () =>
    like ? handleUnlikeRecipe() : handleLikeRecipe(recipe)

  const showToast = () =>
    ToastAndroid.show('Sign in or Resigter to like recipes', ToastAndroid.SHORT)

  if (loading) return <LoadingDisplay />

  if (error) return <ErrorDisplay message={error} icon={emptyDish} />

  return (
    <>
      <RecipeImage source={{ uri: recipe.image || DEFAULT_RECIPE_IMAGE }} />

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
