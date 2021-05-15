import React, { useState, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-native'
import Boxes from '../../Containers/Boxes'
import Recipes from '../../Containers/Recipes'
import { Container } from '../../Components/Containers'
import { Title } from "../../Components/Texts"
import { mainCategories } from '../../Data/Database'
import Back from '../../Components/Back'


const Main = () => {

   const [previous, setPrevious] = useState(false)
   const { pathname } = useLocation()
   const pathArray = pathname.split('')

   useEffect(() => {
      pathArray.length > 2 ? setPrevious(true) : setPrevious(false)
   }, [pathArray])

   return (
      <Container>
         {previous &&
            <Back />
         }
         <Title>Hi</Title>
         <Switch>
            <Route path='/' exact>
               <Boxes
                  array={mainCategories}
               />
            </Route>
            <Route path={['/Breakfast', '/Dinner', '/Salads', '/Drinks', '/Desserts', '/Snacks']}>
               <Recipes />
            </Route>
         </Switch>
      </Container>
   )
}

export default Main