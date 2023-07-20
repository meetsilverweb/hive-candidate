//@ts-nocheck
//eslint-disable
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { updateEmployee, uploadResume } from 'src/slice/dashboardSlice'

const DialogDeleteConfirmation = ({ open, handleClose, getEmployeeData }: boolean | any) => {
  const dispatch = useDispatch()
  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Delete Confirmation</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete ?</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color='error'
          variant='outlined'
          onClick={() => {
            const payload = { id: getEmployeeData?.id, file: null }
            dispatch(uploadResume(payload))
            handleClose()
          }}
          type='submit'
        >
          Yes
        </Button>
        <Button variant='outlined' onClick={() => handleClose()} type='submit'>
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDeleteConfirmation
