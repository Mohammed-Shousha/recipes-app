import { useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'

import {
  HANDLE_LIKING_RECIPE,
  HANDLE_UNLIKING_RECIPE,
  HANDLE_DELETING_RECIPE,
  HANDLE_EDITING_RECIPE,
  HANDLE_ADDING_RECIPE,
} from '@utils/graphql/mutations'

import { useDataDispatch } from '@context'
import { setUserRecipes, setFavRecipes } from '@context/actions'

export const useRecipesMutations = () => {
  const dispatch = useDataDispatch()

  const navigation = useNavigation()

  const handleCompleted = (mutationResponse, callback) => {
    if (mutationResponse.result === 1) {
      if (typeof callback === 'function') {
        callback()
      }
    }
  }

  const [addRecipe] = useMutation(HANDLE_ADDING_RECIPE, {
    onCompleted({ AddRecipe }) {
      handleCompleted(AddRecipe, () => {
        dispatch(setUserRecipes(AddRecipe.data))
        navigation.goBack()
      })
    },
  })

  const [editRecipe] = useMutation(HANDLE_EDITING_RECIPE, {
    onCompleted({ EditRecipe }) {
      handleCompleted(EditRecipe, () => {
        dispatch(setUserRecipes(EditRecipe.data))
        navigation.goBack()
      })
    },
  })

  const [deleteRecipe] = useMutation(HANDLE_DELETING_RECIPE, {
    onCompleted({ DeleteRecipe }) {
      handleCompleted(DeleteRecipe, () => {
        dispatch(setUserRecipes(DeleteRecipe.data))
      })
    },
  })

  const [likeRecipe] = useMutation(HANDLE_LIKING_RECIPE, {
    onCompleted({ LikeRecipe }) {
      handleCompleted(LikeRecipe, () => {
        dispatch(setFavRecipes(LikeRecipe.data))
      })
    },
  })

  const [unlikeRecipe] = useMutation(HANDLE_UNLIKING_RECIPE, {
    onCompleted({ UnlikeRecipe }) {
      handleCompleted(UnlikeRecipe, () => {
        dispatch(setFavRecipes(UnlikeRecipe.data))
      })
    },
  })

  return {
    addRecipe,
    editRecipe,
    deleteRecipe,
    likeRecipe,
    unlikeRecipe,
  }
}
