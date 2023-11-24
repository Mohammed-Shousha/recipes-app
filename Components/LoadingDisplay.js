import { ActivityIndicator } from 'react-native'
import { Container } from '@components/styles/Containers.styles.'

export const LoadingDisplay = () => (
  <Container center>
    <ActivityIndicator color="green" size="large" />
  </Container>
)
