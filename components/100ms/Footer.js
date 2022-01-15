import {
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  useHMSActions,
  useHMSStore,
} from "@100mslive/hms-video-react";
import mike from "../../assets/livetracking_img/mike.svg";
import Video from "../../assets/livetracking_img/EnableVideo.svg";

function Footer() {
  const videoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const audioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const hmsActions = useHMSActions();

  const toggleAudio = () => {
    hmsActions.setLocalAudioEnabled(!audioEnabled);
  };

  const toggleVideo = () => {
    hmsActions.setLocalVideoEnabled(!videoEnabled);
  };

  return (
    <div
      style={{
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 10,
        marginTop: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 10,
      }}
    >
      <div className="btn-control" onClick={() => toggleAudio()}>
        {!audioEnabled ? (
          <img
            src={mike}
            alt="Mute"
            style={{ width: 42, height: 42, cursor: "pointer" }}
          />
        ) : (
          <img
            src={mike}
            alt="Unmute"
            style={{ width: 42, height: 42, cursor: "pointer" }}
          />
        )}
      </div>
      <div className="btn-control" onClick={() => toggleVideo()}>
        {videoEnabled ? (
          <img
            src={Video}
            alt="Hide"
            style={{ width: 42, height: 42, cursor: "pointer" }}
          />
        ) : (
          <img
            src={Video}
            alt="UnHide"
            style={{ width: 42, height: 42, cursor: "pointer" }}
          />
        )}
      </div>
    </div>
  );
}

export default Footer;
