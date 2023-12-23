import { useState, useEffect } from 'react'

import { useDataContext } from '@context'

import { RECIPES_TYPES } from '@utils/database'
import { RECIPE_URL } from '@utils/constants'
import { capitalize } from '@utils/helpers'

const useFetchRecipe = (id) => {
  const { favRecipes } = useDataContext()

  const [recipe, setRecipe] = useState({})
  const [ingredients, setIngredients] = useState([])
  const [instructions, setInstructions] = useState([])
  const [nutrients, setNutrients] = useState([])
  const [calories, setCalories] = useState(null)
  const [recipeType, setRecipeType] = useState(null)
  const [like, setLike] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(RECIPE_URL(id))

        if (!response.ok) {
          throw new Error('Error fetching recipe data.')
        }

        const {
          title,
          image,
          readyInMinutes,
          nutrition: { nutrients },
          extendedIngredients,
          analyzedInstructions,
          dishTypes,
        } = await response.json()

        setRecipe({ title, image, readyInMinutes })
        setNutrients(
          nutrients.map(
            (nutrient) =>
              `${nutrient.name}: ${nutrient.amount} ${nutrient.unit}`
          )
        )
        setCalories(
          nutrients.find((nutrient) => nutrient.name === 'Calories').amount
        )
        setIngredients(
          extendedIngredients.map((ingredient) => ingredient.original)
        )

        if (analyzedInstructions.length) {
          setInstructions(
            analyzedInstructions[0].steps.map((step) => step.step)
          )
        } else {
          setInstructions(['No Directions Available'])
        }

        const filteredTypes = dishTypes.filter((type) =>
          RECIPES_TYPES.some((t) => t === type)
        )

        setRecipeType(capitalize(filteredTypes[0]))
      } catch (error) {
        console.error('useFetchRecipe error:', error.message)
        setError('Unable to fetch recipe data.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    const liked = favRecipes?.some((recipe) => recipe.id === String(id))
    setLike(liked)
  }, [id, favRecipes])

  return {
    recipe,
    nutrients,
    calories,
    ingredients,
    instructions,
    recipeType,
    like,
    loading,
    error,
  }
}

export default useFetchRecipe
