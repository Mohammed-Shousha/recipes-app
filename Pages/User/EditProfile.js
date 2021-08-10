import React, { useContext, useState, useRef } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Modal } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { Container, RowContainer, ModalContainer } from '../../Components/Containers'
import { EditUserImage, Icon, UserImage, Exit } from '../../Components/Images'
import user from '../../Data/images/chef.png'
import edit from '../../Data/images/edit.png'
import { ErrorText, ProfileText, Text } from '../../Components/Texts'
import { ButtonText, StyledButton } from '../../Components/Buttons'
import { FormInput } from '../../Components/Inputs'
import { DataContext } from '../../Data/Context'
import xImg from '../../Data/images/x.png'
import { passwordRegex } from '../../Data/Database'


const EditProfile = ({ navigation }) => {

   const { userImage, setUserImage } = useContext(DataContext)
   const { userData, setUserData } = useContext(DataContext)
   const { email } = userData

   const [modal, setModal] = useState(false)
   const [active, setActive] = useState(null)
   const [passwordError, setPasswordError] = useState(null)


   const passwordRef = useRef()
   const newPasswordRef = useRef()
   const confirmPasswordRef = useRef()

   const HANDLE_UPLOADING_IMAGE = gql`
      mutation UploadImage($email: String!, $image: String!){
         UploadImage(email: $email, image: $image){
            id
            email
            image
         }
      }
	`

   const [UploadImage] = useMutation(HANDLE_UPLOADING_IMAGE, {
      onCompleted({ UploadImage }) {
         if (UploadImage.id) {
            setUserImage(UploadImage.image)
         }
      }
   })


   let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (permissionResult.granted === false) {
         alert("Permission to access camera roll is required!")
         return
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync()
      // launchImageLibrary({mediaType: 'photo'}, (response)=>{
      //    console.log(response.uri)
      // })
      console.log(pickerResult)
      setUserImage(pickerResult.uri)
      // UploadImage({
      //    variables: {
      //       email,
      //       image: pickerResult.uri
      //    }
      // })
   }

   const HANDLE_CHANGING_DATA = gql`
      mutation ChangeData($email: String!, $name: String!){
         ChangeData(email: $email, name: $name){
            ... on User{
               id
               name
               email
            }
            ... on Error{
               message
            }
         }
      }
	`

   const [ChangeData] = useMutation(HANDLE_CHANGING_DATA, {
      onCompleted({ ChangeData }) {
         const { id, name, email } = ChangeData
         if (id) {
            setUserData({
               name,
               email
            })
            navigation.navigate('User')
         }else{
            alert(ChangeData.message)
         }
      }
   })

   const HANDLE_CHANGING_PASSWORD = gql`
      mutation ChangePassword($email: String!, $password: String!, $newPassword: String!){
         ChangePassword(email: $email, password: $password, newPassword: $newPassword){
            ... on User{
               id
               name
               email
            }
            ... on Error{
               message
            }
         }
      }
	`

   const [ChangePassword] = useMutation(HANDLE_CHANGING_PASSWORD, {
      onCompleted({ ChangePassword }) {
         if (ChangePassword.name) {
            setModal(false)
         } else if (ChangePassword.message) {
            setPasswordError(ChangePassword.message)
            setTimeout(() => setPasswordError(null), 3000)
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
            <UserImage
               source={userImage ? { uri: userImage } : user}
            />
            <EditUserImage onPress={openImagePickerAsync}>
               <Icon
                  source={edit}
                  size='15'
               />
            </EditUserImage>
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
                     name,
                     email: userData.email
                  }
               })
               UploadImage({
                  variables: {
                     email,
                     image: userImage
                  }
               })
            }}
         >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
               <>
                  <ProfileText size='28'>
                     Name
                  </ProfileText>
                  <FormInput
                     value={values.name}
                     onChangeText={handleChange('name')}
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

                  <StyledButton
                     width='65%'
                     onPress={() => setModal(true)}
                  >
                     <ButtonText size='28px' >
                        Change Password
                     </ButtonText>
                  </StyledButton>
                  <StyledButton
                     width='80%'
                     onPress={handleSubmit}
                  >
                     <ButtonText size='28px' >
                        Save
                     </ButtonText>
                  </StyledButton>
               </>
            )}
         </Formik>
         <Modal
            animationType='fade'
            visible={modal}
            transparent={true}
            onRequestClose={() => setModal(false)}
         >
            <ModalContainer password>
               <Exit
                  onPress={() => setModal(false)}
               >
                  <Icon
                     source={xImg}
                     size='18'
                  />
               </Exit>
               <Formik
                  initialValues={{
                     password: '',
                     newPassword: '',
                     confirmPassword: '',
                  }}
                  validationSchema={Yup.object({
                     password: Yup.string()
                        .required('Required'),
                     newPassword: Yup.string()
                        .required('Required')
                        .matches(passwordRegex, 'Password must contain at least one letter, at least one number, and be longer than 8 charaters'),
                     confirmPassword: Yup.string()
                        .required('Required')
                        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                  })}
                  onSubmit={({ password, newPassword, confirmPassword }) => {
                     ChangePassword({
                        variables: {
                           email,
                           password,
                           newPassword
                        }
                     })
                  }}
               >
                  {({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
                     <>
                        <FormInput
                           placeholder='Password'
                           value={values.password}
                           onChangeText={handleChange('password')}
                           secureTextEntry={true}
                           onFocus={() => setActive('password')}
                           onBlur={() => setActive(false)}
                           onBlur={handleBlur('password')}
                           active={active === 'password' ? true : false}
                           returnKeyType='next'
                           onSubmitEditing={() => newPasswordRef.current.focus()}
                           ref={passwordRef}
                        />
                        {errors.password && touched.password && <ErrorText>{errors.password}</ErrorText>}
                        <FormInput
                           placeholder='New Password'
                           value={values.newPassword}
                           onChangeText={handleChange('newPassword')}
                           secureTextEntry={true}
                           onFocus={() => setActive('newPassword')}
                           onBlur={() => setActive(false)}
                           onBlur={handleBlur('newPassword')}
                           active={active === 'newPassword' ? true : false}
                           returnKeyType='next'
                           onSubmitEditing={() => confirmPasswordRef.current.focus()}
                           ref={newPasswordRef}
                        />
                        {errors.newPassword && touched.newPassword && <ErrorText>{errors.newPassword}</ErrorText>}
                        <FormInput
                           placeholder='Confirm Password'
                           value={values.confirmPassword}
                           onChangeText={handleChange('confirmPassword')}
                           secureTextEntry={true}
                           onFocus={() => setActive('confirmPassword')}
                           onBlur={() => setActive(false)}
                           onBlur={handleBlur('confirmPassword')}
                           active={active === 'confirmPassword' ? true : false}
                           returnKeyType='done'
                           ref={confirmPasswordRef}
                        />
                        {errors.confirmPassword && touched.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
                        {passwordError && <ErrorText>{passwordError}</ErrorText>}
                        <StyledButton
                           width='70%'
                           onPress={handleSubmit}
                        >
                           <ButtonText size='28px' >
                              Save
                           </ButtonText>
                        </StyledButton>
                     </>
                  )}
               </Formik>
            </ModalContainer>
         </Modal>
      </Container>
   )
}

export default EditProfile