import { createStackNavigator } from '@react-navigation/stack'
import { withContainer } from '@hocs'

import {
  UserRecipe,
  User,
  UserRecipes,
  EditProfile,
  ChangePassword,
  RecipeForm,
  Profile,
  SignIn,
  Register,
} from '@screens'

import { useDataState } from '@context'

import { stackScreenOptions, recipeScreenOptions } from '@utils/database'

const UserStack = createStackNavigator()

export const UserStackScreen = () => {
  const { isSignedIn } = useDataState()

  return (
    <UserStack.Navigator screenOptions={stackScreenOptions}>
      {isSignedIn ? (
        <>
          <UserStack.Screen name="User" component={withContainer(User)} />
          <UserStack.Screen
            name="Edit Profile"
            component={withContainer(EditProfile)}
          />
          <UserStack.Screen
            name="Change Password"
            component={withContainer(ChangePassword)}
          />
          <UserStack.Screen
            name="Add Recipe"
            component={withContainer(RecipeForm)}
          />
          <UserStack.Screen
            name="Edit Recipe"
            component={withContainer(RecipeForm)}
          />
          <UserStack.Screen
            name="My Recipes"
            component={withContainer(UserRecipes)}
          />
          <UserStack.Screen
            name="User Recipe"
            component={withContainer(UserRecipe)}
            options={recipeScreenOptions}
          />
        </>
      ) : (
        <>
          <UserStack.Screen name="Profile" component={withContainer(Profile)} />
          <UserStack.Screen name="Sign In" component={withContainer(SignIn)} />
          <UserStack.Screen
            name="Register"
            component={withContainer(Register)}
          />
        </>
      )}
    </UserStack.Navigator>
  )
}
