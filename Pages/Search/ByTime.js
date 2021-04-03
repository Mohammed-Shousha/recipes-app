import React from 'react'
import { Route, Switch } from 'react-router-native'
import Boxes from '../../Containers/Boxes'
import Recipes from '../../Containers/Recipes'
import { timeCategories } from '../../Data/Database'

const ByTime = () => (
   <Switch>
      <Route path='/search/Time' exact>
         <Boxes
            array={timeCategories}
            text={false}
            time={true}
         />
      </Route>
      <Route path='*'>
         <Recipes/>
      </Route>
   </Switch>

   )

export default ByTime