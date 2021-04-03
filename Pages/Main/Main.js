import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-native'
import Boxes from '../../Containers/Boxes'
import Recipes from '../../Containers/Recipes'
import { Container } from '../../Components/Containers'
import { Title } from "../../Components/Texts"
import { Icon, PressableIcon } from '../../Components/Images'
import { mainCategories } from '../../Data/Database'
import back from '../../Data/images/back.png'


const Main = () => {

   const [previous, setPrevious] = useState(false)
   const history = useHistory()
   const { pathname } = useLocation()
   const pathArray = pathname.split('')

   useEffect(() => {
      pathArray.length > 2 ? setPrevious(true) : setPrevious(false)
   }, [pathArray])

   return (
      <Container>
         {previous &&
            <PressableIcon
               back
               onPress={() => history.goBack()}
            >
               <Icon
                  source={back}
                  size='25'
               />
            </PressableIcon>
         }
            <Title> Hi </Title>
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