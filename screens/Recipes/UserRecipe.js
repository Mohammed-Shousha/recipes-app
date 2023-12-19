import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { RowContainer } from '@components/styles/Containers.styles'
import { RecipeImage } from '@components/styles/Images.styles'
import { RecipeTitle } from '@components/styles/Texts.styles'

import { useDataContext } from '@root/Context'

import bin from '@assets/icons/bin.png'
import edit from '@assets/icons/edit_2.png'

import { splitLines } from '@utils/helpers'
import { HANDLE_DELETING_RECIPE } from '@utils/graphql/mutations'
import { DEFAULT_RECIPE_IMAGE } from '@utils/constants'

import {
  RecipeDetails,
  RecipeSummary,
  PressableIcon,
  ConfirmModal,
} from '@components'

export const UserRecipe = ({ route, navigation }) => {
  const { userRecipes, email, setUserRecipes, setLoading } = useDataContext()

  const { id } = route.params

  const recipe = userRecipes.find((recipe) => recipe.id === id)

  const [modal, setModal] = useState(false)

  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)

  const [DeleteRecipe] = useMutation(HANDLE_DELETING_RECIPE, {
    onCompleted({ DeleteRecipe }) {
      if (DeleteRecipe.result === 1) {
        setUserRecipes(DeleteRecipe.data)
        setLoading(false)
      }
    },
  })

  const deleteRecipe = () => {
    closeModal()
    setLoading(true)
    DeleteRecipe({
      variables: {
        email,
        id,
      },
    })
    navigation.goBack()
  }

  const editRecipe = () => {
    navigation.navigate('Edit Recipe', { id: recipe.id })
  }

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
        onConfirm={deleteRecipe}
        onClose={closeModal}
      />
    </>
  )
}
