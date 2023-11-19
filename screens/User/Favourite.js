import { useContext } from 'react'
import { ScrollView } from 'react-native'

import { DataContext } from '@root/Context'

import { Container } from '@components/styles/Containers.styles.'
import { RecipeTile, ErrorDisplay } from '@components'

import emptyDish from '@assets/images/emptyDish.png'

export const Favourite = () => {
  const {
    userData: { favRecipes },
  } = useContext(DataContext)

  return favRecipes.length ? (
    <Container>
      <ScrollView>
        {favRecipes.map((recipe) => (
          <RecipeTile key={recipe.id} recipe={recipe} />
        ))}
      </ScrollView>
    </Container>
  ) : (
    <ErrorDisplay
      message="No favourite recipes yet. Explore and find your next favourite dish!"
      icon={emptyDish}
    />
  )
}
