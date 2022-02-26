import React, { useContext, useState } from 'react'
import { Modal, ScrollView } from 'react-native'
import { gql, useMutation } from '@apollo/client'
import { RecipeDetailsContainer, RecipeDetail, RecipeInfo, RowContainer, Container, ConfirmContainer } from '../../Components/Containers'
import { RecipeImage, Icon, PressableIcon } from '../../Components/Images'
import { RecipeTitle, Text } from '../../Components/Texts'
import { StyledButton, ButtonText } from '../../Components/Buttons'
import { DataContext } from '../../Data/Context'
import { splitLines } from '../../Data/Functions'
import recipeTypeImg from '../../Data/images/recipeType.png'
import recipeTime from '../../Data/images/recipeTime.png'
import bin from '../../Data/images/bin.png'
import edit from '../../Data/images/edit_2.png'


const UserRecipePage = ({ route, navigation }) => {

   const { userData, setUserData, setLoading } = useContext(DataContext)
   const { recipes, email } = userData
   const { id } = route.params

   let recipe = recipes.find(recipe => recipe.id === id)

   const [activeDetail, setActiveDetail] = useState(0)
   const [confirm, setConfirm] = useState(false)

   const ingredients = splitLines(recipe.ingredients)
   const directions = splitLines(recipe.directions)

   const recipeInfo = [
      {
         name: recipe.type,
         color: '#ccf2f4',
         image: recipeTypeImg,
         size: 21
      },
      {
         name: recipe.time + ' m',
         color: '#e8e9a1',
         image: recipeTime,
         size: 20
      }
   ]

   const recipeDetails = ['Ingredients', 'Directions']

   const HANDLE_DELETING_RECIPE = gql`
      mutation DeleteRecipe($email: String!, $id: ID!){
         DeleteRecipe(email: $email, id: $id){
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

   const [DeleteRecipe] = useMutation(HANDLE_DELETING_RECIPE, {
      onCompleted({ DeleteRecipe }) {
         if (DeleteRecipe.result === 1) {
            setUserData({
               ...userData,
               recipes: DeleteRecipe.data
            })
         }
         setLoading(false)
      }
   })

   const deleteRecipe = () => {
      setConfirm(false)
      setLoading(true)
      navigation.goBack()
      setTimeout(() => {
         DeleteRecipe({
            variables: {
               email,
               id
            }
         })
      }, 500)
   }

   return (
      <Container>
         <Modal
            animationType='fade'
            visible={confirm}
            transparent={true}
            onRequestClose={() => setConfirm(false)}
         >
            <ConfirmContainer>
               <Text>Are you sure you want to delete this recipe?</Text>
               <RowContainer>
                  <StyledButton
                     width='45%'
                     onPress={deleteRecipe}
                  >
                     <ButtonText size='20px'>
                        Confirm
                     </ButtonText>
                  </StyledButton>
                  <StyledButton
                     width='45%'
                     onPress={() => setConfirm(false)}
                     rev
                  >
                     <ButtonText
                        rev
                        size='20px'
                     >
                        Cancel
                     </ButtonText>
                  </StyledButton>
               </RowContainer>
            </ConfirmContainer>
         </Modal>
         <RecipeImage
            source={{ uri: recipe.image ? recipe.image : 'https://source.unsplash.com/Mz__0nr1AM8' }}
         />
         <ScrollView>
            <RowContainer width='95%'>
               <RecipeTitle>{recipe.title}</RecipeTitle>
               <RowContainer width='20%'>
                  <PressableIcon onPress={() => navigation.navigate('Edit Recipe', { id: recipe.id })}>
                     <Icon
                        source={edit}
                        size='30'
                     />
                  </PressableIcon>
                  <PressableIcon onPress={() => setConfirm(true)}>
                     <Icon
                        source={bin}
                        size='30'
                     />
                  </PressableIcon>
               </RowContainer>
            </RowContainer>
            <RowContainer>
               {recipeInfo.map((r, i) => (
                  <RecipeInfo
                     user
                     key={i}
                     color={r.color}
                  >
                     <Icon
                        source={r.image}
                        size={r.size}
                     />
                     <Text
                        size={r.size}
                     >
                        {r.name}
                     </Text>
                  </RecipeInfo>
               ))}
            </RowContainer>
            <RowContainer noPadding>
               {recipeDetails.map((detail, i) =>
                  <RecipeDetail
                     user
                     onPress={() => setActiveDetail(i)}
                     active={activeDetail === i}
                     key={i}
                  >
                     <Text color='#214151'>{detail}</Text>
                  </RecipeDetail>
               )}
            </RowContainer>
            {activeDetail === 0 ?
               <RecipeDetailsContainer>
                  {ingredients.map((ingredient, i) =>
                     <Text key={i} color='#393e46'>• {ingredient}</Text>
                  )}
               </RecipeDetailsContainer>
               :
               <RecipeDetailsContainer>
                  {directions.map((direction, i) =>
                     <Text key={i}>• {direction}</Text>
                  )}
               </RecipeDetailsContainer>
            }
         </ScrollView>
      </Container>
   )
}

export default UserRecipePage