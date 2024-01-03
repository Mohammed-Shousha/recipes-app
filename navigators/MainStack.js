import { createStackNavigator } from '@react-navigation/stack'
import { Main, Recipes, Recipe, SignIn, Register } from '@screens'
import { withContainer } from '@hocs'

import { stackScreenOptions, recipeScreenOptions } from '@utils/database'

const MainStack = createStackNavigator()

export const MainStackScreen = () => (
  <MainStack.Navigator screenOptions={stackScreenOptions}>
    <MainStack.Screen name="Main" component={withContainer(Main)} />
    <MainStack.Screen
      name="Main-Recipes"
      component={withContainer(Recipes)}
      options={{
        title: 'Recipes',
      }}
    />
    <MainStack.Screen
      name="Recipe"
      component={withContainer(Recipe)}
      options={recipeScreenOptions}
    />
    <MainStack.Screen name="Sign In" component={withContainer(SignIn)} />
    <MainStack.Screen name="Register" component={withContainer(Register)} />
  </MainStack.Navigator>
)
