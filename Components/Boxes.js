import { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'

import { BoxesContainer } from '@components/styles/Containers.styles.'

import { RecipesContext } from '@root/Context'

import { BoxComponent } from '@components'

export const Boxes = ({
  categories,
  text = true, // for time
  styledText = false, // for calories
  fetchRecipes,
  isSearch = false,
}) => {
  const navigation = useNavigation()

  const { setRecipes } = useContext(RecipesContext)

  const fetchAndNavigate = async (name) => {
    const recipes = await fetchRecipes(name)
    setRecipes(recipes)
    navigation.navigate('Recipes')
  }

  const searchRecipes = async (name) => {
    if (isSearch) {
      navigation.navigate(name)
    } else {
      fetchAndNavigate(name)
    }
  }

  return (
    <BoxesContainer>
      {categories.map((category, i) => (
        <BoxComponent
          key={i}
          color={category.color}
          onPress={() => searchRecipes(category.name)}
          icon={category.image}
          iconSize={category.imgSize}
          text={category.name}
        />
      ))}
    </BoxesContainer>
  )
}
