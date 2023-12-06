import { ScrollView } from 'react-native'

import { AddButton } from '@components/styles/Buttons.styles'
import { Icon } from '@components/styles/Images.styles'

import { useDataContext } from '@root/Context'

import cookbook from '@assets/images/cookbook.png'
import { plusIcon } from '@assets/icons'

import { LoadingDisplay, ErrorDisplay, RecipeTile } from '@components'

export const UserRecipes = ({ navigation }) => {
  const {
    userData: { recipes },
    loading,
  } = useDataContext()

  const navigateToAddRecipe = () => {
    navigation.navigate('Add Recipe')
  }

  if (loading) return <LoadingDisplay />

  return (
    <>
      {recipes.length ? (
        <ScrollView>
          {recipes.map((recipe) => (
            <RecipeTile key={recipe.id} recipe={recipe} userRecipe />
          ))}
        </ScrollView>
      ) : (
        <ErrorDisplay
          message="Your recipes book is empty, add your own recipes to get started!"
          icon={cookbook}
        />
      )}

      <AddButton onPress={navigateToAddRecipe}>
        <Icon source={plusIcon} size="25" />
      </AddButton>
    </>
  )
}
