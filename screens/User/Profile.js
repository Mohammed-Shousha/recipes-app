import { CenterContainer } from '@components/styles/Containers.styles'
import { StyledText } from '@components/styles/Texts.styles'

import { Button } from '@components'

export const Profile = ({ navigation }) => {
  const handleSignIn = () => {
    navigation.navigate('Sign In')
  }

  const handleResiger = () => {
    navigation.navigate('Register')
  }

  return (
    <CenterContainer>
      <StyledText center>
        Sign In or Register to access your profile and your favourite recipes.
      </StyledText>
      <Button onPress={handleSignIn}>Sign In</Button>
      <Button onPress={handleResiger} secondary>
        Register
      </Button>
    </CenterContainer>
  )
}
