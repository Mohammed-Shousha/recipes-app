import { Boxes } from '@components'

import { dietCategories } from '@utils/database'
import { DIET_SEARCH } from '@utils/constants'
import { fetchData } from '@utils/helpers'

export const DietSearch = () => {
  const fetchDietRecipes = async (name) => {
    const { results } = await fetchData(DIET_SEARCH(name))

    return results
  }

  return <Boxes categories={dietCategories} fetchRecipes={fetchDietRecipes} />
}
