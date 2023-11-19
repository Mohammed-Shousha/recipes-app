import { RowContainer } from '@components/styles/Containers.styles.'
import { Icon, PressableIcon } from '@components/styles/Images.styles'
import { Text } from '@components/styles/Texts.styles'

import xIcon from '@assets/icons'

export const IngredientTile = ({ ingredient, onRemove }) => {
  return (
    <RowContainer>
      <Text> {ingredient} </Text>
      <PressableIcon onPress={onRemove}>
        <Icon source={xIcon} size="20" />
      </PressableIcon>
    </RowContainer>
  )
}
