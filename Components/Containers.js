import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'

export const Container = styled(LinearGradient).attrs(props => ({
   colors: ['#96fbc4', '#eff7e1',],
   locations: [0.1, 0.3]
}))`
   flex: 1;
   align-items: stretch;
   justify-content: ${props => props.center ? 'center' : 'flex-start'};
   z-index: -1;
`

export const CenterContainer = styled.View `
   flex: 1;
   justify-content: center;
`

export const RowContainer = styled.Pressable`
   flex-direction: row;
   width: ${props => props.width || '100%'};
   justify-content: ${props => props.flexStart ? 'flex-start' : props.between ? 'space-between' : 'space-around'};
   align-items: center;
   align-self: center;
   padding: ${props => props.Nav ? '7px 0' : props.noPadding ? '0' : props.user? '15px 10px' : '5px 0'};
   background-color: ${props => props.Nav? '#eff7e1': 'transparent'};
`

export const Box = styled.Pressable`
   width: 45%;
   border-radius: 10px;
   background-color: ${props => props.color};
   height: 85%;
   align-items: center;
   justify-content:center;
`

export const BoxesContainer = styled.View`
   flex-direction: row;
   flex: 1;
   justify-content: space-around;
   align-content: center;
   align-items: center;
`

export const RecipeInfo = styled.View` 
   flex-direction: row;
   width: 30%;
   justify-content: space-evenly;
   align-items: center;
   background-color: ${props => props.color};
   height: 40px;
   padding: 5px;
   border-radius: 20px;
`


export const RecipeDetail = styled.Pressable`
   width: 33%;
   align-items: center;
   justify-content: center;
   height: 40px;
   padding: 5px;
   margin: 10px 5px 5px;
   border-radius: 20px;
   border-width:${props => props.active ? '0.5px' : 0};
`

export const RecipeDetailsContainer = styled.View`
   flex: 1;
   align-self: center;
   width: 97%;
   align-items: stretch;
   margin: 1px;
   padding: 5px;
   border-top-width: 1px;
   border-top-color: grey;
`
