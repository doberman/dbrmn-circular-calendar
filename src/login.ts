import { getUser } from './state'

// kolla om user finns
const user = getUser()
// om user finns, gå till play
if (
  user ||
  !process.env.IS_IN_PRODUCTION ||
  process.env.IS_IN_PRODUCTION === 'false'
) {
  setTimeout(() => location.replace('/'), 1000)
} else {
  // annars, finns det en login-knapp
  const slackButton = document.querySelector('#slack')! as HTMLAnchorElement
  slackButton.href = `https://slack.com/openid/connect/authorize?scope=openid%20email%20profile&response_type=code&redirect_uri=${encodeURIComponent(
    `https://${process.env.SIGN_IN_REDIRECT_URL}/callback.html`
  )}&client_id=${process.env.SIGN_IN_CLIENT_ID!}`

  const loginEl = document.querySelector('#login')! as HTMLAnchorElement
  loginEl.classList.replace('hidden', 'flex')
}
