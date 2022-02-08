import React from 'react'
import Boxes from '../../Containers/Boxes'
import { Container } from '../../Components/Containers'
import { dietCategories } from '../../Data/Database'

const ByDiet = () => (
   <Container>
      <Boxes
         array={dietCategories}
         diet={true}
      />
   </Container>
)

export default ByDiet