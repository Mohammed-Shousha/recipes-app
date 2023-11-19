import { useContext, useState } from 'react'
import { ScrollView, Modal, Pressable, ActivityIndicator } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { uploadImage, joinLines } from '@root/utils/helpers'
import { ButtonText, StyledButton } from '@components/styles/Buttons.styles'
import {
  EditRecipeImage,
  Exit,
  Icon,
  RecipeImage,
  SelectionIcon,
} from '@components/styles/Images.styles'
import {
  Container,
  ModalContainer,
  ModalDetails,
  RowContainer,
} from '@components/styles/Containers.styles.'
import { ErrorText, Text } from '@components/styles/Texts.styles'
import { FormInput } from '@components/styles/Inputs.styles'
import { dishTypes } from '@root/utils/database'
import { DataContext } from '@root/Context'

import xImg from '@assets/icons/x.png'
import down from '@assets/icons/down.png'
import gallery from '@assets/icons/gallery.png'
import edit from '@assets/icons/edit.png'

export const AddRecipe = ({ navigation }) => {
  const { userData, setUserData } = useContext(DataContext)
  const { email } = userData

  const [image, setImage] = useState('')
  const [modal, setModal] = useState(false)
  const [type, setType] = useState('')
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)

  const HANDLE_ADDING_RECIPE = gql`
    mutation AddRecipe(
      $email: String!
      $title: String!
      $time: Int!
      $type: String!
      $ingredients: String!
      $directions: String!
      $image: String
    ) {
      AddRecipe(
        email: $email
        title: $title
        time: $time
        type: $type
        ingredients: $ingredients
        directions: $directions
        image: $image
      ) {
        data {
          ... on Recipe {
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

  const [AddRecipe] = useMutation(HANDLE_ADDING_RECIPE, {
    onCompleted({ AddRecipe }) {
      if (AddRecipe.result === 1) {
        setUserData({
          ...userData,
          recipes: AddRecipe.data,
        })
        navigation.goBack()
      }
    },
  })

  const selectDishType = (type) => {
    setType(type)
    setModal(false)
  }

  return (
    <Container>
      <ScrollView>
        <Formik
          initialValues={{
            title: '',
            time: '',
            type: '',
            ingredients: '',
            directions: '',
          }}
          validationSchema={Yup.object({
            title: Yup.string().required('Required').min(2, 'Too Short'),
            time: Yup.number().required('Required'),
            ingredients: Yup.string().required('Required'),
            directions: Yup.string().required('Required'),
          })}
          onSubmit={({ title, time, ingredients, directions }) => {
            AddRecipe({
              variables: {
                email,
                title,
                time: +time,
                type,
                ingredients: joinLines(ingredients),
                directions: joinLines(directions),
                image,
              },
            })
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <FormInput
                placeholder="Recipe Name"
                value={values.title}
                onChangeText={handleChange('title')}
                onFocus={() => setActive('title')}
                onBlur={() => setActive(false)}
                active={active === 'title'}
                returnKeyType="next"
              />
              {errors.title && touched.title && (
                <ErrorText>{errors.title}</ErrorText>
              )}
              <Pressable onPress={() => setModal(true)}>
                <FormInput
                  placeholder="Dish Type"
                  editable={false}
                  value={type}
                  active={modal}
                />
                <SelectionIcon onPress={() => setModal(true)}>
                  <Icon source={down} size="40" />
                </SelectionIcon>
              </Pressable>
              {!type && touched.type && <ErrorText>Required</ErrorText>}
              <FormInput
                placeholder="Ingredients"
                value={values.ingredients}
                multiline
                numberOfLines={3}
                onChangeText={handleChange('ingredients')}
                onFocus={() => setActive('ingredients')}
                onBlur={() => setActive(false)}
                active={active === 'ingredients'}
              />
              {errors.ingredients && touched.ingredients && (
                <ErrorText>{errors.ingredients}</ErrorText>
              )}
              <FormInput
                placeholder="Directions"
                value={values.directions}
                multiline
                numberOfLines={3}
                onChangeText={handleChange('directions')}
                onFocus={() => setActive('directions')}
                onBlur={() => setActive(false)}
                active={active === 'directions'}
              />
              {errors.directions && touched.directions && (
                <ErrorText>{errors.directions}</ErrorText>
              )}
              <FormInput
                placeholder="Minutes to Be Ready"
                value={values.time}
                keyboardType="numeric"
                onChangeText={handleChange('time')}
                onFocus={() => setActive('time')}
                onBlur={() => setActive(false)}
                active={active === 'time'}
                returnKeyType="done"
              />
              {errors.time && touched.time && (
                <ErrorText>{errors.time}</ErrorText>
              )}
              <Modal
                animationType="fade"
                visible={modal}
                transparent
                onRequestClose={() => setModal(false)}
              >
                <ModalContainer>
                  <Exit onPress={() => setModal(false)}>
                    <Icon source={xImg} size="18" />
                  </Exit>
                  {dishTypes.map((type, i) => (
                    <ModalDetails key={i} onPress={() => selectDishType(type)}>
                      <Text size="25">{type}</Text>
                    </ModalDetails>
                  ))}
                </ModalContainer>
              </Modal>
              {loading ? (
                <ActivityIndicator color="green" size="large" />
              ) : !image ? (
                <StyledButton width="45%">
                  <RowContainer
                    onPress={() => uploadImage(setLoading, setImage)}
                  >
                    <Icon source={gallery} size="23" />
                    <ButtonText size="20px">Upload Image</ButtonText>
                  </RowContainer>
                </StyledButton>
              ) : (
                <RowContainer>
                  <RecipeImage added source={{ uri: image }} />
                  <EditRecipeImage
                    onPress={() => uploadImage(setLoading, setImage)}
                  >
                    <Icon source={edit} size="20" />
                  </EditRecipeImage>
                </RowContainer>
              )}
              <StyledButton
                width="80%"
                onPress={handleSubmit}
                disabled={isSubmitting}
                rev={isSubmitting}
              >
                <ButtonText size="28px" rev={isSubmitting}>
                  Add Recipe
                </ButtonText>
              </StyledButton>
            </>
          )}
        </Formik>
      </ScrollView>
    </Container>
  )
}
