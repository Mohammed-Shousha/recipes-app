import React from 'react'
import Boxes from '../../Containers/Boxes'
import { Container } from '../../Components/Containers'
import { mainCategories } from '../../Data/Database'


const Main = () => (
   <Container>
      <Boxes array={mainCategories} />
   </Container>
)

export default Main