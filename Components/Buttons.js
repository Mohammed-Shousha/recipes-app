import styled from 'styled-components/native'

export const StyledButton = styled.Pressable`
   background-color: ${props => props.rev ? 'white' : '#4e8d7c'};
   border-radius: 5px;
   justify-content: center;
   align-self: center;
   padding: 5px 7px ;
   margin: 5px 0;
   width: ${props => props.width || 'auto'}
`
export const ButtonText = styled.Text`
   font-size: ${props => props.size || '18px'};
   color: ${props => props.rev ? '#4e8d7c': 'white'};
   font-family:sans-serif-light;
   align-self: center;
`

export const FormButton = styled(StyledButton)`
   padding: 7px 0;
   margin: 7px 0;
`