import { useContext, useState } from 'react'
import { Modal, ScrollView } from 'react-native'
import { useMutation } from '@apollo/client'

import {
  RecipeDetailsContainer,
  RecipeDetail,
  RecipeInfo,
  RowContainer,
  Container,
  ConfirmContainer,
} from '@components/styles/Containers.styles.'
import {
  RecipeImage,
  Icon,
  PressableIcon,
} from '@components/styles/Images.styles'
import { RecipeTitle, Text } from '@components/styles/Texts.styles'

import { DataContext } from '@root/Context'

import recipeTypeImg from '@assets/icons/recipeType.png'
import recipeTime from '@assets/icons/recipeTime.png'
import bin from '@assets/icons/bin.png'
import edit from '@assets/icons/edit_2.png'

import { splitLines } from '@utils/helpers'
import { HANDLE_DELETING_RECIPE } from '@utils/graphql/mutations'
import { DEFAULT_RECIPE_IMAGE } from '@utils/constants'

import { Button } from '@components'

export const UserRecipe = ({ route, navigation }) => {
  const {
    userData: { recipes, email },
    setUserData,
    setLoading,
  } = useContext(DataContext)
  const { id } = route.params

  const recipe = recipes.find((recipe) => recipe.id === id)

  const [activeDetail, setActiveDetail] = useState(0)
  const [modal, setModal] = useState(false)

  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)

  const ingredients = splitLines(recipe.ingredients)
  const directions = splitLines(recipe.directions)

  const recipeInfo = [
    {
      name: recipe.type,
      color: '#ccf2f4',
      image: recipeTypeImg,
      size: 21,
    },
    {
      name: recipe.time + ' m',
      color: '#e8e9a1',
      image: recipeTime,
      size: 20,
    },
  ]

  const recipeDetails = ['Ingredients', 'Directions']

  const [DeleteRecipe] = useMutation(HANDLE_DELETING_RECIPE, {
    onCompleted({ DeleteRecipe }) {
      if (DeleteRecipe.result === 1) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          recipes: DeleteRecipe.data,
        }))
      }
      setLoading(false)
    },
  })

  const deleteRecipe = () => {
    closeModal()
    setLoading(true)
    navigation.goBack()
    setTimeout(() => {
      DeleteRecipe({
        variables: {
          email,
          id,
        },
      })
    }, 500)
  }

  return (
    <Container>
      <Modal
        animationType="fade"
        visible={modal}
        transparent
        onRequestClose={closeModal}
      >
        <ConfirmContainer>
          <Text>Are you sure you want to delete this recipe?</Text>
          <RowContainer>
            <Button
              onPress={deleteRecipe}
              style={{ width: '45%', fontSize: '20px' }}
            >
              Confirm
            </Button>
            <Button
              style={{ width: '45%', fontSize: '20px' }}
              onPress={closeModal}
              secondary
            >
              Cancel
            </Button>
          </RowContainer>
        </ConfirmContainer>
      </Modal>
      <RecipeImage
        source={{
          uri: recipe.image ?? DEFAULT_RECIPE_IMAGE,
        }}
      />
      <ScrollView>
        <RowContainer width="95%">
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <RowContainer width="20%">
            <PressableIcon
              onPress={() =>
                navigation.navigate('Edit Recipe', { id: recipe.id })
              }
            >
              <Icon source={edit} size="30" />
            </PressableIcon>
            <PressableIcon onPress={openModal}>
              <Icon source={bin} size="30" />
            </PressableIcon>
          </RowContainer>
        </RowContainer>
        <RowContainer>
          {recipeInfo.map((r, i) => (
            <RecipeInfo user key={i} color={r.color}>
              <Icon source={r.image} size={r.size} />
              <Text size={r.size}>{r.name}</Text>
            </RecipeInfo>
          ))}
        </RowContainer>
        <RowContainer noPadding>
          {recipeDetails.map((detail, i) => (
            <RecipeDetail
              user
              onPress={() => setActiveDetail(i)}
              active={activeDetail === i}
              key={i}
            >
              <Text color="#214151">{detail}</Text>
            </RecipeDetail>
          ))}
        </RowContainer>
        {activeDetail === 0 ? (
          <RecipeDetailsContainer>
            {ingredients.map((ingredient, i) => (
              <Text key={i} color="#393e46">
                • {ingredient}
              </Text>
            ))}
          </RecipeDetailsContainer>
        ) : (
          <RecipeDetailsContainer>
            {directions.map((direction, i) => (
              <Text key={i}>• {direction}</Text>
            ))}
          </RecipeDetailsContainer>
        )}
      </ScrollView>
    </Container>
  )
}
