import { RowContainer } from '@components/styles/Containers.styles'
import { StyledText } from '@components/styles/Texts.styles'

import { PressableIcon } from './Icons'

import { xIcon } from '@assets/icons'

export const IngredientTile = ({ ingredient, onRemove }) => {
  return (
    <RowContainer>
      <StyledText> {ingredient} </StyledText>
      <PressableIcon onPress={onRemove} icon={xIcon} size="20" />
    </RowContainer>
  )
}
