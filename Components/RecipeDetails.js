import { useState } from 'react'

import {
  RecipeDetailsContainer,
  RecipeDetail,
  RowContainer,
} from '@components/styles/Containers.styles'

import { StyledText } from './styles/Texts.styles'

export const RecipeDetails = ({ recipeDetails }) => {
  const [activeDetail, setActiveDetail] = useState(0)

  return (
    <>
      <RowContainer>
        {Object.keys(recipeDetails).map((detailTitle, i) => (
          <RecipeDetail
            onPress={() => setActiveDetail(i)}
            active={activeDetail === i}
            key={detailTitle}
          >
            <StyledText color="#214151">{detailTitle}</StyledText>
          </RecipeDetail>
        ))}
      </RowContainer>

      <RecipeDetailsContainer>
        {Object.values(recipeDetails)[activeDetail].map((detail, i) => (
          <StyledText key={i}>• {detail}</StyledText>
        ))}
      </RecipeDetailsContainer>
    </>
  )
}
