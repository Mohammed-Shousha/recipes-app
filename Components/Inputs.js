import styled from 'styled-components/native'

export const Input = styled.TextInput`
   font-size: 23px;
   color: #393e46;
   font-family: sans-serif-light;
`

export const FormInput = styled.TextInput`
   font-size: 25px;
   color: #222831;
   font-family: sans-serif-light;
   margin: 10px 5px;
   padding: 7px 3px;
   border-color: ${props => props.active ? '#4e8d7c' : '#b7b7a4'};
   border-bottom-width: ${props => props.active ? '1.5px' : '1px'};
`