import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useHistory, Switch, Route } from 'react-router-native'
import { API_KEY } from '@env'
import ByIngredients from './ByIngredients'
import ByTime from './ByTime'
import ByDiet from './ByDiet'
import ByCalories from './ByCalories'
import Boxes from '../../Containers/Boxes'
import Recipes from '../../Containers/Recipes'
import Back from '../../Components/Back'
import { Container, RowContainer } from '../../Components/Containers'
import { Input } from '../../Components/Inputs'
import { Icon, PressableIcon } from '../../Components/Images'
import { Title } from '../../Components/Texts'
import { RecipesContext } from '../../Data/Context'
import { searchCategories } from '../../Data/Database'
import searchImg from '../../Data/images/search.png'


const Search = () => {

   const [searchValue, setSearchValue] = useState('')
   const [previous, setPrevious] = useState(false)

   const { pathname } = useLocation()
   const history = useHistory()
   const pathArray = pathname.split('/')
   
   const { setRecipes } = useContext(RecipesContext)

   const searchRecipes = async () => {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchValue}&number=20`)
      const { results } = await response.json()
      if (!results.length) {
         setRecipes([null])
      }else{
         setRecipes(results)
      }
      history.push('/search/Results')
      setSearchValue('')
   }

   useEffect(() => {
      pathArray.length > 2 ? setPrevious(true) : setPrevious(false)
   }, [pathArray])

   return (
      <Container>
         {previous &&
            <Back />
         }
         <Title> What to eat ?</Title>
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
         <Switch>
            <Route path='/search' exact>
               <Boxes
                  array={searchCategories}
               />
            </Route>
            <Route path='/search/Ingredients'>
               <ByIngredients />
            </Route>
            <Route path='/search/Time'>
               <ByTime />
            </Route>
            <Route path='/search/Diet'>
               <ByDiet />
            </Route>
            <Route path='/search/Calories'>
               <ByCalories />
            </Route>
            <Route path='/search/Results'>
               <Recipes />
            </Route>
         </Switch>
      </Container>

   )
}

export default Search