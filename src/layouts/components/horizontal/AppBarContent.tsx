import Box from '@mui/material/Box'
import { Settings } from 'src/@core/context/settingsContext'
import { HorizontalNavItemsType } from 'src/@core/layouts/types'
import Navigation from 'src/@core/layouts/components/horizontal/navigation'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown, {
  NotificationsType
} from 'src/@core/layouts/components/shared-components/NotificationDropdown'
interface Props {
  settings: Settings
  horizontalNavItems?: HorizontalNavItemsType
}

const AppBarContent = (props: Props) => {
  const { settings, horizontalNavItems } = props
  const notifications: NotificationsType[] = [
    {
      meta: 'Today',
      avatarAlt: 'Flora',
      title: 'Congratulation Flora! 🎉',
      avatarImg: '/images/avatars/4.png',
      subtitle: 'Won the monthly best seller badge'
    },
    {
      meta: 'Yesterday',
      avatarColor: 'primary',
      subtitle: '5 hours ago',
      avatarText: 'Robert Austin',
      title: 'New user registered.'
    },
    {
      meta: '11 Aug',
      avatarAlt: 'message',
      title: 'New message received 👋🏻',
      avatarImg: '/images/avatars/5.png',
      subtitle: 'You have 10 unread messages'
    },
    {
      meta: '25 May',
      title: 'Paypal',
      avatarAlt: 'paypal',
      subtitle: 'Received Payment',
      avatarImg: '/images/misc/paypal.png'
    },
    {
      meta: '19 Mar',
      avatarAlt: 'order',
      title: 'Received Order 📦',
      avatarImg: '/images/avatars/3.png',
      subtitle: 'New order received from John'
    },
    {
      meta: '27 Dec',
      avatarAlt: 'chart',
      subtitle: '25 hrs ago',
      avatarImg: '/images/misc/chart.png',
      title: 'Finance report has been generated'
    }
  ]
  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
      <Navigation settings={settings} horizontalNavItems={horizontalNavItems} />
      <NotificationDropdown settings={settings} notifications={notifications} />
      <UserDropdown settings={settings} />
    </Box>
  )
}

export default AppBarContent
