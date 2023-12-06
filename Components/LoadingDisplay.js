import { ActivityIndicator } from 'react-native'

import { CenterContainer } from '@components/styles/Containers.styles'

export const LoadingDisplay = () => (
  <CenterContainer>
    <ActivityIndicator color="green" size="large" />
  </CenterContainer>
)
