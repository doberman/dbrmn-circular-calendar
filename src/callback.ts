import jwtDecode from 'jwt-decode'

import { setUser } from './state'
import { User } from './types'

const code = window.location.search.substring(1)
console.log(code, 'code')

if (code) {
  fetch(
    `https://slack.com/api/openid.connect.token?${[
      code,
      `client_id=${process.env.SIGN_IN_CLIENT_ID}`,
      `client_secret=${process.env.SIGN_IN_CLIENT_SECRET}`,
      'grant_type=authorization_code',
      `redirect_uri=${encodeURIComponent(
        `https://${process.env.SIGN_IN_REDIRECT_URL}/callback.html`
      )}`
    ].join('&')}`,
    {
      method: 'POST'
    }
  )
    .then((res) => res.json())
    .then((json) => {
      if (!json.ok) {
        throw new Error(json.error)
      }
      // decode id_token jwt
      const { id_token } = json
      const decoded = jwtDecode(id_token) as User
      setUser(decoded)
      location.replace('/')
    })
    .catch((err) => console.error(err))
} else {
  location.replace('.')
}
