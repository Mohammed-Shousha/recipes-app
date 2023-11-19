import Boxes from '@components/Boxes'
import { timeCategories } from '@root/utils/database'

import { Container } from '@components/styles/Containers.styles.'

import { TIME_SEARCH } from '@utils/constants'

import { fetchData } from '@root/utils/helpers'

export const TimeSearch = () => {
  const fetchTimeRecipes = async (name) => {
    const time = Number(name.split(' ')[0])
    const { results } = await fetchData(TIME_SEARCH(time))

    return results
  }
  return (
    <Container>
      <Boxes categories={timeCategories} fetchRecipes={fetchTimeRecipes} />
    </Container>
  )
}
