import React from "react";
import { setupDatGui } from "./option_panel";
import { setupStats } from "./stats_panel";
import { runApp } from "./tf_utils";
import Setting from "./images/Setting.png";
import LiveComponentActionPlanCard from "../../components/LiveComponentActionPlanCard";
import "./styles/myapp.css";
import { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import ReactPlayer from "react-player";
import CloseModal from "./images/CloseBtn.svg";
import LiveDetailComponent from "../../components/LiveDetailComponent.js";
import { useTimer } from "react-timer-hook";
import arrow from "./images/ModalArrow.png";
import Conference from "../../components/100ms/Conference";
import mike from "../../assets/livetracking_img/mike.svg";
import unlitBulb from "../../assets/UnlitBulb.svg";
import EnergyMeter1 from "./images/Vector.svg";
import EnergyMeter3 from "./images/Vector1.svg";
import EnergyMeter4 from "./images/Vector2.svg";
import EnergyMeter5 from "./images/Vector3.svg";
import EnergyMeter6 from "./images/Vector4.svg";
import EnergyMeter2 from "./images/LiveScreenEnergyMeter.svg";

export function MyApp({ handlePoses, exercise, count, visible, countTime, showMessage, guide_text, trainer, guide }) {
  const controlsUI = React.useRef(null);
  const statsUI = React.useRef(null);
  const gui = React.useRef(null);
  const stats = React.useRef(null);
  const [mute, setMute] = useState(false);
  const [allowTrainerVideo, setAllowTrainerVideo] = useState(false);
  const [video, setVideo] = useState(null);
  const [bulb, showBulb] = useState(false);
  const [exerciseInfoModal, setexerciseInfoModal] = useState(false);
  const [bulbDescription, setBulbDescription] = useState(
    "Move your hands upwards"
  );
  const time = new Date();
  const [energyMeter, setEnergyMeter] = useState(0);
  let value = 0;
  time.setSeconds(time.getSeconds() + 600);
  const { seconds, minutes } = useTimer({ expiryTimestamp: time });
  React.useEffect(() => {
    const initGui = async () => {
      // await runApp(window, handlePoses);
      await runApp(window);
      // await setupDatGui({ model: 'movenet', autoPlace: false })
      // if (controlsUI.current && statsUI.current && !gui.current) {
      // stats.current = setupStats(statsUI.current)
      // controlsUI.current.appendChild(gui.current.domElement)
      // console.log(stats.current, stats.current.customFpsPanel)
      // }
    };
    initGui();
  }, []);

  const calcEnergyVal = async () => {
    if (
      new Date().getSeconds() < countTime ||
      100 - (new Date().getSeconds() - countTime) * 20 <= 0
    ) {
      setEnergyMeter(0);
      return 0;
    }
    setEnergyMeter(100 - (new Date().getSeconds() - countTime) * 20);
    return 100 - (new Date().getSeconds() - countTime) * 20;
  };

  setInterval(calcEnergyVal, [1000]);

  return (
    <div
      style={{
        height:
          (window.innerWidth > 577 && 600) ||
          (window.innerWidth < 645 && window.innerWidth > 577 && 650) ||
          (window.innerWidth <= 576 && window.innerHeight - 20),
      }}
    >
      <div
        id="main"
        style={{
          height:
            (window.innerWidth > 577 && 600) ||
            (window.innerWidth < 645 && window.innerWidth > 577 && 650) ||
            (window.innerWidth <= 576 && window.innerHeight - 20),
        }}
      >
        <div
          style={{
            position: "relative",
            height:
              (window.innerWidth > 577 && 600) ||
              (window.innerWidth < 645 && window.innerWidth > 577 && 650) ||
              (window.innerWidth <= 576 && window.innerHeight - 20),
          }}
        >
          <div
            className="canvas-wrapper w-100 text-center"
            style={{
              height:
                (window.innerWidth > 577 && 600) ||
                (window.innerWidth < 645 && window.innerWidth > 577 && 650) ||
                (window.innerWidth <= 576 && window.innerHeight - 20),
            }}
          >
            {video && (
              <Container
                className="Modal"
                style={{
                  zIndex: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <ReactPlayer
                    width={(window.innerWidth <= 768 && "100%") || "100%"}
                    height={window.innerHeight / 2}
                    url={"https://www.youtube.com/watch?v=zWh3CShX_do"}
                    controls
                    playing
                    style={{ height: "max-content" }}
                  />
                  <img
                    src={CloseModal}
                    style={{
                      position: "absolute",
                      top: "-15px",
                      right: "-15px",
                      width: 30,
                      height: 30,
                      padding: 0,
                    }}
                    onClick={() => setVideo(null)}
                    alt="close"
                  />
                </div>
              </Container>
            )}
            <div
              className="bulb-icon"
              style={{
                position: "absolute",
                top: 15,
                right: 110,
                height: "max-content",
                width: "max-content",
              }}
              onClick={() => showBulb(!bulb)}
            >
              <img
                src={unlitBulb}
                alt="Technique"
                style={{ height: 35, width: 35, cursor: "pointer" }}
              />
              <div
                className="bulb-modal"
                style={{
                  position: "absolute",
                  top: -10,
                  right: 30,
                  height: "max-content",
                  minHeight: 130,
                  width: 215,
                  zIndex: 2,
                  background: " rgba(196, 196, 196, 1)",
                  fontSize: 12,
                  padding: "1rem 0",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  display: showMessage ? "flex" : "none",
                }}
              >
                <p style={{ maxWidth: 100 }}>{bulbDescription}</p>
              </div>
            </div>
            <div
              className="setting-icon"
              style={{
                position: "absolute",
                top: 15,
                right: 15,
                height: "max-content",
                width: "max-content",
                zIndex: 2,
              }}
            >
              <img
                src={Setting}
                alt="setting"
                className="setting_img"
                style={{ curosr: "pointer" }}
              />
              <div
                className="setting-modal"
                style={{
                  position: "absolute",
                  top: 0,
                  right: window.innerWidth < 576 ? 30 : 0,
                  width: "max-content",
                  height: 100,
                  background:
                    "linear-gradient(159.58deg, rgba(255, 255, 255, 0.4) 6.72%, rgba(255, 255, 255, 0.2) 88.06%)",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: 5,
                  padding: 7,
                  zIndex: 10,
                }}
              >
                <div
                  className="option1"
                  style={{
                    fontSize: 12,
                    color: "#FFFFFF",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <div
                    className="checkbox1"
                    style={{
                      background: allowTrainerVideo
                        ? "linear-gradient(180deg, #FF6600 0%, #FFB000 100%)"
                        : "#C4C4C4",
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",
                    }}
                    onClick={() => {
                      setAllowTrainerVideo(!allowTrainerVideo);
                    }}
                  />
                  <div style={{ flex: 8, textAlign: "left", marginLeft: 5 }}>
                    Allow trainer
                  </div>
                </div>
                <div
                  className="option2"
                  style={{
                    fontSize: 12,
                    color: "#FFFFFF",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="checkbox2"
                    style={{
                      background: mute
                        ? "linear-gradient(180deg, #FF6600 0%, #FFB000 100%)"
                        : "#C4C4C4",
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",
                    }}
                    onClick={() => {
                      setMute(!mute);
                    }}
                  />
                  <div style={{ flex: 8, textAlign: "left", marginLeft: 5 }}>
                    Mute
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                // height: "max-content",
                // width: "max-content",
                position: "absolute",
                margin: "auto",
                top: window.innerHeight / 2,
                transform: "translateY(-50%)",
                left: 0,
                right: 0,
                transition: "all 200ms ease-in",
                background: "rgb(74, 74, 74)",
                paddingTop: 10,
                display: window.innerWidth > 577 ? "none" : "flex",
              }}
            >
              <LiveDetailComponent
                text="Inside frame"
                val={visible}
                progressbar={true}
              />

              <LiveDetailComponent
                text="Reps"
                val={count}
                progressbar={false}
              />

              <LiveDetailComponent
                text="Calories burn"
                val={(() => {
                  if (String(count * 0.4).includes(".")) {
                    return (
                      String(count * 0.4).split(".")[0] +
                      "." +
                      String(count * 0.4)
                        .split(".")[1]
                        .substring(0, 1)
                    );
                  }

                  return count * 0.4;
                })()}
                progressbar={false}
              />

              <LiveDetailComponent
                text="Energy bar"
                val={energyMeter}
                progressbar={true}
              />

              <LiveDetailComponent
                text="Time"
                val={`${9 - minutes}:${60 - seconds}`}
                progressbar={false}
              />
            </div>
            {energyMeter === 20 && (
              <img
                src={EnergyMeter2}
                alt="Energy Meter"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: window.innerWidth > 992 ? "200px" : "150px",
                  height: window.innerWidth > 992 ? "193px" : "143px",
                  display: window.innerWidth <= 645 && "none",
                }}
              />
            )}
            {energyMeter === 0 && (
              <img
                src={EnergyMeter1}
                alt="Energy Meter"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: window.innerWidth > 992 ? "200px" : "150px",
                  height: window.innerWidth > 992 ? "193px" : "143px",
                  display: window.innerWidth <= 645 && "none",
                }}
              />
            )}
            {energyMeter === 40 && (
              <img
                src={EnergyMeter3}
                alt="Energy Meter"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: window.innerWidth > 992 ? "200px" : "150px",
                  height: window.innerWidth > 992 ? "193px" : "143px",
                  display: window.innerWidth <= 645 && "none",
                }}
              />
            )}
            {energyMeter === 60 && (
              <img
                src={EnergyMeter4}
                alt="Energy Meter"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: window.innerWidth > 992 ? "200px" : "150px",
                  height: window.innerWidth > 992 ? "193px" : "143px",
                  display: window.innerWidth <= 645 && "none",
                }}
              />
            )}
            {energyMeter === 80 && (
              <img
                src={EnergyMeter5}
                alt="Energy Meter"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: window.innerWidth > 992 ? "200px" : "150px",
                  height: window.innerWidth > 992 ? "193px" : "143px",
                  display: window.innerWidth <= 645 && "none",
                }}
              />
            )}
            {energyMeter === 100 && (
              <img
                src={EnergyMeter6}
                alt="Energy Meter"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: window.innerWidth > 992 ? "200px" : "150px",
                  height: window.innerWidth > 992 ? "193px" : "143px",
                  display: window.innerWidth <= 645 && "none",
                }}
              />
            )}
            <div
              style={{
                display: "flex",
                flexDirection: window.innerWidth > 576 ? "row" : "column",
                alignItems: "center",
                width: "100%",
                height:
                  (window.innerWidth > 577 && 600) ||
                  (window.innerWidth < 645 && window.innerWidth > 577 && 650) ||
                  (window.innerWidth <= 576 && window.innerHeight - 20),
                justifyContent: trainer ? "space-between" : 'center',
              }}
            >
              {
                !trainer && guide && (
                  <div style = {{ position: 'absolute', display: 'flex', flexDirection: 'row', 
                  width: "100%",
                  height:
                  window.innerWidth <= 576
                    ? (window.innerHeight / 2) - 10
                    : "100%",
                  minWidth: '63%',zIndex: 2 }}>

                    <div style={{display: 'flex', flexDirection: 'column', flex: 1, height:
                      window.innerWidth <= 576
                        ? (window.innerHeight / 2) - 10
                        : "100%",
                      minWidth: '63%', background: 'red', zIndex: 2}}>
                      <div style = {{ width: '60%', color: 'white', alignSelf: 'center', fontWeight: 700, fontSize:window.innerWidth > 576 ? 30 : 15, textAlign: 'center' }}>{ guide_text }</div>
                      <div style={{height: '100%', width: '50%',alignSelf: 'center',background: 'transperent', border: '3px solid white', margin: '0 10px'}}></div>
                    </div>
                    <div style={{flex: 1}}></div>
                  </div>
                )
              }
              <canvas
                id="output"
                style={{
                  maxWidth: "100%",
                  width: "auto",
                  height:
                    window.innerWidth <= 576
                      ? window.innerHeight / 2 - 10
                      : "100%",
                  minWidth: 416,
                  alignSelf: !trainer ? 'center' : '',
                  filter: !trainer && guide ? 'blur(5px)' : ''
                }}
              />
              <video
                id="video"
                playsInline
                width={"100%"}
                height={"auto"}
                style={{
                  visibility: "hidden",
                  transform: "scaleX(-1)",
                  display: "none",
                  objectFit: "contain",
                }}
              />
              {
                trainer && (
                  <div
                    style={{
                      // width: window.innerWidth > 576 ? "20%" : "40%",
                      height:
                        window.innerWidth <= 576 && window.innerHeight / 2 - 10,
                      // position: "absolute",
                      // right: 0,
                      // left: 0,
                      // bottom: 0,
                      // background: "red",
                    }}
                  >
                    <>
                      <Conference />
                    </>
                  </div>
                )
              }
            </div>
          </div>
          <div
            id="scatter-gl-container"
            className="text-center"
            style={{ display: "none" }}
          />
        </div>
      </div>
      {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div ref={controlsUI} />
        <div ref={statsUI} />
      </div> */}
    </div>
  );
}

// -webkit-transform: scaleX(-1);
// transform: scaleX(-1);
// visibility: hidden;
// width: auto;
// height: auto;
