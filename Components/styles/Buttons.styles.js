import styled from 'styled-components/native'
import colors from './colors.styles'
import fonts from './fonts.styles'

const { primary, secondary, accent } = colors
const { light } = fonts.family
const { small, medium, large } = fonts.size

export const StyledButton = styled.Pressable`
  background-color: ${(props) => (props.rev ? secondary : primary)};
  border-radius: 5px;
  justify-content: center;
  gap: 10px;
  flex-direction: row;
  align-self: center;
  padding: 7px 0px;
  margin: 7px 0;
  width: ${(props) => props.width || 'auto'};
`

export const ButtonText = styled.Text`
  font-size: ${(props) => props.size || medium};
  color: ${(props) => (props.rev ? primary : secondary)};
  font-family: ${light};
`

export const AddButton = styled.Pressable`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${accent};
  justify-content: center;
  align-self: center;
  position: absolute;
  right: 30px;
  bottom: 20px;
`
