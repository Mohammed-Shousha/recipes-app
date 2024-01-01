import { useState, forwardRef } from 'react'

import { StyledFormInput } from './styles/Inputs.styles'

export const FormInput = forwardRef((props, ref) => {
  const [active, setActive] = useState(false)

  const handleFocus = () => setActive(true)

  const handleBlur = () => setActive(false)

  return (
    <StyledFormInput
      active={active}
      onFocus={handleFocus}
      onBlur={handleBlur}
      ref={ref}
      {...props}
    />
  )
})
