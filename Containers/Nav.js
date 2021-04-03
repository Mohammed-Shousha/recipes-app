import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-native'
import { Icon } from '../Components/Images'
import { RowContainer } from '../Components/Containers'
import { NavRoutes } from '../Data/Database'
import { Pressable } from 'react-native'
import { Text } from '../Components/Texts'
 

const Nav = () => {

   const { pathname } = useLocation()
   const history = useHistory()
   const path = pathname.split('/')[1]
   //pathname = '/search' => ['', 'search']

   return (
      <RowContainer Nav>
         {/* <Pressable onPress={() => console.log(history)}>
            <Text> Hi </Text>
         </Pressable> */}
         {NavRoutes.map(route => (
            <Link
               to={`/${route.name}`}
               underlayColor="#eff7e1"
               key={route.name}
            >
               <Icon
                  source={path === route.name ? route.image[0] : route.image[1]}
                  size={route.size}
               />
            </Link>
         ))}
      </RowContainer>
   )
}

export default Nav