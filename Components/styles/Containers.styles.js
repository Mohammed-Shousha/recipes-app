import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'

export const RowContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: space-around;
  width: 100%;
  padding: 5px 0;
  background-color: transparent;
  z-index: 0;
`

export const UserDetailContainer = styled(RowContainer)`
  justify-content: space-between;
  padding: 15px 10px;
`

export const Box = styled.Pressable`
  width: 45%;
  min-height: 200px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  align-items: center;
  justify-content: center;
`

export const BoxesContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex: 1;
  gap: 20px;
  flex-wrap: wrap;
`

export const RecipeInfo = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${(props) => props.color};
  height: 40px;
  padding: 5px;
  margin: 0 5px;
  border-radius: 20px;
`

export const RecipeDetail = styled.Pressable`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 5px 5px;
  border-radius: 20px;
  border-width: ${(props) => (props.active ? '0.5px' : 0)};
`

export const RecipeDetailsContainer = styled.ScrollView`
  flex: 1;
  align-self: center;
  width: 97%;
  padding: 5px;
  border-top-width: 1px;
  border-top-color: grey;
`

export const ConfirmContainer = styled.View`
  background-color: #eff7e1;
  align-self: center;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 20%;
  border-radius: 10px;
  border-width: 1px;
  border-color: #4e8d7c;
  padding: 10px;
  margin: 80%;
`

export const CenterContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: stretch;
`

export const LoadingContainer = styled.View`
  width: 100px;
  height: 100px;
  margin-top: 25px;
  align-self: center;
  justify-content: center;
`

export const Container = styled(LinearGradient).attrs((props) => ({
  colors: ['#96fbc4', '#eff7e1'],
  locations: [0.1, 0.2],
}))`
  flex: 1;
  align-items: stretch;
  justify-content: flex-start;
  z-index: 0;
`
