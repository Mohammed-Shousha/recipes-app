import { useState } from 'react'

import { useDataContext } from '@context'
import { searchCategories } from '@utils/database'

import { QUERY_SEARCH } from '@utils/constants'
import { fetchData } from '@utils/helpers'

import { searchIcon } from '@assets/icons'

import { Boxes, IconInput } from '@components'

export const Search = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState('')

  const { setRecipes } = useDataContext()

  const searchRecipes = async () => {
    const { results } = await fetchData(QUERY_SEARCH(searchValue))

    if (!results.length) {
      setRecipes(null)
    } else {
      setRecipes(results)
    }
    navigation.navigate('Recipes')
    setSearchValue('')
  }

  return (
    <>
      <IconInput
        placeholder="Search"
        icon={searchIcon}
        handlePress={searchRecipes}
        inputValue={searchValue}
        setInputValue={setSearchValue}
      />
      <Boxes categories={searchCategories} isSearch />
    </>
  )
}
