import { RowContainer } from '@components/styles/Containers.styles.'
import { Input } from '@components/styles/Inputs.styles'
import { Icon, PressableIcon } from '@components/styles/Images.styles'

export const IconInput = ({
  placeholder,
  icon,
  handlePress,
  inputValue,
  setInputValue,
}) => {
  return (
    <RowContainer>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChangeText={setInputValue}
        onSubmitEditing={handlePress}
      />
      <PressableIcon onPress={handlePress}>
        <Icon source={icon} size="25" />
      </PressableIcon>
    </RowContainer>
  )
}
