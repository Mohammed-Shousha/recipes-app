import { Box } from '@components/styles/Containers.styles.'
import { Icon } from '@components/styles/Images.styles'
import { Text } from '@components/styles/Texts.styles'

export const BoxComponent = ({ color, onPress, icon, iconSize, text }) => {
  return (
    <Box color={color} onPress={onPress}>
      <Icon source={icon} size={iconSize} />
      <Text> {text} </Text>
    </Box>
  )

  /*
  <>
    <Icon source={C.image} size={C.imgSize} />
    {styledText ? ( //calories
        <Text style={{ color: 'white', fontSize: 28 }}>{C.name}</Text>
    ) : (
        text && <Text> {C.name} </Text>
    )}
 </>
  */
}
