import React, { useContext, useEffect, useState } from 'react'
import Ingredients from '../../Containers/Ingredients'
import Recipes from '../../Containers/Recipes'
import { CenterContainer, RowContainer } from '../../Components/Containers'
import { StyledButton, ButtonText } from '../../Components/Buttons'
import { Input } from '../../Components/Inputs'
import { Title } from '../../Components/Texts'
import { RecipesContext } from '../../Data/Context'


const ByIngredients = () => {

   const { recipes, setRecipes } = useContext(RecipesContext)
   
   const [ingredients, setIngredients] = useState([])
   const [ingredient, setIngredient] = useState('')


   const addIngredient = () => {
      setRecipes([])
      setIngredients([...ingredients, ingredient])
      setIngredient('')
   }

   useEffect(() => {
      setRecipes([])
   },[setRecipes])


   return (
      <>
         <RowContainer>
            <Input
               placeholder="Ingredient"
               onChangeText={text => setIngredient(text)}
               value={ingredient}
            />
            <StyledButton onPress={addIngredient}>
               <ButtonText> Add </ButtonText>
            </StyledButton>
         </RowContainer>

         {ingredients.length ?
            <Ingredients
               ingredients={ingredients}
               setIngredients={setIngredients}
            />
            : recipes.length ?
               <Recipes />
               :
               <CenterContainer>
                  <Title > Add Ingredients </Title>
               </CenterContainer>
         }
      </>
   )
}

export default ByIngredients