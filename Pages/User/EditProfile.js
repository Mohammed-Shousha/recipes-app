import React, { useContext, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { ActivityIndicator } from 'react-native'
import { uploadImage } from '../../Data/Functions'
import { Container, RowContainer } from '../../Components/Containers'
import { EditUserImage, Icon, LoadingContainer, UserImage } from '../../Components/Images'
import { ErrorText, ProfileText, Text } from '../../Components/Texts'
import { ButtonText, StyledButton } from '../../Components/Buttons'
import { FormInput } from '../../Components/Inputs'
import { DataContext } from '../../Data/Context'
import user from '../../Data/images/chef.png'
import edit from '../../Data/images/edit.png'


const EditProfile = ({ navigation }) => {

   const { userData, setUserData } = useContext(DataContext)
   const { image, password } = userData

   const [userImage, setUserImage] = useState(image)
   const [loading, setLoading] = useState(false)
   const [active, setActive] = useState(false)


   const HANDLE_CHANGING_DATA = gql`
      mutation ChangeData($email: String!, $name: String!, $image:String){
         ChangeData(email: $email, name: $name, image: $image){
            ... on User{
               id
               name
               email
               image
               password
            }
            ... on Error{
               message
            }
         }
      }
	`

   const [ChangeData] = useMutation(HANDLE_CHANGING_DATA, {
      onCompleted({ ChangeData }) {
         if (ChangeData.id) {
            const { name, email, image, password } = ChangeData
            setUserData({
               ...userData,
               email,
               name,
               image,
               password
            })
            navigation.navigate('User')
         } else {
            alert(ChangeData.message)
         }
      }
   })


   return (
      <Container>
         <RowContainer
            width='120px'
            noPadding
            center
         >
            {loading ?
               <LoadingContainer>
                  <ActivityIndicator color='green' size='small' />
               </LoadingContainer>
               :
               <>
                  <UserImage
                     source={userImage ? { uri: userImage } : image ? { uri: image } : user}
                  />
                  <EditUserImage onPress={()=> uploadImage(setLoading, setUserImage)}>
                     <Icon
                        source={edit}
                        size='15'
                     />
                  </EditUserImage>
               </>
            }
         </RowContainer>
         <Formik
            initialValues={{
               name: userData.name,
               email: userData.email,
            }}
            validationSchema={Yup.object({
               name: Yup.string()
                  .min(2, 'Too Short'),
               email: Yup.string()
            })}
            onSubmit={({ name, email }) => {
               ChangeData({
                  variables: {
                     email,
                     name,
                     image: userImage
                  }
               })
            }}
         >
            {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
               <>
                  <ProfileText size='28'>
                     Name
                  </ProfileText>
                  <FormInput
                     value={values.name}
                     onChangeText={handleChange('name')}
                     onFocus={() => setActive(true)}
                     onBlur={() => setActive(false)}
                     active={active}
                  />
                  {errors.name && touched.name && <ErrorText>{errors.name}</ErrorText>}
                  <ProfileText size='28'>
                     Email
                  </ProfileText>
                  <FormInput
                     value={values.email}
                     editable={false}
                  />
                  <Text center size='15'>
                     you can't change your email
                  </Text>
                  {password &&
                     <StyledButton
                        width='65%'
                        onPress={() => navigation.navigate('Change Password')}
                     >
                        <ButtonText size='28px' >
                           Change Password
                        </ButtonText>
                     </StyledButton>
                  }
                  <StyledButton
                     width='80%'
                     onPress={handleSubmit}
                     disabled={isSubmitting}
                     rev={isSubmitting}
                  >
                     <ButtonText
                        size='28px'
                        rev={isSubmitting}
                     >
                        Save
                     </ButtonText>
                  </StyledButton>
               </>
            )}
         </Formik>
      </Container>
   )
}

export default EditProfile