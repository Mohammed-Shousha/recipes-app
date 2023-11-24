import { useContext, useState } from 'react'
import { Modal } from 'react-native'
import * as WebBrowser from 'expo-web-browser'

import {
  Container,
  RowContainer,
  ConfirmContainer,
} from '@components/styles/Containers.styles.'
import {
  Icon,
  PressableIcon,
  UserImage,
} from '@components/styles/Images.styles'
import { Line, Text, Title } from '@components/styles/Texts.styles'

import { DataContext, initData } from '@root/Context'

import user from '@assets/images/chef.png'

import { userDetails } from '@utils/database'
import { RATE_FORM_URL } from '@utils/constants'

import { Button } from '@components'

export const User = ({ navigation }) => {
  const {
    setIsSignedIn,
    userData: { name, image },
    setUserData,
  } = useContext(DataContext)

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
    <Container>
      <RowContainer width="120px" noPadding center>
        <UserImage source={image ? { uri: image } : user} />
      </RowContainer>
      <Title>{name}</Title>
      <Line />

      {userDetails.map((detail, i) => (
        <RowContainer
          key={i}
          between
          user
          onPress={() => onPressAction(detail.action)}
        >
          <Text size="30">{detail.name}</Text>
          <PressableIcon onPress={() => onPressAction(detail.action)}>
            <Icon source={detail.img} size={detail.size} />
          </PressableIcon>
        </RowContainer>
      ))}

      <Modal
        animationType="fade"
        visible={modalOpen}
        transparent
        onRequestClose={closeModal}
      >
        <ConfirmContainer>
          <Text>Are you sure you want to log out?</Text>
          <RowContainer>
            <Button onPress={logOut} style={{ width: '45%', fontSize: '20px' }}>
              Confirm
            </Button>
            <Button
              style={{ width: '45%', fontSize: '20px' }}
              onPress={closeModal}
              secondary
            >
              Cancel
            </Button>
          </RowContainer>
        </ConfirmContainer>
      </Modal>
    </Container>
  )
}
