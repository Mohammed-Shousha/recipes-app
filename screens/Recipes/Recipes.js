import { FlatList } from 'react-native'

import emptyDish from '@assets/images/emptyDish.png'

import { useDataContext } from '@context'

import { RecipeTile, ErrorDisplay } from '@components'

export const Recipes = () => {
  const { recipes } = useDataContext()

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
