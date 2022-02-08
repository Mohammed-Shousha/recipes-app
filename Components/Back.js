import React from 'react'
import { Icon } from './Images'
import back from '../Data/images/back.png'
import backArrow from '../Data/images/backArrow.png'


const Back = ({ recipe }) => (
   <Icon
      source={recipe ? backArrow : back}
      size={recipe ? '35' : '25'}
   />
)

export default Back