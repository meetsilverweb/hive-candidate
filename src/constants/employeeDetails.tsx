// const userData = localStorage.getItem('userData') || null
// export const userId = JSON.parse(userData)?.id
// export const employeeId = JSON.parse(userData)?.id || ''

import React, { useEffect } from 'react'

const employeeDetails = () => {
  const userData = localStorage.getItem('userData') || null
  useEffect(() => {
    console.log('userData===', userData)
  }, [])
  return userData
}

export default employeeDetails
