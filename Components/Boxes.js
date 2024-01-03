import { useNavigation, useRoute } from '@react-navigation/native'

import { BoxesContainer } from '@components/styles/Containers.styles'

import { useDataDispatch } from '@context'
import { setRecipes, setSearchRecipes } from '@context/actions'

import { BoxComponent } from './Box'

export const Boxes = ({
  categories,
  text = true, // for time
  styledText = false, // for calories
  fetchRecipes,
}) => {
  const navigation = useNavigation()
  const route = useRoute()

  console.log('Boxes', route.name)

  const dispatch = useDataDispatch()

  const fetchAndNavigate = async (name) => {
    const recipes = await fetchRecipes(name)

    const navigateTo = route.name === 'Main' ? 'Main-Recipes' : 'Recipes'
    const action = route.name === 'Main' ? setRecipes : setSearchRecipes

    dispatch(action(recipes))
    navigation.navigate(navigateTo)
  }

  const searchRecipes = (name) => {
    if (route.name === 'Search') {
      console.log('searchRecipes', name)
      navigation.navigate(name)
    } else {
      console.log('searchRecipes fetch', name)
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
