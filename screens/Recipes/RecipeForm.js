import { useState } from 'react'

import { ScrollView, ActivityIndicator } from 'react-native'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'

import {
  EditRecipeImage,
  Icon,
  RecipeImage,
} from '@components/styles/Images.styles'
import { RowContainer } from '@components/styles/Containers.styles'
import { ErrorText } from '@components/styles/Texts.styles'
import { FormInput } from '@components/styles/Inputs.styles'
import { DropDown } from '@components/styles/DropDown.styles'

import { useDataContext } from '@root/Context'

import gallery from '@assets/icons/gallery.png'
import edit from '@assets/icons/edit.png'

import { joinLines, separateLines } from '@utils/helpers'
import { dishTypes } from '@utils/database'
import {
  HANDLE_EDITING_RECIPE,
  HANDLE_ADDING_RECIPE,
} from '@utils/graphql/mutations'

import useImageUploader from '@utils/hooks/useImageUploader'

import { Button } from '@components'

export const RecipeForm = ({ route, navigation }) => {
  const {
    userData: { email, recipes },
    setUserData,
  } = useDataContext()

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

  const [recipeType, setRecipeType] = useState(type)
  const [recipeTypes, setRecipeTypes] = useState(
    dishTypes.map((type) => ({ label: type, value: type }))
  )

  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [activeInput, setActiveInput] = useState(null)

  const { loading, image: recipeImage, uploadImage } = useImageUploader(image)

  const activateInput = (input) => setActiveInput(input)

  const deactivateInput = () => setActiveInput(null)

  const handleCompleted = (mutationResponse) => {
    if (mutationResponse.result === 1) {
      setUserData((userData) => ({
        ...userData,
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
              active={activeInput === 'title'}
              returnKeyType="next"
            />
            {errors.title && touched.title && (
              <ErrorText>{errors.title}</ErrorText>
            )}

            <DropDown
              placeholder="Dish Type"
              open={dropDownOpen}
              value={recipeType}
              items={recipeTypes}
              setOpen={setDropDownOpen}
              setValue={setRecipeType}
              setItems={setRecipeTypes}
              listMode="SCROLLVIEW"
            />

            {!recipeType && touched.type && <ErrorText>Required</ErrorText>}
            <FormInput
              placeholder="Ingredients"
              value={values.ingredients}
              multiline
              numberOfLines={3}
              onChangeText={handleChange('ingredients')}
              onFocus={() => activateInput('ingredients')}
              onBlur={deactivateInput}
              active={activeInput === 'ingredients'}
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
              active={activeInput === 'directions'}
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
              active={activeInput === 'time'}
              returnKeyType="done"
            />
            {errors.time && touched.time && (
              <ErrorText>{errors.time}</ErrorText>
            )}

            {loading ? (
              <ActivityIndicator color="green" size="large" />
            ) : !recipeImage ? (
              <Button onPress={uploadImage} icon={gallery}>
                Upload Image
              </Button>
            ) : (
              <RowContainer>
                <RecipeImage added source={{ uri: recipeImage }} />
                <EditRecipeImage onPress={uploadImage}>
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
  )
}
