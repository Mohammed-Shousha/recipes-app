import styled from 'styled-components/native'

export const StyledButton = styled.Pressable`
   background-color: ${props => props.rev ? '#eff7e1' : '#4e8d7c'};
   border-radius: 5px;
   justify-content: center;
   align-self: center;
   padding: 5px 7px ;
   margin: 5px 0;
   width: ${props => props.width || 'auto'}
`
export const ButtonText = styled.Text`
   font-size: ${props => props.size || '18px'};
   color: ${props => props.rev ? '#4e8d7c' : '#eff7e1'};
   font-family:sans-serif-light;
   align-self: center;
`

export const FormButton = styled(StyledButton)`
   padding: 7px 0;
   margin: 7px 0;
`

export const AddButton = styled.Pressable `
   border-radius: 25px;
   width: 50px;
   height: 50px;
   justify-content: center;
   align-self: center;
   position: absolute;
   right: 30px;
   bottom: 20px;
   background-color: #96fbc4;
`