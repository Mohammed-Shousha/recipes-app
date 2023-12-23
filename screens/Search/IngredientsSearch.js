import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Title } from '@components/styles/Texts.styles'

import {
  CenterContainer,
  RowContainer,
} from '@components/styles/Containers.styles'

import { useDataContext } from '@context'

import { IconInput, IngredientTile, PressableIcon } from '@components'

import { plusIcon, searchIcon } from '@assets/icons'

import { INGREDIENTS_SEARCH } from '@utils/constants'
import { fetchData } from '@utils/helpers'

export const IngredientsSearch = () => {
  const navigation = useNavigation()
  const { setRecipes } = useDataContext()

  const [ingredients, setIngredients] = useState([])
  const [ingredient, setIngredient] = useState('')

  const searchRecipesByIngredients = async () => {
    const data = await fetchData(INGREDIENTS_SEARCH(ingredients))
    if (!data.length) {
      setRecipes(null)
    } else {
      setRecipes(data)
    }
    navigation.navigate('Recipes')
    setIngredients([])
  }

  const addIngredient = () => {
    setRecipes([])
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient.trim()])
      setIngredient('')
    }
  }

  const removeIngredient = (i) => {
    const newIngredients = [...ingredients]
    newIngredients.splice(i, 1)
    setIngredients(newIngredients)
  }

  useEffect(() => {
    setRecipes([])
  }, [setRecipes])

  return (
    <>
      <IconInput
        placeholder="Ingredient"
        handlePress={addIngredient}
        icon={plusIcon}
        inputValue={ingredient}
        setInputValue={setIngredient}
      />

      {ingredients.length ? (
        <>
          <RowContainer>
            <Title>Ingredients</Title>
            <PressableIcon
              onPress={searchRecipesByIngredients}
              icon={searchIcon}
              size="25"
            />
          </RowContainer>

          <View>
            {ingredients.map((ingredient, i) => (
              <IngredientTile
                key={i}
                ingredient={ingredient}
                onRemove={() => removeIngredient(i)}
              />
            ))}
          </View>
        </>
      ) : (
        <CenterContainer>
          <Title> Add Ingredients </Title>
        </CenterContainer>
      )}
    </>
  )
}
