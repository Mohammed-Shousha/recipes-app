import { CenterContainer } from '@components/styles/Containers.styles'
import { Icon } from '@components/styles/Images.styles'
import { Title } from '@components/styles/Texts.styles'

export const ErrorDisplay = ({ message, icon }) => (
  <CenterContainer>
    <Icon source={icon} size="100" />
    <Title>{message}</Title>
  </CenterContainer>
)
