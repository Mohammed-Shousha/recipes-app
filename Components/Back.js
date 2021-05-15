import React from 'react'
import { useHistory } from 'react-router-native'
import { Icon, PressableIcon } from './Images'
import back from '../Data/images/back.png'
import backArrow from '../Data/images/backArrow.png'


const Back = ({ to, recipe }) => {

   const history = useHistory()

   return (
      <PressableIcon
         back
         onPress={to ? () => history.push(to) : () => history.goBack()}
      >
         <Icon
            source={recipe ? backArrow : back}
            size={recipe? '35': '25'}
         />
      </PressableIcon>
   )
}

export default Back