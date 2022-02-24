import styled from 'styled-components/native'

export const Text = styled.Text`
   font-size:${props => props.size ? `${props.size}px` : '22px'} ;
   font-family: sans-serif-light;
   color: ${props => props.color || '#222831'};
   text-align: ${props => props.center ? 'center' : 'auto'};
   align-self: ${props => props.center ? 'center' : 'auto'};
   font-weight: ${props => props.bold ? 'bold' : 'normal'}
`

export const Title = styled.Text`
   color: #214151;
   align-self: center;
   font-size: 30px;
   font-family: sans-serif-thin;
   font-weight: bold;
   padding: 15px;
   text-align: center;
`

export const RecipeTitle = styled.Text`
   color: #214151;
   width: 85%;
   font-size: 25px;
   font-family: sans-serif-light;
   text-align: left;
`

export const Line = styled.View`
   border-bottom-width:1px;
   border-color: ${props => props.color || '#222831'};
   margin: 10px 0 5px;
   width: 97%;
   align-self: center;
`

export const ErrorText = styled.Text`
   font-family: sans-serif-light;
   color: red;
   align-self: center;
   font-size: 15px;
   margin: 3px 0; 
`

export const ProfileText = styled(Text)`
   margin: 10px 7px 0px;
`