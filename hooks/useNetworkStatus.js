import { useEffect, useState } from 'react'
import { getNetworkStateAsync } from 'expo-network'

export const useNetworkStatus = () => {
  const [connected, setConnected] = useState(true)

  useEffect(() => {
    const getConnectionStatus = async () => {
      const result = await getNetworkStateAsync()

      if (!result.isInternetReachable) setConnected(false)
    }

    getConnectionStatus()
  }, [])

  return connected
}
