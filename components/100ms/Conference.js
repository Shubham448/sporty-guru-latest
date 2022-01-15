import { selectPeers, useHMSStore } from "@100mslive/hms-video-react";
import Peer from "./Peer";

function Conference({ liveScreencall }) {
  const peers = useHMSStore(selectPeers);
  console.log('perr', peers)
  // if(peers.length > 2)
  // {
  //     return null
  // }
  return (
    <div>
      {/* <h2>Conference</h2> */}

      <div>
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} liveScreencall={liveScreencall} />
        ))} 
      </div>
    </div>
  );
}

export default Conference;
