import styled from 'styled-components/native'

export const Icon = styled.Image`
   width: ${props => props.size}px;
   height: ${props => props.size}px;
   align-self: center;
`
export const PressableIcon = styled.Pressable`
   position: relative;
   top: 0;
   left: 0;
   justify-content: center;
   z-index: 50;
`

export const Exit = styled.Pressable`
   position: absolute;
   top: 10px;
   right: 10px;
   justify-content: center;
   z-index: 50;
`

export const SelectionIcon = styled.Pressable`
   position: absolute;
   bottom: 9px;
   right: 7px;
   justify-content: center;
`

export const RecipeMiniImage = styled.Image`
   width: 100px;
   height: 100px;
   align-self: center;
   border-radius: 5px;
   margin: 0 7px;
`

export const RecipeImage = styled.Image`
   width: 98%;
   height:${props => props.added ? '250px' : '40%'};
   align-self: center;
   border-radius: 5px;
   margin: 1%;
`

export const UserImage = styled.Image`
   width: 100px;
   height: 100px;
   border-radius: 50px;
   align-self: center;
   margin-top: 25px;
`

export const LoadingContainer = styled.View`
   width: 100px;
   height: 100px;
   margin-top: 25px;
   align-self: center;
   justify-content: center;
`

export const EditUserImage = styled.Pressable`
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

export const EditRecipeImage = styled.Pressable`
   position: absolute;
   bottom: 15px;
   left: 10px;
   justify-content: center;
   z-index: 100;
   background-color: white;
   width: 40px;
   height: 40px;
   border-radius: 20px;
`