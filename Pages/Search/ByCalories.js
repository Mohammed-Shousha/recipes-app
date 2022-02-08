import React from 'react'
import Boxes from '../../Containers/Boxes'
import { Container } from '../../Components/Containers'
import { caloriesCategories } from '../../Data/Database'

const ByCalories = () => (
   <Container>
      <Boxes
         array={caloriesCategories}
         calories={true}
         styledText={true}
      />
   </Container>
)

export default ByCalories