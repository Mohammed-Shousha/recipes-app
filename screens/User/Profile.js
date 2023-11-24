import { Container } from '@components/styles/Containers.styles.'
import { Text } from '@components/styles/Texts.styles'

import { Button } from '@components'

export const Profile = ({ navigation }) => {
  const handleSignIn = () => {
    navigation.navigate('Sign In')
  }

  const handleResiger = () => {
    navigation.navigate('Register')
  }

  return (
    <Container center>
      <Text center>
        Sign In or Register to access your profile and your favourite recipes.
      </Text>
      <Button onPress={handleSignIn}>Sign In</Button>
      <Button onPress={handleResiger} secondary>
        Register
      </Button>
    </Container>
  )
}
