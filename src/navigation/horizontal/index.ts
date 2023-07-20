// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'tabler:smart-home'
  },
  {
    title: 'Find Jobs',
    path: '/find-jobs',
    icon: 'tabler:user'
  },
  {
    title: 'Track Application',
    path: '/track-application',
    icon: 'tabler:user'
  }
]

export default navigation
