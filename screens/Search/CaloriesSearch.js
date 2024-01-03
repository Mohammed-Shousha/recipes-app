import { Boxes } from '@components'

import { caloriesCategories } from '@utils/database'
import { CALORIES_SEARCH } from '@utils/constants'

import { fetchData } from '@utils/helpers'

export const CaloriesSearch = () => {
  const fetchCaloriesRecipes = async (name) => {
    const calories = name.split(' ').at(-1) // get the last word (max-calories)

    const { results } = await fetchData(CALORIES_SEARCH(calories))

    return results
  }

  return (
    <Boxes
      categories={caloriesCategories}
      fetchRecipes={fetchCaloriesRecipes}
    />
  )
}
