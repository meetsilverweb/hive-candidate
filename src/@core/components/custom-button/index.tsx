import { Button, ButtonProps, styled } from '@mui/material'
import { blue, brown } from '@mui/material/colors'

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: '#1057CA',
  fontSize: 14,
  padding: 14,
  color: theme.palette.getContrastText(brown[500]),
  '&:hover': {
    backgroundColor: '#0960ed'
  }
}))

export default CustomButton
