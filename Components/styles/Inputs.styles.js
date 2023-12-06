import styled from 'styled-components/native'

import fonts from './fonts.styles'

const { light } = fonts.family
const { medium } = fonts.size

export const Input = styled.TextInput`
  font-size: ${medium};
  color: #393e46;
  font-family: ${light};
`

export const FormInput = styled.TextInput.attrs((props) => ({
  placeholderTextColor: '#666',
}))`
  font-size: ${medium};
  color: #222831;
  font-family: ${light};
  margin: 10px 5px;
  padding: 7px 3px;
  border-color: ${(props) => (props.active ? '#4e8d7c' : '#b7b7a4')};
  border-bottom-width: ${(props) => (props.active ? '1.5px' : '1px')};
`
