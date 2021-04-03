import styled from 'styled-components/native'

export const Icon = styled.Image `
   width: ${props => props.size}px;
   height:  ${props => props.size}px;
   align-self: center;
`
export const PressableIcon = styled.Pressable `
   position: ${props => props.back ? 'absolute': 'relative'};
   top: ${props => props.back ? '20px': '0'};
   left: ${props => props.back ? '15px': '0'};
   justify-content: center;
   z-index: 50;
`

export const RecipeMiniImage = styled.Image `
   width: 100px;
   height: 100px;
   align-self: center;
   border-radius: 5px;
   margin: 0 7px;
`

export const RecipeImage = styled.Image `
   width: 98%;
   height: 40%;
   align-self: center;
   border-radius: 5px;
   margin: 1%;
`

export const UserImage = styled.Image `
   width: 100px;
   height: 100px;
   border-radius: 50px;
   align-self: center;
   margin-top: 25px;
`

export const EditImage = styled.Pressable `
   position: absolute;
   bottom: 5px;
   right: 15px;
   justify-content: center;
   z-index: 500;
   background-color: white;
   width: 20px;
   height: 20px;
   border-radius: 10px;
`