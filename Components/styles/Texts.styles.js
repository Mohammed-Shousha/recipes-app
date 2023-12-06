import styled from 'styled-components/native'

import fonts from './fonts.styles'

const {
  family: { light, thin },
  size: { extraSmall, regular, medium, large },
  color: { text, title, error },
  weight: { bold, normal },
} = fonts

export const StyledText = styled.Text`
  font-size: ${(props) => (props.size ? `${props.size}px` : regular)};
  font-family: ${light};
  color: ${(props) => props.color || text};
  text-align: ${(props) => (props.center ? 'center' : 'auto')};
  font-weight: ${(props) => (props.bold ? bold : normal)};
`

export const Title = styled.Text`
  color: ${title};
  font-size: ${large};
  font-family: ${thin};
  font-weight: ${bold};
  padding: 15px;
  text-align: center;
`

export const RecipeTitle = styled.Text`
  color: ${title};
  width: 85%;
  font-size: ${medium};
  font-family: ${light};
`

export const ErrorText = styled.Text`
  font-family: ${light};
  color: ${error};
  text-align: center;
  font-size: ${extraSmall};
  margin: 3px 0;
`

export const ProfileText = styled.Text`
  margin: 10px 7px 0px;
  font-family: ${light};
`

export const Line = styled.View`
  border-bottom-width: 1px;
  border-color: ${text};
  margin: 5px 0;
  width: 95%;
  align-self: center;
`
