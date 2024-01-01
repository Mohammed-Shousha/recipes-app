import { RowContainer } from '@components/styles/Containers.styles'
import { StyledTextInput } from '@components/styles/Inputs.styles'

import { PressableIcon } from './Icons'

export const IconInput = ({
  placeholder,
  icon,
  handlePress,
  inputValue,
  setInputValue,
  returnKeyType,
}) => {
  return (
    <RowContainer>
      <StyledTextInput
        placeholder={placeholder}
        value={inputValue}
        onChangeText={setInputValue}
        onSubmitEditing={handlePress}
        returnKeyType={returnKeyType || 'done'}
      />
      <PressableIcon onPress={handlePress} icon={icon} size="25" />
    </RowContainer>
  )
}
