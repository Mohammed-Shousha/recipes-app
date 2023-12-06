import { useState, useEffect } from 'react'

import { useDataContext } from '@root/Context'

import { RECIPES_TYPES } from '@utils/database'
import { RECIPE_URL } from '@utils/constants'
import { capitalize } from '@utils/helpers'

const useFetchRecipe = (id) => {
  const {
    userData: { favRecipes },
  } = useDataContext()

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

        if (favRecipes) {
          const liked = favRecipes.some((recipe) => recipe.id === id)

          if (liked) {
            setLike(true)
          }
        }
      } catch (error) {
        console.error({ error })
        setError('Error fetching recipe data.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, favRecipes])

  return {
    recipe,
    nutrients,
    calories,
    ingredients,
    instructions,
    recipeType,
    like,
    setLike,
    loading,
    error,
  }
}

export default useFetchRecipe
