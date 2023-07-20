import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'

const index = () => {
  return (
    <div>
      <Cards cvc={'123'} expiry={'05/28'} name={'Silver Webbuzz'} number={'1212121 12121 421210 121212'} />
    </div>
  )
}

export default index
