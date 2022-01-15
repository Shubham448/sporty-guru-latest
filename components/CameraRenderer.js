import { useEffect, useRef, useState } from "react";
import { drawLandmarks } from "@mediapipe/drawing_utils";
import { Camera } from "@mediapipe/camera_utils";
// import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { getAngleZ, visibleCoords } from "../modules/live-video/Logics";
import unlitBulb from "../assets/Images/UnlitBulb.svg";
import LiveComponentActionPlanCard from '../components/LiveComponentActionPlanCard';
import LiveDetailComponent from "./LiveDetailComponent";
import Image from 'react-bootstrap/Image';
import Image_Loader from '../assets/Images/image_loader.png';
import Image_Done from '../assets/Images/image_done.png';
import one from '../assets/Images/1.png';
import two from '../assets/Images/2.png';
import three from '../assets/Images/3.png';
import four from '../assets/Images/4.png';
import five from '../assets/Images/5.png';
// import * as posedetection from "@tensorflow-models/pose-detection";
import * as params from '../modules/live-video/params';

// const pose = typeof window != 'undefined' && new Pose({
//   locateFile: (file) => {
//     return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
//   },
// });
// typeof window != 'undefined' && pose.setOptions({
//   modelComplexity: 1,
//   smoothLandmarks: true,
//   enableSegmentation: true,
//   smoothSegmentation: true,
//   minDetectionConfidence: 0.5,
//   minTrackingConfidence: 0.5,
//   selfieMode: true
// });

let detection_started = false

let image = Image_Loader

let exercise = null

let img = five

let countDown = false

var connectorColor = 'white'

var count_at_message = 0

var err_guide = false

var once = false

var completed = false

var exercise_n = -1

const imagesTimeout = (imgs, timeout) => {

  setTimeout(() => {

    img = imgs.pop()

    if(imgs.length === 0)
    {
      countDown = false
      return
    }

    imagesTimeout(imgs, timeout)

  }, timeout)

}

const calculate_squats = (k_angle, b_angle, data) => {

  if(k_angle <= 120 && k_angle >= 60 && data.complete)
  {
    data.partial = true
  }
  
  if(k_angle > 150 && b_angle > 150 && data.start)
  {
    data.complete = true
  }
  
  if(data.complete)
  {
    if((k_angle < 60))
    {
      data.complete = false
      data.count++
      data.partial = false

      data.energy = true

      data.countTime = new Date().getSeconds()
    }
  }
  
  if(data.partial && (k_angle > 150 && b_angle > 150))
  {
    data.partial = false
  }

}

const calculate_pushups = (la_angle, data, countData) => {
  data.prev = data.curr

  if(data.last_angle === null)
  {
    data.last_angle = la_angle
  } else
  {
    data.last_angle = 0.5*data.last_angle + 0.5*la_angle
  }

  if(data.last_angle >= 140)
  {
    data.curr = 0
  } else if(data.last_angle < 140 && data.last_angle >= 110)
  {
    data.curr = 1
  } else if(data.last_angle < 110 && data.last_angle >= 30)
  {
    data.curr = 2
  } else if(data.last_angle < 30)
  {
    data.curr = 3
  }

  if(data.curr === 3)
  {
    data.score = 0
  }

  if(data.curr === 2 && data.prev !== 2 && data.prev < data.curr)
  {
    data.score += 0.5
  }

  if(data.curr === 1 && data.prev === 0)
  {
    data.score = 0.5
  }

  if(data.curr === 0 && data.prev === 1)
  {
    if(data.score >= 1)
    {
      countData.count++
      data.score = 0
    }
  }

}

