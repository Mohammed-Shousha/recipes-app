import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-native'
import { Icon } from '../Components/Images'
import { RowContainer } from '../Components/Containers'
import { NavRoutes } from '../Data/Database'
import { Pressable } from 'react-native'
import { Text } from '../Components/Texts'
import { gql, useQuery } from '@apollo/client'


const Nav = () => {

   const { pathname } = useLocation()
   const history = useHistory()
   const path = pathname.split('/')[1]
   //pathname = '/search' => ['', 'search']
   // const [name, setName] = useState('')

   // const HI = gql`
   //    query{
   //       hi
   //    }
   // `
   // const { data } = useQuery(HI, {
   //    onCompleted({hi}){
   //       setName(hi)
   //    }
   // })

   // const getData = async () => {
   //    const response = await fetch('http://localhost:5000/')
   //    const data = await response.json()
   //    console.log(data)
   // }

   return (
      <RowContainer Nav>
         {/* <Pressable onPress = {() =>console.log(data.hi)}>
            <Text>hi</Text>
         </Pressable> */}
         {NavRoutes.map(route => (
            <Link
               to={`/${route.name}`}
               underlayColor="#eff7e1"
               key={route.name}
            >
               <Icon
                  source={path === route.name ? route.image[0] : route.image[1]}
                  // if route is active use the black image
                  size={route.size}
               />
            </Link>
         ))}
      </RowContainer>
   )
}

export default Nav