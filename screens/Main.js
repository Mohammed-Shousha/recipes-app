import Boxes from '@components/Boxes'

import { Container } from '@components/styles/Containers.styles.'
import { mainCategories } from '@root/utils/database'

import { CATEGORY_SEARCH } from '@utils/constants'

import { fetchData } from '@root/utils/helpers'

export const Main = () => {
  const fetchCategoryRecipes = async (name) => {
    const { results } = await fetchData(CATEGORY_SEARCH(name))

    return results
  }

  return (
    <Container>
      <Boxes categories={mainCategories} fetchRecipes={fetchCategoryRecipes} />
    </Container>
  )
}
