import React from 'react'
import Recipes from '../../Containers/Recipes'
import { Container } from '../../Components/Containers'
import { Title } from '../../Components/Texts'

const Favourite = () => (
   <Container>
      <Title>Favourite Recipes</Title>
      <Recipes favourite={true} />
   </Container>
)

export default Favourite