import { RowContainer } from './styles/Containers.styles'
import { useNavigation } from '@react-navigation/native'
import { RecipeMiniImage } from './styles/Images.styles'
import { StyledText } from './styles/Texts.styles'
import { DEFAULT_RECIPE_IMAGE } from '@utils/constants'

export const RecipeTile = ({ recipe, userRecipe = false }) => {
  const navigation = useNavigation()

  const navigateToRecipe = () => {
    navigation.navigate('Recipe', { id: recipe.id })
  }

  const navigateToUserRecipe = () => {
    navigation.navigate('User Recipe', { id: recipe.id })
  }

  const handlePress = userRecipe ? navigateToUserRecipe : navigateToRecipe

  return (
    <RowContainer
      style={{ justifyContent: 'flex-start' }}
      onPress={handlePress}
    >
      <RecipeMiniImage source={{ uri: recipe.image ?? DEFAULT_RECIPE_IMAGE }} />
      <StyledText style={{ width: 240 }}>{recipe.title}</StyledText>
    </RowContainer>
  )
}
