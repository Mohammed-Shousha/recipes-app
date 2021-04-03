import React from 'react'
import { Switch, Route } from 'react-router-native'
import Boxes from '../../Containers/Boxes'
import Recipes from '../../Containers/Recipes'
import { dietCategories } from '../../Data/Database'

const ByDiet = () => (
   <Switch>
      <Route path='/search/Diet' exact>
         <Boxes
            array={dietCategories}
            diet={true}
         />
      </Route>
      <Route path='*'>
         <Recipes/>
      </Route>
   </Switch>

)

export default ByDiet