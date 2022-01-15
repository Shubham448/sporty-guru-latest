import { HMSRoomProvider } from "@100mslive/hms-video-react";
import Home from "../../components/User Table/UserTable";
import withAuth from "../../components/Protected Routes/Trainer";

const App = () => {
  return (
    <>
      {typeof window !== "undefined" ? (
        <HMSRoomProvider>
          <Home />
        </HMSRoomProvider>
      ) : (
        console.log("Oops, `window` is not defined")
      )}
    </>
  );
};

export default withAuth(App);
