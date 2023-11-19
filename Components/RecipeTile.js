import { RowContainer } from './styles/Containers.styles.'
import { useNavigation } from '@react-navigation/native'
import { RecipeMiniImage } from './styles/Images.styles'
import { Text } from './styles/Texts.styles'

export const RecipeTile = ({ recipe }) => {
  const navigation = useNavigation()

  const navigateToRecipe = () => {
    navigation.navigate('Recipe', { id: recipe.id })
  }

  return (
    <RowContainer flexStart onPress={navigateToRecipe}>
      <RecipeMiniImage source={{ uri: recipe.image }} />
      <Text style={{ width: 240 }}>{recipe.title}</Text>
    </RowContainer>
  )
}
