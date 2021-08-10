import React from 'react'
import { Container } from '../../Components/Containers'
import Boxes from '../../Containers/Boxes'
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