import React, { useContext, useState } from 'react'
import { ScrollView, Modal, Pressable, ActivityIndicator } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { uploadImage } from '../../Data/Functions'
import { ButtonText, StyledButton } from '../../Components/Buttons'
import { EditRecipeImage, Exit, Icon, RecipeImage, SelectionIcon } from '../../Components/Images'
import { Container, ModalContainer, ModalDetails, RowContainer } from '../../Components/Containers'
import { ErrorText, Text } from '../../Components/Texts'
import { FormInput } from '../../Components/Inputs'
import { dishTypes } from '../../Data/Database'
import { DataContext } from '../../Data/Context'
import { joinLines, separateLines } from '../../Data/Functions'
import xImg from '../../Data/images/x.png'
import down from '../../Data/images/down.png'
import gallery from '../../Data/images/gallery.png'
import edit from '../../Data/images/edit.png'


const EditRecipe = ({ route, navigation }) => {

   const { id } = route.params

   const { userData, setUserData } = useContext(DataContext)
   const { email, recipes } = userData

   const recipe = recipes.find(recipe => recipe.id === id)

   const { title, time, type, directions, ingredients, image } = recipe

   const [recipeImage, setRecipeImage] = useState(image)
   const [recipeType, setRecipeType] = useState(type)
   const [modal, setModal] = useState(false)
   const [active, setActive] = useState(false)
   const [loading, setLoading] = useState(false)

   const HANDLE_EDITING_RECIPE = gql`
      mutation EditRecipe($email: String!, $id: ID!, $title: String!, $time: String!, $type: String!, $ingredients: String!, $directions: String!, $image: String){
         EditRecipe(email: $email, id: $id, title: $title, time: $time, type: $type, ingredients: $ingredients, directions: $directions,  image: $image){
            data {
               ... on Recipe{
                  id
                  title
                  time
                  type
                  ingredients
                  directions
                  image
               }
            }
            result
         }
      }
	`

   const [EditRecipe] = useMutation(HANDLE_EDITING_RECIPE, {
      onCompleted({ EditRecipe }) {
         if (EditRecipe.result === 1) {
            setUserData({
               ...userData,
               recipes: EditRecipe.data
            })
            navigation.goBack()
         }
      }
   })


   const selectDishType = (type) => {
      setRecipeType(type)
      setModal(false)
   }


   return (
      <Container>
         <ScrollView>
            <Formik
               initialValues={{
                  title: title,
                  time: '' + time,
                  type: recipeType,
                  ingredients: separateLines(ingredients),
                  directions: separateLines(directions),
               }}
               validationSchema={Yup.object({
                  title: Yup.string()
                     .required('Required')
                     .min(2, 'Too Short'),
                  time: Yup.number()
                     .required('Required'),
                  ingredients: Yup.string()
                     .required('Required'),
                  directions: Yup.string()
                     .required('Required'),
               })}
               onSubmit={({ title, time, ingredients, directions }) => {
                  EditRecipe({
                     variables: {
                        email,
                        id,
                        title,
                        time,
                        type: recipeType,
                        ingredients: joinLines(ingredients),
                        directions: joinLines(directions),
                        image: recipeImage
                     }
                  })
               }}
            >
               {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
                  <>
                     <FormInput
                        placeholder='Recipe Name'
                        value={values.title}
                        onChangeText={handleChange('title')}
                        onFocus={() => setActive('title')}
                        onBlur={() => setActive(false)}
                        active={active === 'title' ? true : false}
                        returnKeyType='next'
                     />
                     {errors.title && touched.title && <ErrorText>{errors.title}</ErrorText>}
                     <Pressable onPress={() => setModal(true)}>
                        <FormInput
                           placeholder='Dish Type'
                           editable={false}
                           value={recipeType}
                           active={modal}
                        />
                        <SelectionIcon
                           onPress={() => setModal(true)}
                        >
                           <Icon
                              source={down}
                              size='40'
                           />
                        </SelectionIcon>
                     </Pressable>
                     {!recipeType && touched.type && <ErrorText>Required</ErrorText>}
                     <FormInput
                        placeholder='Ingredients'
                        value={values.ingredients}
                        multiline={true}
                        numberOfLines={3}
                        onChangeText={handleChange('ingredients')}
                        onFocus={() => setActive('ingredients')}
                        onBlur={() => setActive(false)}
                        active={active === 'ingredients' ? true : false}
                     />
                     {errors.ingredients && touched.ingredients && <ErrorText>{errors.ingredients}</ErrorText>}
                     <FormInput
                        placeholder='Directions'
                        value={values.directions}
                        multiline={true}
                        numberOfLines={3}
                        onChangeText={handleChange('directions')}
                        onFocus={() => setActive('directions')}
                        onBlur={() => setActive(false)}
                        active={active === 'directions' ? true : false}
                     />
                     {errors.directions && touched.directions && <ErrorText>{errors.directions}</ErrorText>}
                     <FormInput
                        placeholder='Minutes to Be Ready'
                        value={values.time}
                        keyboardType='numeric'
                        onChangeText={handleChange('time')}
                        onFocus={() => setActive('time')}
                        onBlur={() => setActive(false)}
                        active={active === 'time' ? true : false}
                        returnKeyType='done'
                     />
                     {errors.time && touched.time && <ErrorText>{errors.time}</ErrorText>}
                     <Modal
                        animationType='fade'
                        visible={modal}
                        transparent={true}
                        onRequestClose={() => setModal(false)}
                     >
                        <ModalContainer>
                           <Exit
                              onPress={() => setModal(false)}
                           >
                              <Icon
                                 source={xImg}
                                 size='18'
                              />
                           </Exit>
                           {dishTypes.map((type, i) => (
                              <ModalDetails
                                 key={i}
                                 onPress={() => selectDishType(type)}
                              >
                                 <Text size='25'>{type}</Text>
                              </ModalDetails>
                           ))}
                        </ModalContainer>
                     </Modal>
                     {loading ?
                        <ActivityIndicator color='green' size='large' />
                        :
                        !recipeImage ?
                           <StyledButton
                              width='45%'
                           >
                              <RowContainer
                                 onPress={() => uploadImage(setLoading, setRecipeImage)}
                              >
                                 <Icon
                                    source={gallery}
                                    size='23'
                                 />
                                 <ButtonText
                                    size='20px'
                                 >
                                    Upload Image
                                 </ButtonText>
                              </RowContainer>
                           </StyledButton>
                           :
                           <RowContainer>
                              <RecipeImage
                                 added
                                 source={{ uri: recipeImage }}
                              />
                              <EditRecipeImage
                                 onPress={() => uploadImage(setLoading, setRecipeImage)}
                              >
                                 <Icon
                                    source={edit}
                                    size='20'
                                 />
                              </EditRecipeImage>
                           </RowContainer>
                     }
                     <StyledButton
                        width='80%'
                        disabled={isSubmitting}
                        onPress={handleSubmit}
                        rev={isSubmitting}
                     >
                        <ButtonText
                           size='28px'
                           rev={isSubmitting}
                        >
                           Confirm Recipe
                        </ButtonText>
                     </StyledButton>
                  </>
               )}
            </Formik>
         </ScrollView>
      </Container>
   )
}

export default EditRecipe

