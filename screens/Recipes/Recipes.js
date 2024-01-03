import { FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native'

import emptyDish from '@assets/images/emptyDish.png'

import { useDataState } from '@context'

import { RecipeTile, ErrorDisplay } from '@components'

export const Recipes = () => {
  const { recipes: mainRecipes, searchRecipes } = useDataState()
  const route = useRoute()

  const recipes = route.name === 'Main-Recipes' ? mainRecipes : searchRecipes

  if (!recipes)
    return (
      <ErrorDisplay
        message="Sorry We Couldn't Find Any Recipe"
        icon={emptyDish}
      />
    )

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <RecipeTile recipe={item} />}
    />
  )
}
