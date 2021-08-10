import React, { useContext, useState } from 'react'
import { ScrollView } from 'react-native'
import { RecipeDetailsContainer, RecipeDetail, RecipeInfo, RowContainer, Container } from '../../Components/Containers'
import { RecipeImage, Icon } from '../../Components/Images'
import { RecipeTitle, Text } from '../../Components/Texts'
import { DataContext } from '../../Data/Context'
import recipeTypeImg from '../../Data/images/recipeType.png'
import recipeTime from '../../Data/images/recipeTime.png'


const UserRecipePage = ({ route }) => {

   const { userData } = useContext(DataContext)
   const { recipes } = userData
   const { id } = route.params
   const recipe = recipes[id]

   const [activeDetail, setActiveDetail] = useState(0)
   

   const recipeInfo = [
      {
         name: recipe.type,
         color: '#ccf2f4',
         image: recipeTypeImg,
         size: 17
      },
      {
         name: recipe.time + ' m',
         color: '#e8e9a1',
         image: recipeTime,
         size: 18
      },
   ]

   const recipeDetails = [
      {
         name: 'Ingredients',
         data: recipe.ingredients
      },
      {
         name: 'Directions',
         data: recipe.directions
      },
   ]

   return (
      <Container>
         <RecipeImage
            source={{ uri: recipe.image ? recipe.image : 'https://source.unsplash.com/Mz__0nr1AM8' }}
         />
         <ScrollView>
            <RowContainer>
               <RecipeTitle>{recipe.title}</RecipeTitle>
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
                     <Text color='#214151'>{detail.name}</Text>
                  </RecipeDetail>
               )}
            </RowContainer>
            {activeDetail === 0 ?
               <RecipeDetailsContainer>
                  <Text color='#393e46'>
                     {recipe.ingredients}
                  </Text>
               </RecipeDetailsContainer>
               :
               <RecipeDetailsContainer>
                  <Text>
                     {recipe.directions}
                  </Text>
               </RecipeDetailsContainer>
            }
         </ScrollView>
      </Container>
   )
}

export default UserRecipePage