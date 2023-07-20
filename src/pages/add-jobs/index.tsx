//@ts-nocheck
//eslint-disable
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import StepperCustomHorizontal from 'src/views/form-wizard/StepperCustomHorizontal'

const FormWizard = () => {
  const router = useRouter()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
        <Typography variant='h6'>Custom Horizontal Stepper</Typography>
      </Grid>
      <Grid item xs={12}>
        <StepperCustomHorizontal />
      </Grid>
    </Grid>
  )
}

export default FormWizard
