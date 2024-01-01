import styled from 'styled-components/native'

import fonts from './fonts.styles'

const { light } = fonts.family
const { medium } = fonts.size

export const StyledTextInput = styled.TextInput`
  font-size: ${medium};
  color: #222831;
  font-family: ${light};
`

export const StyledFormInput = styled(StyledTextInput).attrs(() => ({
  placeholderTextColor: '#666',
}))`
  margin: 10px 5px;
  padding: 7px 3px;
  border-bottom-width: 1px;
  border-color: ${(props) => (props.active ? '#4e8d7c' : '#b7b7a4')};
`
