import { StyledButton, ButtonText } from '@components/styles/Buttons.styles'
import { Icon } from '@components/styles/Images.styles'

import { ActivityIndicator } from 'react-native'
export const Button = ({
  children,
  onPress,
  secondary,
  disabled = false,
  loading = false,
  icon,
  style = { width: '70%', fontSize: '24px', iconSize: '24' },
}) => {
  return (
    <StyledButton
      width={style.width}
      onPress={onPress}
      rev={secondary}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#D6E5E3" />
      ) : (
        <>
          {icon && <Icon source={icon} size={style.iconSize} />}
          <ButtonText size={style.fontSize} rev={secondary}>
            {children}
          </ButtonText>
        </>
      )}
    </StyledButton>
  )
}
