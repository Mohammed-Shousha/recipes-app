import { useState } from 'react'

import { RowContainer } from '@components/styles/Containers.styles'
import { RecipeImage } from '@components/styles/Images.styles'
import { RecipeTitle } from '@components/styles/Texts.styles'

import { useDataContext } from '@root/Context'

import bin from '@assets/icons/bin.png'
import edit from '@assets/icons/edit_2.png'

import { splitLines } from '@utils/helpers'
import { DEFAULT_RECIPE_IMAGE } from '@utils/constants'

import {
  RecipeDetails,
  RecipeSummary,
  PressableIcon,
  ConfirmModal,
  LoadingDisplay,
} from '@components'

import useRecipesMutations from '@utils/hooks/useRecipesMutations'

export const UserRecipe = ({ route, navigation }) => {
  const { userRecipes, email } = useDataContext()

  const [loading, setLoading] = useState(false)

  const { deleteRecipe } = useRecipesMutations()

  const { id } = route.params

  const recipe = userRecipes.find((recipe) => recipe.id === id)

  const [modal, setModal] = useState(false)

  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)

  const handleDeleteRecipe = async () => {
    closeModal()
    setLoading(true)
    await deleteRecipe({
      variables: {
        email,
        id,
      },
    })
    setLoading(false)
    navigation.goBack()
  }

  const editRecipe = () => {
    navigation.navigate('Edit Recipe', { id: recipe.id })
  }

  if (loading || !recipe) return <LoadingDisplay />

  return (
    <>
      <RecipeImage
        source={{
          uri: recipe.image || DEFAULT_RECIPE_IMAGE,
        }}
      />

      <RowContainer style={{ width: '95%' }}>
        <RecipeTitle>{recipe.title}</RecipeTitle>
        <RowContainer style={{ width: '20%' }}>
          <PressableIcon onPress={editRecipe} icon={edit} size="30" />
          <PressableIcon onPress={openModal} icon={bin} size="30" />
        </RowContainer>
      </RowContainer>

      <RecipeSummary recipe={recipe} />

      <RecipeDetails
        recipeDetails={{
          Ingredients: splitLines(recipe.ingredients),
          Directions: splitLines(recipe.directions),
        }}
      />

      <ConfirmModal
        message="Are you sure you want to delete this recipe?"
        visible={modal}
        onConfirm={handleDeleteRecipe}
        onClose={closeModal}
      />
    </>
  )
}
