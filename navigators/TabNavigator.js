import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {
  MainStackScreen,
  SearchStackScreen,
  FavouriteStackScreen,
  UserStackScreen,
} from './index'

import { Icon } from '@components/styles/Images.styles'
import { navIcons, iconsSizes, tabOptions } from '@utils/database'

const Tab = createBottomTabNavigator()

const getTabBarIcon = (route, focused) => {
  const routeName = route.name.split('-')[0]
  const iconName = focused ? navIcons[routeName][0] : navIcons[routeName][1]
  const size = iconsSizes[routeName]

  return <Icon source={iconName} size={size} />
}

export const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Main-Tab"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => getTabBarIcon(route, focused),
      ...tabOptions,
    })}
  >
    <Tab.Screen name="Main-Tab" component={MainStackScreen} />
    <Tab.Screen name="Search-Tab" component={SearchStackScreen} />
    <Tab.Screen name="Favourite-Tab" component={FavouriteStackScreen} />
    <Tab.Screen name="User-Tab" component={UserStackScreen} />
  </Tab.Navigator>
)
