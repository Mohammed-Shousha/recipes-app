import { useState } from 'react'
import * as WebBrowser from 'expo-web-browser'

import { UserDetailContainer } from '@components/styles/Containers.styles'
import { UserImage } from '@components/styles/Images.styles'
import { Line, StyledText, Title } from '@components/styles/Texts.styles'

import { initData, useDataContext } from '@root/Context'

import user from '@assets/images/chef.png'

import { userDetails } from '@utils/database'
import { RATE_FORM_URL } from '@utils/constants'

import { PressableIcon, ConfirmModal } from '@components'

export const User = ({ navigation }) => {
  const {
    setIsSignedIn,
    userData: { name, image },
    setUserData,
  } = useDataContext()

  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const onPressAction = (action) => {
    if (action === 'logout') {
      openModal()
    } else if (action === 'profile') {
      navigation.navigate('Edit Profile')
    } else if (action === 'recipes') {
      navigation.navigate('My Recipes')
    } else if (action === 'rate') {
      WebBrowser.openBrowserAsync(RATE_FORM_URL)
    }
  }

  const logOut = () => {
    closeModal()
    setIsSignedIn(false)
    setUserData(initData)
  }

  return (
    <>
      <UserImage source={image ? { uri: image } : user} />
      <Title>{name}</Title>
      <Line />

      {userDetails.map((detail, i) => (
        <UserDetailContainer
          key={i}
          onPress={() => onPressAction(detail.action)}
        >
          <StyledText size="30">{detail.name}</StyledText>
          <PressableIcon
            onPress={() => onPressAction(detail.action)}
            icon={detail.img}
            size={detail.size}
          />
        </UserDetailContainer>
      ))}

      <ConfirmModal
        message="Are you sure you want to log out?"
        visible={modalOpen}
        onConfirm={logOut}
        onClose={closeModal}
      />
    </>
  )
}
