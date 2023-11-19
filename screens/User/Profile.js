import { ButtonText, FormButton } from '@components/styles/Buttons.styles'
import { Container } from '@components/styles/Containers.styles.'
import { Text } from '@components/styles/Texts.styles'

export const Profile = ({ navigation }) => (
  <Container center>
    <Text center>
      Sign In or Register to access your profile and your favourite recipes.
    </Text>
    <FormButton width="50%" onPress={() => navigation.navigate('Sign In')}>
      <ButtonText size="20px">Sign In</ButtonText>
    </FormButton>
    <FormButton width="50%" onPress={() => navigation.navigate('Register')} rev>
      <ButtonText rev size="20px">
        Register
      </ButtonText>
    </FormButton>
  </Container>
)
