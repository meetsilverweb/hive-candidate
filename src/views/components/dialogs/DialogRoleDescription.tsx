import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-mui'
import React from 'react'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { updateEmployee } from 'src/slice/dashboardSlice'

type RoleDescription = {
  roleDescription: string
}

const DialogRoleDescription = ({ open, handleClose, getEmployeeData }: boolean | any) => {
  const dispatch = useAppDispatch()
  const handleSubmit = (values: RoleDescription) => {
    const payload = {
      id: getEmployeeData?.id,
      roleDescription: values?.roleDescription
    }

    dispatch(updateEmployee(payload))
    handleClose()
  }

  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <Formik
        initialValues={{
          roleDescription: getEmployeeData?.roleDescription || ''
        }}
        onSubmit={values => handleSubmit(values)}
      >
        <Form>
          <DialogTitle id='form-dialog-title'>Edit Personal Details</DialogTitle>
          <DialogContent>
            <Field
              minRows={5}
              maxRows={10}
              multiline
              component={TextField}
              name='roleDescription'
              size='small'
              autoFocus
              fullWidth
              label='Role Description'
            />
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button type='submit' variant='outlined'>
              Submit
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  )
}

export default DialogRoleDescription
