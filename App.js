import { StatusBar, I18nManager } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import { TabNavigator } from '@navigators/TabNavigator'
import { withContainer } from '@hocs'
import { useNetworkStatus } from '@hooks'
import { DataProvider } from '@context'

import { ErrorDisplay } from '@components'
import noConnection from '@assets/images/noConnection.png'

// import { BACKEND_URL } from '@utils/constants'

I18nManager.forceRTL(false)
I18nManager.allowRTL(false)

const client = new ApolloClient({
  // uri: BACKEND_URL,
  uri: 'http://192.168.1.18:7000/graphql',
  cache: new InMemoryCache(),
})

const App = () => {
  const connected = useNetworkStatus()

  if (!connected) {
    return withContainer(ErrorDisplay)({
      message:
        'You are not connected to the internet, check your connection and try again.',
      icon: noConnection,
    })
  }

  return (
    <ApolloProvider client={client}>
      <DataProvider>
        <NavigationContainer>
          <TabNavigator />
          <StatusBar hidden />
        </NavigationContainer>
      </DataProvider>
    </ApolloProvider>
  )
}
export default App
