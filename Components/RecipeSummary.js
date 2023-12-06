import { RecipeInfo, RowContainer } from '@components/styles/Containers.styles'

import { Icon } from '@components/styles/Images.styles'

import { StyledText } from './styles/Texts.styles'

import recipeTypeImg from '@assets/icons/recipeType.png'
import recipeTime from '@assets/icons/recipeTime.png'
import recipeCalories from '@assets/icons/recipeCalories.png'

export const RecipeSummary = ({ recipe }) => {
  const recipeInfo = [
    {
      name: recipe.type,
      color: '#ccf2f4',
      image: recipeTypeImg,
    },
    {
      name: recipe.time + ' m',
      color: '#e8e9a1',
      image: recipeTime,
    },
  ]

  if (recipe.calories) {
    recipeInfo.push({
      name: Math.floor(recipe.calories) + ' kcal',
      color: '#f2d2d2',
      image: recipeCalories,
    })
  }

  const size = recipeInfo.length === 2 ? '20' : '18'

  return (
    <RowContainer>
      {recipeInfo.map((r) => (
        <RecipeInfo key={r.name} color={r.color}>
          <Icon source={r.image} size={size} />
          <StyledText size={size}>{r.name}</StyledText>
        </RecipeInfo>
      ))}
    </RowContainer>
  )
}
