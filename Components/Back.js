import { Icon } from '@components/styles/Images.styles'

import { backIcon, backArrowIcon } from '@assets/icons'

export const Back = ({ recipe }) => (
  <Icon
    source={recipe ? backArrowIcon : backIcon} // if in recipe page backarrow with background
    size={recipe ? '35' : '25'}
  />
)
