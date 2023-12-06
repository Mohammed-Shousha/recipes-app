import { FlatList } from 'react-native'

import emptyDish from '@assets/images/emptyDish.png'

import { useRecipesContext } from '@root/Context'

import { RecipeTile, ErrorDisplay } from '@components'

export const Recipes = () => {
  const { recipes } = useRecipesContext()

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
