import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

window.OneSignalDeferred = window.OneSignalDeferred || []
window.OneSignalDeferred.push(async function (OneSignal) {
  await OneSignal.init({
    appId: "ac87427d-9f61-4a2f-89d8-812c1793d79d",
    safari_web_id: "web.onesignal.auto.064564c7-873b-47e2-8947-81793d79d678",
    notifyButton: {
      enable: true,
    },
  })
})

createRoot(document.getElementById('root')).render(
  <App />,
)
