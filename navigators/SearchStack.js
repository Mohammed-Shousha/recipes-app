import { createStackNavigator } from '@react-navigation/stack'
import {
  Recipes,
  Recipe,
  Search,
  IngredientsSearch,
  TimeSearch,
  DietSearch,
  CaloriesSearch,
} from '@screens'
import { withContainer } from '@hocs'

import { stackScreenOptions, recipeScreenOptions } from '@utils/database'

const SearchStack = createStackNavigator()

export const SearchStackScreen = () => (
  <SearchStack.Navigator screenOptions={stackScreenOptions}>
    <SearchStack.Screen name="Search" component={withContainer(Search)} />
    <SearchStack.Screen
      name="Ingredients"
      component={withContainer(IngredientsSearch)}
    />
    <SearchStack.Screen name="Recipes" component={withContainer(Recipes)} />
    <SearchStack.Screen name="Time" component={withContainer(TimeSearch)} />
    <SearchStack.Screen name="Diet" component={withContainer(DietSearch)} />
    <SearchStack.Screen
      name="Calories"
      component={withContainer(CaloriesSearch)}
    />
    <SearchStack.Screen
      name="Recipe"
      component={withContainer(Recipe)}
      options={recipeScreenOptions}
    />
  </SearchStack.Navigator>
)
