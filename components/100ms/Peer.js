import {
  selectVideoTrackByPeerID,
  useHMSActions,
  useHMSStore,
} from "@100mslive/hms-video-react";
import { useRef, useEffect } from "react";
import Footer from "./Footer";

function Peer({ peer, liveScreencall}) {
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  const videoTrack = useHMSStore(selectVideoTrackByPeerID(peer.id));

  useEffect(() => {
    if (videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    }
  }, [videoTrack, hmsActions, videoRef.current]);

  return peer.isLocal ? null : (
    <div style={window.innerWidth <= 576 ? {display: 'flex', alignItems: 'center', flexDirection: 'column'} : {}}>
      <video
        style={ liveScreencall ? {
          width: "auto",
          height: window.innerHeight / 2 - 50,
        }: {
          width: "auto",
          maxWidth: 462,
          height: window.innerHeight / 2 - 10,
          maxHeight: 300
        }
      }
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
      />
      <div style={{ fontSize: 12, color: "white" }}>
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
      {!liveScreencall && 
        <Footer />
      }
    </div>
  );
}

export default Peer;
