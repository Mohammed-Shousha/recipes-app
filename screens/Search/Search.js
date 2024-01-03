import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { useDataDispatch } from '@context'
import { setSearchRecipes } from '@context/actions'

import { searchCategories } from '@utils/database'

import { QUERY_SEARCH } from '@utils/constants'
import { fetchData } from '@utils/helpers'

import { searchIcon } from '@assets/icons'

import { Boxes, IconInput } from '@components'

export const Search = () => {
  const navigation = useNavigation()
  const dispatch = useDataDispatch()

  const [searchValue, setSearchValue] = useState('')

  const searchRecipes = async () => {
    const { results } = await fetchData(QUERY_SEARCH(searchValue))

    dispatch(setSearchRecipes(results.length ? results : null))

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
      <Boxes categories={searchCategories} />
    </>
  )
}
