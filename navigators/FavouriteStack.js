import { createStackNavigator } from '@react-navigation/stack'
import { Favourite, Recipe, SignIn, Register, Profile } from '@screens'
import { withContainer } from '@hocs'

import { useDataState } from '@context'

import { stackScreenOptions, recipeScreenOptions } from '@utils/database'

const FavouriteStack = createStackNavigator()

export const FavouriteStackScreen = () => {
  const { isSignedIn } = useDataState()
  return (
    <FavouriteStack.Navigator screenOptions={stackScreenOptions}>
      {isSignedIn ? (
        <>
          <FavouriteStack.Screen
            name="Favourite Recipes"
            component={withContainer(Favourite)}
          />
          <FavouriteStack.Screen
            name="Recipe"
            component={withContainer(Recipe)}
            options={recipeScreenOptions}
          />
        </>
      ) : (
        <>
          <FavouriteStack.Screen
            name="Profile"
            component={withContainer(Profile)}
          />
          <FavouriteStack.Screen
            name="Sign In"
            component={withContainer(SignIn)}
          />
          <FavouriteStack.Screen
            name="Register"
            component={withContainer(Register)}
          />
        </>
      )}
    </FavouriteStack.Navigator>
  )
}
