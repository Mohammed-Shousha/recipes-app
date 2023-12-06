import { Boxes } from '@components'
import { timeCategories } from '@utils/database'

import { TIME_SEARCH } from '@utils/constants'

import { fetchData } from '@utils/helpers'

export const TimeSearch = () => {
  const fetchTimeRecipes = async (name) => {
    const time = Number(name.split(' ')[0])
    const { results } = await fetchData(TIME_SEARCH(time))

    return results
  }
  return <Boxes categories={timeCategories} fetchRecipes={fetchTimeRecipes} />
}
