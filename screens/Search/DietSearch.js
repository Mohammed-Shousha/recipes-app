import Boxes from '@components/Boxes'

import { Container } from '@components/styles/Containers.styles.'
import { dietCategories } from '@root/utils/database'

import { DIET_SEARCH } from '@utils/constants'

import { fetchData } from '@root/utils/helpers'

export const DietSearch = () => {
  const fetchDietRecipes = async (name) => {
    const { results } = await fetchData(DIET_SEARCH(name))

    return results
  }

  return (
    <Container>
      <Boxes categories={dietCategories} fetchRecipes={fetchDietRecipes} />
    </Container>
  )
}
