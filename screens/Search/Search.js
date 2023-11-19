import { useContext, useState } from 'react'

import Boxes from '@components/Boxes'

import { Container } from '@components/styles/Containers.styles.'

import { RecipesContext } from '@root/Context'
import { searchCategories } from '@root/utils/database'

import { QUERY_SEARCH } from '@utils/constants'
import { fetchData } from '@root/utils/helpers'

import { searchIcon } from '@assets/icons'

import { IconInput } from '@components'

export const Search = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState('')

  const { setRecipes } = useContext(RecipesContext)

  const searchRecipes = async () => {
    const { results } = await fetchData(QUERY_SEARCH(searchValue))

    if (!results.length) {
      setRecipes([null]) // TODO: the hack
    } else {
      setRecipes(results)
    }
    navigation.navigate('Recipes')
    setSearchValue('')
  }

  return (
    <Container>
      <IconInput
        placeholder="Search"
        icon={searchIcon}
        handlePress={searchRecipes}
        inputValue={searchValue}
        setInputValue={setSearchValue}
      />
      <Boxes categories={searchCategories} isSearch />
    </Container>
  )
}
