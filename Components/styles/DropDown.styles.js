import styled from 'styled-components/native'
import DropDownPicker from 'react-native-dropdown-picker'

export const DropDown = styled(DropDownPicker).attrs((props) => ({
  style: {
    borderWidth: 0,
    alignSelf: 'center',
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 7,
    borderColor: '#b7b7a4',
    backgroundColor: 'transparent',
  },
  textStyle: {
    fontFamily: 'sans-serif-light',
    fontSize: 26,
    color: '#222831',
  },
  dropDownContainerStyle: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#eff7e1',
    borderColor: '#d3d3d3',
    width: '98%',
  },
  listItemContainerStyle: {
    backgroundColor: '#eff7e1',
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    paddingVertical: 10,
    height: 55,
  },
  placeholderStyle: {
    color: '#666',
  },
}))`
  border-width: 0;
  align-self: center;
  border-bottom-width: 1px;
  margin-vertical: 10px;
  padding-horizontal: 7px;
  background-color: transparent;
  border: #b7b7a4;
`
