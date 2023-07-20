// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { margin } from '@mui/system'

interface TableHeaderProps {
  plan: string
  value: string
  handleFilter: (val: string) => void
  handlePlanChange: (e: SelectChangeEvent) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { plan, handlePlanChange, handleFilter, value } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <FormControl size='small' sx={{ mb: 2 }}>
          <InputLabel id='plan-select'>Sort By:</InputLabel>
          <Select
            size='small'
            value={plan}
            id='Sort-By'
            label='Sort By:'
            labelId='Sort-By'
            onChange={handlePlanChange}
            inputProps={{ placeholder: 'Sort By:' }}
          >
            <MenuItem value=''>Sort By:</MenuItem>
            <MenuItem value='basic'>Basic</MenuItem>
            <MenuItem value='company'>Company</MenuItem>
            <MenuItem value='enterprise'>Enterprise</MenuItem>
            <MenuItem value='team'>Team</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginLeft: '20px' }}>
        <FormControl size='small' sx={{ mb: 2 }}>
          <InputLabel id='plan-select'>Status :</InputLabel>
          <Select
            size='small'
            value={plan}
            id='Status'
            label='Status :'
            labelId='Status'
            onChange={handlePlanChange}
            inputProps={{ placeholder: 'Status :' }}
          >
            <MenuItem value=''>Status :</MenuItem>
            <MenuItem value='basic'>Basic</MenuItem>
            <MenuItem value='company'>Company</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default TableHeader
