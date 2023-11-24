import { Boxes } from '@components'

import { Container } from '@components/styles/Containers.styles.'

import { mainCategories } from '@utils/database'
import { CATEGORY_SEARCH } from '@utils/constants'
import { fetchData } from '@utils/helpers'

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
