import { Pressable } from 'react-native'

import { Icon } from '@components/styles/Images.styles'

export const PressableIcon = ({ onPress, icon, size }) => {
  return (
    <Pressable onPress={onPress}>
      <Icon source={icon} size={size} />
    </Pressable>
  )
}
