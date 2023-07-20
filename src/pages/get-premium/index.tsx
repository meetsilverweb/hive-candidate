// @ts-nocheck
// ** React Imports
import { Ref, useState, forwardRef, ReactElement, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import Payment from 'payment'
import Cards, { Focused } from 'react-credit-cards'

// ** Util Import
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Styled Component Imports
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Container } from '@mui/material'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DialogAddCard = () => {
  // ** States
  const [name, setName] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const [cvc, setCvc] = useState<string | number>('')
  const [cardNumber, setCardNumber] = useState<string>('')
  const [focus, setFocus] = useState<Focused | undefined>()
  const [expiry, setExpiry] = useState<string | number>('')

  const handleBlur = () => setFocus(false)

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value, Payment)
      setCardNumber(target.value)
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value)
      setExpiry(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value, cardNumber, Payment)
      setCvc(target.value)
    }
  }

  const handleClose = () => {
    setShow(false)
    setCvc('')
    setName('')
    setExpiry('')
    setCardNumber('')
    setFocus(undefined)
  }

  return (
    <Container maxWidth='md' sx={{ my: 15 }}>
      <Card
        sx={{
          p: 10
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CardWrapper sx={{ '& .rccs': { m: '0 auto', display: { xs: 'none', sm: 'block' } } }}>
              <Cards cvc={'123'} expiry={'05/28'} name={'Silver Webbuzz Pvt. Ltd.'} number={'4356 4872 2654 5769'} />
            </CardWrapper>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name='number'
                  value={cardNumber}
                  autoComplete='off'
                  label='Token'
                  onBlur={handleBlur}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  disabled
                  name='name'
                  value={Number(cardNumber * 0.18)}
                  autoComplete='off'
                  label='GST 18%'
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name='Amount'
                  label='Amount'
                  value={Number(cardNumber * 0.18) + Number(cardNumber)}
                  onBlur={handleBlur}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={2} display='flex' justifyContent='end'>
                <Button
                  sx={{
                    height: '100%'
                  }}
                  variant='contained'
                >
                  pay now
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}

export default DialogAddCard
