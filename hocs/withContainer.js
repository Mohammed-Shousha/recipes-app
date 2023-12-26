import { Container } from '@components/styles/Containers.styles'

export const withContainer = (Component) => (props) => (
  <Container>
    <Component {...props} />
  </Container>
)
