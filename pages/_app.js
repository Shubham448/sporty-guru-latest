import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import { HMSRoomProvider } from "@100mslive/hms-video-react"
import { BrowserRouter } from 'react-router-dom';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {
        typeof window !== 'undefined' ? (
          <>
            <HMSRoomProvider>
              <BrowserRouter>
                <NotificationContainer />
                <Component {...pageProps} />
              </BrowserRouter>
            </HMSRoomProvider>
          </>
        ) : null
      }
    </>
  )
}

export default MyApp;