export default ({ data, data_p, no_guidance }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // pose.onResults(onResults);
    // const camera = new Camera(videoRef.current, {
    //   onFrame: async () => {
    //     await pose.send({ image: videoRef.current });
    //   },
    //   width: 1280,
    //   height: 720,
    // });
    // camera.start();
  }, []);

  // function onResults(results) {

  //   // detection_started = results.poseLandmarks ? true : false

  //   // if (!results.poseLandmarks) {
  //   //   return;
  //   // }
  //   const canvasCtx = canvasRef.current.getContext("2d");
  //   canvasCtx.save();
  //   canvasCtx.clearRect(
  //     0,
  //     0,
  //     canvasRef.current.width,
  //     canvasRef.current.height
  //   );
  //   canvasCtx.globalCompositeOperation = "source-in";
  //   canvasCtx.fillStyle = "#00FF00";
  //   canvasCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

  //   let b_angle = getAngleZ(results.poseLandmarks[12], results.poseLandmarks[24], results.poseLandmarks[26])
  //   let k_angle = getAngleZ(results.poseLandmarks[24], results.poseLandmarks[26], results.poseLandmarks[28])

  //   let la_angle = getAngleZ(results.poseLandmarks[11], results.poseLandmarks[13], results.poseLandmarks[15])

  //   let lh_angle = getAngleZ(results.poseLandmarks[23], results.poseLandmarks[11], results.poseLandmarks[13])
  //   let rh_angle = getAngleZ(results.poseLandmarks[24], results.poseLandmarks[12], results.poseLandmarks[14])

  //   if(visibleCoords(results) === 1 && (!data.guide && !countDown) || (no_guidance))
  //   {
  //     calculate_squats(k_angle, b_angle, data)

  //     if(data.count === data.exercise[exercise_n + 1].min_Reps && !completed)
  //     {
  //       exercise_n++
  //       completed = true
  //       data.guide_text = 'You completed exercise 1'
  //       data.showMessage = true
  //     }
  //   }

  //   data.visible = Math.round(visibleCoords(results) * 100);

  //   if(data.visible === 100 && data.guide && !data.showMessage)
  //   {
  //     if((Math.abs(results.poseLandmarks[0].y - results.poseLandmarks[31].y)*720 >= window.innerHeight*.7) || (Math.abs(results.poseLandmarks[0].y - results.poseLandmarks[32].y)*720 >= window.innerHeight*.7))
  //     {
  //       image = Image_Done

  //       setTimeout(() => {

  //         exercise = data.exercise[0]

  //         data.guide = false

  //         setTimeout(() => {

  //           countDown = true

  //           exercise = null

  //           imagesTimeout([ one, one, two, three, four ], 1000)

  //         }, 4000)

  //       }, 2000)
  //     }
  //   }

  //   // Only overwrite missing pixels.
  //   canvasCtx.globalCompositeOperation = "destination-atop";
  //   canvasCtx.drawImage(
  //     results.image,
  //     0,
  //     0,
  //     canvasRef.current.width,
  //     canvasRef.current.height
  //   );

  //   canvasCtx.globalCompositeOperation = "source-over";
    
  //   // Draw connectors implementation

  //   canvasCtx.fillStyle = connectorColor;
  //   canvasCtx.strokeStyle = connectorColor;
  //   canvasCtx.lineWidth = window.innerWidth >= 768 ? 10 : 4;

  //   posedetection.util
  //     .getAdjacentPairs(params.STATE.model)
  //     .forEach(([i, j]) => {

  //       const kp1 = results.poseLandmarks[i];
  //       const kp2 = results.poseLandmarks[j];

  //       if(visibleCoords(results) === 1 && (!data.guide && !countDown) || (no_guidance))
  //       {
  //         if(data.count % 2 === 0 && data.count - count_at_message <= 2 && data.count - count_at_message > 0 && !once)
  //         {
  //           data.guide_text = 'Check your hands'
  //           data.showMessage = true

  //           setTimeout(() => {

  //             data.guide_text = ''
  //             data.showMessage = false

  //           }, 4000)

  //           once = true
  //         }

  //         if(data.count % 2 === 0 && data.count - count_at_message <= 2 && data.count - count_at_message > 0)
  //         {
  //           err_guide = true
  //         }

  //         if(data.count % 2 === 0 && data.count - count_at_message > 2)
  //         {
  //           err_guide = false
  //         }

  //         if(i === 11 || i === 12)
  //         {
  //           if(lh_angle < 60 || rh_angle < 60)
  //           {
  //             count_at_message = data.count

  //             if(err_guide)
  //             {
  //               canvasCtx.strokeStyle = 'red'
  //               if(j === 12 || j === 11 || j === 23 || j === 24)
  //               {
  //                 return
  //               }

  //               if(lh_angle >= 60 && i === 11)
  //               {
  //                 canvasCtx.strokeStyle = 'white'
  //               }

  //               if(rh_angle >= 60 && (i === 12))
  //               {
  //                 canvasCtx.strokeStyle = 'white'
  //               }
  //             }
  //           } else
  //           {
  //             if(err_guide)
  //             {
  //               if(j === 12 || j === 11 || j === 23 || j === 24)
  //               {
  //                 return
  //               }
  //             }
  //             canvasCtx.strokeStyle = 'white'
  //           }
  //         } else
  //         {
  //           // if(lh_angle < 60 || rh_angle < 60)
  //           // {
  //           //   return
  //           // } else
  //           // {
  //             if(err_guide)
  //             {
  //               return
  //             }
  //             canvasCtx.strokeStyle = 'white'
  //           // }
  //         }

  //       }

  //       // If score is null, just show the keypoint.
  //       const score1 = kp1.visibility != null ? kp1.visibility : 1;
  //       const score2 = kp2.visibility != null ? kp2.visibility : 1;
  //       const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0;

  //       if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
  //         canvasCtx.beginPath();
  //         canvasCtx.moveTo(kp1.x*1280, kp1.y*720);
  //         canvasCtx.lineTo(kp2.x*1280, kp2.y*720);
  //         canvasCtx.stroke();
  //       }
  //     });

  //   // drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
  //   //   color: connectorColor,
  //   //   lineWidth: window.innerWidth >= 768 ? 10 : 4,
  //   // });

  //   // drawLandmarks(canvasCtx, results.poseLandmarks, {
  //   //   color: 'green',
  //   //   radius: window.innerWidth >= 768 ? 8 : 4
  //   // });
  //   canvasCtx.restore();
  // }

  return (
    <div style = {{ display: 'flex', flexDirection: 'column', height: window.innerWidth >= 768 ? window.innerHeight - 100 : window.innerWidth - 84, position: 'relative' }}>
      <div
        className="ActionPlanData"
        style={
          window.innerWidth > 645
            ? {
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.6)",
                borderRight: data?.exercise?.length < 4 && "2px solid white",
                width: 180,
                overflowY: "scroll",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: 15
              }
            : {
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.6)",
                borderTop: "2px solid white",
                overflowX: "scroll",
                height: "max-content",
                zIndex: 1,
                display: "flex",
              }
        }
      >
        {data.exercise &&
          data.exercise.map((val, index) => {
            return (
              <LiveComponentActionPlanCard
                img={val.thumbnail_URL}
                exercize_name={val.name}
                video_URL={val.video_URL}
                key={index}
                LiveTrackingScreen={true}
                exercise_completed={index === exercise_n && true}
              />
            );
          })}
      </div>
      
      {
        no_guidance ? null : (
          <>
            { ((detection_started && data.showMessage) || data.guide || exercise || countDown) && <div style = {{ position: 'absolute', width: window.innerWidth >= 768 ? window.innerWidth - 142 - (window.innerWidth - 160)/12 : window.innerWidth - 60, height: window.innerWidth >= 768 ? window.innerHeight - 100 : window.innerWidth - 84, backdropFilter: `${ data.guide && !data.showMessage ? 'blur(5px)' : 'blur(20px)' }`, backgroundColor:  `${ data.guide && !data.showMessage ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.6)' }`, zIndex: 0 }}></div> }

            {
              data.guide_text === 'Today we will be doing these exercises' && window.innerWidth >= 768 && (<div style = {{ position: 'absolute', display: 'flex', flexDirection: 'row', height: window.innerWidth >= 768 ? window.innerHeight - 100 : window.innerWidth - 84, alignItems: 'center' }}>

                <div style = {{ display: data.showMessage ? 'flex' : 'none', width: 0, height: 0, borderRight: `${ window.innerWidth >= 768 ? 100 : 30}px solid black`, borderTop: '0px solid transparent', borderBottom: `${ window.innerWidth >= 768 ? 50 : 20 }px solid transparent`, marginTop: 10, marginLeft: 180, zIndex: 1 }}/>

                <div
                  style={{ display: data.showMessage ? "flex" : "none", flexDirection: 'column', justifyContent: 'center', width: window.innerWidth >= 768 ? 250 : 175, height: window.innerWidth >= 768 ? 200 : 125, borderRadius: 100, backgroundColor: 'black', padding: 20, marginLeft: window.innerWidth >= 768 ? -50 : -20, zIndex: 1 }}
                >
                  <p style={{ maxWidth: window.innerWidth >= 768 ? 250 : 175, textAlign: 'center', fontSize: window.innerWidth >= 768 ? 25 : 19, fontWeight: 700, color: '#FFB100' }}>{data.guide_text}</p>
                </div>

              </div>)
            }

            {
              data.guide_text !== 'Today we will be doing these exercises' && (
                <div
                className="bulb-icon"
                style={{
                  position: "absolute",
                  display: 'flex',
                  flexDirection: 'row',
                  right: window.innerWidth >= 768 ? 20 : 10,
                  marginTop: 20,
                }}
              >
                <div
                  style={{ display: data.showMessage ? "flex" : "none", flexDirection: 'column', justifyContent: 'center', width: window.innerWidth >= 768 ? 350 : 200, height: window.innerWidth >= 768 ? 200 : 125, borderRadius: 100, backgroundColor: 'black', padding: 20, marginRight: window.innerWidth >= 768 ? -100 : -40 }}
                >
                  <p style={{ maxWidth: window.innerWidth >= 768 ? 350 : 200, textAlign: 'center', fontSize: window.innerWidth >= 768 ? 25 : 19, fontWeight: 700, color: '#FFB100' }}>{data.guide_text}</p>
                </div>

                <div style = {{ display: data.showMessage ? 'flex' : 'none', width: 0, height: 0, borderLeft: `${ window.innerWidth >= 768 ? 150 : 40}px solid black`, borderTop: '0px solid transparent', borderBottom: `${ window.innerWidth >= 768 ? 50 : 20 }px solid transparent`, marginTop: 10 }}/>

                <img
                  src={unlitBulb}
                  alt="Technique"
                  style={{ height: 35, width: 35 }}
                />
              </div>
              )
            }

            {
              data.guide && !data.showMessage && (
                <div style = {{ position: 'absolute', display: 'flex', flexDirection: 'column', alignSelf: 'center', top: window.innerWidth >= 768 ? 100 : 30 }}>

                  <div style = {{ textAlign: 'center', fontSize: 40, color: '#FFB100', fontWeight: 400, maxWidth: 400 }}>Wait a second, { '\n' } calibrating, move back</div>

                  <Image width = { 200 } height = { 'auto' } style = {{ alignSelf: 'center', marginTop: 20, animation: image === Image_Loader && 'full_rotation 1s linear infinite' }} src = { image }/>

                </div>
              )
            }

            {
              exercise ? (
                <div style = {{ position: 'absolute', display: 'flex', flexDirection: 'column', alignSelf: 'center', top: window.innerWidth >= 768 ? 20 : 10 }}>

                  <div style = {{ fontSize: 40, color: '#FFB100', alignSelf: 'center', maxWidth: window.innerWidth }}>Now we are going to start with your 1st exercise</div>
                  
                  <Image style = {{ width: 'auto', height: 200, alignSelf: 'center', marginTop: 20, border: '1px solid white' }} src = { exercise.thumbnail_URL }/>

                  <div style = {{ fontSize: 25, color: '#FFB100', alignSelf: 'center', maxWidth: window.innerWidth, marginTop: 30 }}>{ `Sets - ${ exercise.min_Sets }/${ exercise.max_Sets }` }</div>

                  <div style = {{ fontSize: 25, color: '#FFB100', alignSelf: 'center', maxWidth: window.innerWidth, marginTop: 20 }}>{ `Reps - ${ exercise.min_Reps }/${ exercise.max_Reps }` }</div>

                  <div style = {{ fontSize: 25, color: '#FFB100', alignSelf: 'center', maxWidth: window.innerWidth, marginTop: 20 }}>{ `Exercise name - ${ exercise.name }` }</div>

                </div>
              ) : null
            }

            {
              countDown && (
                <div style = {{ position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', top: 0, bottom: 0 }}>

                  <Image style = {{ width: 'auto', height: 300 }} src = { img }/>

                </div>
              )
            }

        </>
        )
      }

      <div style = {{ position: 'absolute', display: 'flex', flexDirection: 'row', alignSelf: 'center', bottom: 20 }}>

        <LiveDetailComponent text={''} val = {data.count} progressbar = {false} extra_styles={{ marginRight: 10 }} sizes = {{ width: 70, height: 70 }}/>

        {/* <LiveDetailComponent text={''} val = {data?.exercise[0]?.min_Reps} progressbar = {false} extra_styles = {{ marginLeft: 10 }} sizes = {{ width: 70, height: 70 }}/> */}

      </div>

      <video
        ref={videoRef}
        style={{ display: "none" }}
        className="input_video"
      ></video>
      <canvas
        ref={canvasRef}
        className="output_canvas"
        width={ window.innerWidth >= 768 ? "1280px" : window.innerWidth }
        height={ window.innerWidth >= 768 ? "720px" : window.innerWidth - 160 }
        style = {{ alignSelf: window.innerWidth >= 768 ? 'center' : 'center', justifySelf: 'center' }}
      ></canvas>
    </div>
  );
};
