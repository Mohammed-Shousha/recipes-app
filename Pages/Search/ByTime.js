import React from 'react'
import { Container } from '../../Components/Containers'
import Boxes from '../../Containers/Boxes'
import { timeCategories } from '../../Data/Database'

const ByTime = () => (
   <Container>
      <Boxes
         array={timeCategories}
         text={false}
         time={true}
      />
   </Container>
)

export default ByTime