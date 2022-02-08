import React, { useContext, useState } from 'react'
import { API_KEY } from '@env'
import Boxes from '../../Containers/Boxes'
import { Container, RowContainer } from '../../Components/Containers'
import { Input } from '../../Components/Inputs'
import { Icon, PressableIcon } from '../../Components/Images'
import { RecipesContext } from '../../Data/Context'
import { searchCategories, recipesNumber } from '../../Data/Database'
import searchImg from '../../Data/images/search.png'


const Search = ({ navigation }) => {

   const [searchValue, setSearchValue] = useState('')

   const { setRecipes } = useContext(RecipesContext)

   const searchRecipes = async () => {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchValue}&number=${recipesNumber}`)
      const { results } = await response.json()
      if (!results.length) {
         setRecipes([null])
      } else {
         setRecipes(results)
      }
      navigation.navigate('Recipes')
      setSearchValue('')
   }


   return (
      <Container>
         <RowContainer color='#eff7e1'>
            <Input
               placeholder='Search'
               value={searchValue}
               onChangeText={text => setSearchValue(text)}
            />
            <PressableIcon
               onPress={searchRecipes}
            >
               <Icon
                  source={searchImg}
                  size='30'
               />
            </PressableIcon>
         </RowContainer>
         <Boxes
            array={searchCategories}
         />
      </Container>
   )
}

export default Search