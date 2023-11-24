import { useContext, useState } from 'react'
import { ScrollView, Modal, Pressable, ActivityIndicator } from 'react-native'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'

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

import { DataContext } from '@root/Context'

import xImg from '@assets/icons/x.png'
import down from '@assets/icons/down.png'
import gallery from '@assets/icons/gallery.png'
import edit from '@assets/icons/edit.png'

import { uploadImage, joinLines, separateLines } from '@utils/helpers'
import { dishTypes } from '@utils/database'
import {
  HANDLE_EDITING_RECIPE,
  HANDLE_ADDING_RECIPE,
} from '@utils/graphql/mutations'

import { Button } from '@components'

export const RecipeForm = ({ route, navigation }) => {
  const {
    userData: { email, recipes },
    setUserData,
  } = useContext(DataContext)

  let recipe = {
    title: '',
    time: '',
    type: '',
    directions: '',
    ingredients: '',
    image: '',
  }

  const id = route.params?.id

  if (id) {
    recipe = recipes.find((recipe) => recipe.id === id)
  }

  const { title, time, type, directions, ingredients, image } = recipe

  const [recipeImage, setRecipeImage] = useState(image)
  const [recipeType, setRecipeType] = useState(type)

  const [modal, setModal] = useState(false)
  const [active, setActive] = useState(null)
  const [loading, setLoading] = useState(false)

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const activateInput = (input) => {
    setActive(input)
  }

  const deactivateInput = () => {
    setActive(null)
  }

  const selectDishType = (type) => {
    setRecipeType(type)
    setModal(false)
  }

  const handleCompleted = (mutationResponse) => {
    if (mutationResponse.result === 1) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        recipes: mutationResponse.data,
      }))
      navigation.goBack()
    }
  }

  const [EditRecipe] = useMutation(HANDLE_EDITING_RECIPE, {
    onCompleted: ({ EditRecipe }) => handleCompleted(EditRecipe),
  })

  const [AddRecipe] = useMutation(HANDLE_ADDING_RECIPE, {
    onCompleted: ({ AddRecipe }) => handleCompleted(AddRecipe),
  })

  const handleRecipe = async (id, recipeData) => {
    if (id) {
      EditRecipe({ variables: { id, ...recipeData } })
    } else {
      AddRecipe({ variables: { ...recipeData } })
    }
  }

  return (
    <Container>
      <ScrollView>
        <Formik
          initialValues={{
            title,
            time: '' + time,
            type: recipeType,
            ingredients: separateLines(ingredients),
            directions: separateLines(directions),
          }}
          validationSchema={Yup.object({
            title: Yup.string().required('Required').min(2, 'Too Short'),
            time: Yup.number().required('Required'),
            ingredients: Yup.string().required('Required'),
            directions: Yup.string().required('Required'),
          })}
          onSubmit={({ title, time, ingredients, directions }) => {
            handleRecipe(id, {
              email,
              title,
              time: Number(time),
              type: recipeType,
              ingredients: joinLines(ingredients),
              directions: joinLines(directions),
              image: recipeImage,
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
                onFocus={() => activateInput('title')}
                onBlur={deactivateInput}
                active={active === 'title'}
                returnKeyType="next"
              />
              {errors.title && touched.title && (
                <ErrorText>{errors.title}</ErrorText>
              )}
              <Pressable onPress={openModal}>
                <FormInput
                  placeholder="Dish Type"
                  editable={false}
                  value={recipeType}
                  active={modal}
                />
                <SelectionIcon onPress={openModal}>
                  <Icon source={down} size="40" />
                </SelectionIcon>
              </Pressable>
              {!recipeType && touched.type && <ErrorText>Required</ErrorText>}
              <FormInput
                placeholder="Ingredients"
                value={values.ingredients}
                multiline
                numberOfLines={3}
                onChangeText={handleChange('ingredients')}
                onFocus={() => activateInput('ingredients')}
                onBlur={deactivateInput}
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
                onFocus={() => activateInput('directions')}
                onBlur={deactivateInput}
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
                onFocus={() => activateInput('time')}
                onBlur={deactivateInput}
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
                onRequestClose={closeModal}
              >
                <ModalContainer>
                  <Exit onPress={closeModal}>
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
              ) : !recipeImage ? (
                <Button
                  onPress={() => uploadImage(setLoading, setRecipeImage)}
                  icon={gallery}
                >
                  Upload Image
                </Button>
              ) : (
                <RowContainer>
                  <RecipeImage added source={{ uri: recipeImage }} />
                  <EditRecipeImage
                    onPress={() => uploadImage(setLoading, setRecipeImage)}
                  >
                    <Icon source={edit} size="20" />
                  </EditRecipeImage>
                </RowContainer>
              )}
              <Button
                onPress={handleSubmit}
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Confirm Recipe
              </Button>
            </>
          )}
        </Formik>
      </ScrollView>
    </Container>
  )
}
