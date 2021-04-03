import React from 'react'
import { useHistory } from 'react-router-native'
import { ButtonText, FormButton } from '../../Components/Buttons'
import { Container } from '../../Components/Containers'
import { Text, Title } from '../../Components/Texts'


const Profile = () =>{

   const history = useHistory()
   
   return(
      <Container center>
         <Title>Your Profile</Title>
         <Text center>
            To access your profile and your favourite recipes, Please sign in or sign up.
         </Text>
         <FormButton
            width='50%'
            onPress={() => history.push('/signin')}
         >
            <ButtonText size='20px'>
               Sign In
            </ButtonText>
         </FormButton>
         <FormButton
            width='50%'
            onPress={() => history.push('/signup')}
            rev
         >
            <ButtonText
               rev 
               size='20px'
            >
               Sign Up
            </ButtonText>
         </FormButton>
      </Container>
   )
}

export default Profile