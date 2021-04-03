import React from 'react'
import { Switch, Route } from 'react-router-native'
import Boxes from '../../Containers/Boxes'
import Recipes from '../../Containers/Recipes'
import { caloriesCategories } from '../../Data/Database'

const ByCalories = () => (
   <Switch>
      <Route path='/search/Calories' exact>
         <Boxes
            array={caloriesCategories}
            calories={true}
            styledText={true}
         />
      </Route>
      <Route path='*'>
         <Recipes />
      </Route>
   </Switch>

)

export default ByCalories