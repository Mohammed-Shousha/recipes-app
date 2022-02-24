import React from 'react'
import { Icon } from './Images'
import back from '../Data/images/back.png'
import backArrow from '../Data/images/backArrow.png'


const Back = ({ recipe }) => (
   <Icon
      source={recipe ? backArrow : back} // if in recipe page backarrow with background
      size={recipe ? '35' : '25'}
   />
)

export default Back