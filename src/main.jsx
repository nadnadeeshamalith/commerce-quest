import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const ONESIGNAL_APP_ID = 'ac87427d-9f61-4a2f-89d8-812c1793d79d'

window.OneSignalDeferred = window.OneSignalDeferred || []
window.OneSignalDeferred.push(async function (OneSignal) {
  await OneSignal.init({
    appId: ONESIGNAL_APP_ID,
    serviceWorkerPath: '/OneSignalSDKWorker.js',
    allowLocalhostAsSecureOrigin: true,
  })
  try {
    await OneSignal.Notifications.requestPermission()
  } catch (e) {
    console.warn('[OneSignal] requestPermission failed', e)
  }
})

createRoot(document.getElementById('root')).render(
  <App />,
)
