import { Modal } from 'react-native'

import {
  ConfirmContainer,
  RowContainer,
} from '@components/styles/Containers.styles'
import { StyledText } from '@components/styles/Texts.styles'

import { Button } from '@components'

export const ConfirmModal = ({ message, visible, onClose, onConfirm }) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent
      onRequestClose={onClose}
    >
      <ConfirmContainer>
        <StyledText>{message}</StyledText>
        <RowContainer>
          <Button
            onPress={onConfirm}
            style={{ width: '45%', fontSize: '20px' }}
          >
            Confirm
          </Button>
          <Button
            style={{ width: '45%', fontSize: '20px' }}
            onPress={onClose}
            secondary
          >
            Cancel
          </Button>
        </RowContainer>
      </ConfirmContainer>
    </Modal>
  )
}
