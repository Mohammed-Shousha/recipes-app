import { Boxes } from '@components'

import { caloriesCategories } from '@utils/database'
import { CALORIES_SEARCH } from '@utils/constants'

import { fetchData } from '@utils/helpers'

export const CaloriesSearch = () => {
  const fetchCaloriesRecipes = async (name) => {
    const nameArray = name.split(' ')
    let calories = ''
    if (nameArray.length === 2) {
      // 'under 250'
      calories = nameArray[1]
    } else {
      // '250 to 500' (3)
      calories = nameArray[2]
    }
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
