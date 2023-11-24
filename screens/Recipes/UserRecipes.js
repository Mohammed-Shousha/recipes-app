import { useContext } from 'react'
import { ScrollView } from 'react-native'

import { AddButton } from '@components/styles/Buttons.styles'
import { Container } from '@components/styles/Containers.styles.'
import { Icon } from '@components/styles/Images.styles'

import { DataContext } from '@root/Context'

import cookbook from '@assets/images/cookbook.png'
import { plusIcon } from '@assets/icons'

import { LoadingDisplay, ErrorDisplay, RecipeTile } from '@components'

export const UserRecipes = ({ navigation }) => {
  const {
    userData: { recipes },
    loading,
  } = useContext(DataContext)

  const navigateToAddRecipe = () => {
    navigation.navigate('Add Recipe')
  }

  if (loading) return <LoadingDisplay />

  return (
    <Container>
      {!recipes || recipes.length === 0 ? (
        <ErrorDisplay
          message="Your recipes book is empty, add your own recipes to get started!"
          icon={cookbook}
        />
      ) : (
        <ScrollView>
          {recipes.map((recipe) => (
            <RecipeTile key={recipe.id} recipe={recipe} userRecipe />
          ))}
        </ScrollView>
      )}
      <AddButton onPress={navigateToAddRecipe}>
        <Icon source={plusIcon} size="25" />
      </AddButton>
    </Container>
  )
}
