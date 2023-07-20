import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { alpha, styled } from '@mui/material/styles'
import MuiInputBase, { InputBaseProps } from '@mui/material/InputBase'

type CustomTextInputprops = {
  value?: string
  handleChange?: any
  helperText?: any
  error?: boolean
  fullWidth?: boolean
}
// Styled InputBase component
const InputBase = styled(MuiInputBase)<InputBaseProps>(({ theme }) => ({
  marginTop: theme.spacing(4),
  '& .MuiInputBase-input': {
    fontSize: 16,
    width: 'auto',
    borderRadius: 10,
    padding: '10px 12px',
    position: 'relative',
    backgroundColor: ' #ffffff',
    border: '1px solid #ced4da',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
    // '&:focus': {
    //   borderColor: '#CECECE',
    //   boxShadow: '2'
    // }
  }
}))

const CustomTextInput = ({ value, handleChange, helperText, error, fullWidth }: CustomTextInputprops) => {
  return (
    <FormControl variant='standard'>
      <InputLabel
        shrink
        htmlFor='bootstrap-input'
        sx={{ transform: 'translate(0, -4px) scale(0.75)', fontWeight: '700', color: '#000000' }}
      >
        {'Bootstrap'}
      </InputLabel>
      <InputBase
        id='bootstrap-input'
        fullWidth={fullWidth}
        name='companyName'
        value={value}
        placeholder='Company Name'
        onChange={handleChange}
        type='text'
        // helperText={helperText}
        error={error}
        sx={{
          marginBottom: 3
        }}
      />
    </FormControl>
  )
}

export default CustomTextInput
