import { ScrollView } from 'react-native'

import { useDataState } from '@context'

import { RecipeTile, ErrorDisplay } from '@components'

import emptyDish from '@assets/images/emptyDish.png'

export const Favourite = () => {
  const { favRecipes } = useDataState()

  if (!favRecipes?.length)
    return (
      <ErrorDisplay
        message="Sorry We Couldn't Find Any Recipe"
        icon={emptyDish}
      />
    )

  return (
    <ScrollView>
      {favRecipes.map((recipe) => (
        <RecipeTile key={recipe.id} recipe={recipe} />
      ))}
    </ScrollView>
  )
}
