import React from 'react'
import { ButtonText, FormButton } from '../../Components/Buttons'
import { Container } from '../../Components/Containers'
import { Text } from '../../Components/Texts'


const Profile = ({ navigation }) => (
   <Container center>
      <Text center>
         Sign In or Register to access your profile and your favourite recipes.
      </Text>
      <FormButton
         width='50%'
         onPress={() => navigation.navigate('Sign In')}
      >
         <ButtonText size='20px'>
            Sign In
         </ButtonText>
      </FormButton>
      <FormButton
         width='50%'
         onPress={() => navigation.navigate('Register')}
         rev
      >
         <ButtonText
            rev
            size='20px'
         >
            Register
         </ButtonText>
      </FormButton>
   </Container>
)


export default Profile