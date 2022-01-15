import { useState, useEffect, useRef } from "react";
import HeaderComponent from '../components/HeaderComponent';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";
import { useTimer } from 'react-timer-hook';
import { v4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { selectIsConnectedToRoom, useHMSActions, useHMSStore, selectIsLocalAudioEnabled, selectIsLocalVideoEnabled } from '@100mslive/hms-video-react';
import Conference from '../components/100ms/Conference';
import CameraRenderer from "../components/CameraRenderer";
import LiveComponentActionPlanCard from "../components/LiveComponentActionPlanCard";
import endCall from "../assets/livetracking_img/end-call.svg";
import enableCameraImg from "../assets/livetracking_img/enable-camera.svg"
import disableCameraImg from "../assets/livetracking_img/disable-camera.svg"
// import greenMike from "../assets/livetracking_img/greenmike.svg";
import { useRouter } from "next/router";

class Saver {
    constructor() {
        this.frames = [];
    }
}

var data = {
    complete: false,
    count: 0,
    countTime: 0,
    energy: false,
    exercise: [],
    guide_text: 'Hi, welcome to AI workout session',
    guide: true,
    partial: false,
    showMessage: true,
    start: true,
    visible: 0,
}

var data_p = {
    prev: 0,
    curr: 0,
    last_angle: null,
    score: 0
}

var message = '';



const calculate_energy = () => {
    if (new Date().getSeconds() < data.countTime || 100 - (new Date().getSeconds() - data.countTime) * 20 <= 0 || !data.energy) {
        return 0;
    }

    if (100 - (new Date().getSeconds() - data.countTime) * 20 <= 20) {
        data.energy = false
    }

    return 100 - (new Date().getSeconds() - data.countTime) * 20;
}

export default () => {
    const audio = useHMSStore(selectIsLocalAudioEnabled);
    const video = useHMSStore(selectIsLocalVideoEnabled);

    const saver = useRef(new Saver());
    //console.log(saver.current);

    const { state: drillState } = useLocation();

    data.exercise = drillState?.drills;

    const navigate = useRouter();
    console.log("data: ", drillState);
    const exercise = drillState?.drills?.filter((drill) => {
        return parseInt(drill.date.substring(8,)) === new Date().getDate();
    })
    //console.log('exercise: ', drillState, typeof(new Date().getDate()));
    // if (drillState === null && typeof window !== 'undefined') {
    //     navigate.push('/action_plan')
    // }

    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();

    const getToken = async () => {
        const response = await fetch(`https://prod-in.100ms.live/hmsapi/hyperfit.app.100ms.live/api/token`, {
            method: 'POST',
            body: JSON.stringify({
                user_id: `${v4()}`,
                room_id: '61cdc2c28d6d5fd351cbd711',
                role: 'trainer'
            }),
        })
        const { token } = await response.json();

        hmsActions.join({
            // userName: [...localStorage.getItem('phoneNumber')].map((value, index) => (index > 1 && index < 8) ? '*' : value).reduce((prev, value) => prev + value),
            authToken: token
        });
    }
    useEffect(() => {
        window.onunload = () => {
            if (isConnected) {
                hmsActions.leave();
            }
        };
    }, [hmsActions, isConnected]);

    useEffect(() => {
        getToken();
        // if (drillState?.trainer) {
        //     getToken()
        // }

    }, [])

    const [enableCamera, setEnableCamera] = useState(true);
    const [mikeMuted, setMikeMuted] = useState(false);
    console.log(audio, video);
    const changeAudioState = async () => {
        setMikeMuted(!mikeMuted)
        await hmsActions.setLocalAudioEnabled(!audio);
    }
    const changeVideoState = async () => {
        setEnableCamera(!enableCamera)
        await hmsActions.setLocalVideoEnabled(!video);
    }
    const endCallFun = () => {
        if (isConnected)
            hmsActions.leave();
    }
    // return (
    //   <div className = 'Container'>
    //     <Header />
    //     {isConnected ? (
    //       <>
    //         <Conference />
    //         <Footer/>
    //       </>
    //     ) : (
    //       <JoinForm />
    //     )}
    //   </div>
    // );

    const time = new Date()

    time.setSeconds(time.getSeconds() + 600)

    const { seconds, minutes } = useTimer({ expiryTimestamp: time })

    return (
        <Stack className="Container">
            <HeaderComponent />
            <Container fluid style={{ padding: window.innerWidth >= 768 ? '0px 80px' : '0px 0px' }}>

                <Row className="mt-2" style={{ padding: window.innerWidth >= 768 ? '0px 0px' : '0px 40px', margin: window.innerWidth < 576 && 0 }}>
                    <Col

                        className="px-0 text-center"
                        md={8}
                        xs={12}
                        // md={12}
                        // xs={12}
                        // sm={12}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 5,
                            border: "solid 0px white",
                            background: "#4A4A4A",
                            height: 'auto',
                            marginBottom: window.innerWidth <= 576 && 11,
                            justifyContent: 'space-evenly',
                            overflow: 'hidden'
                        }}
                    >
                        <div>
                           <CameraRenderer data={data} data_p={data_p} no_guidance={true} />
                        </div>
                        <div className="mb-2" style={{ display: 'flex', width: window.innerWidth > 576 ? '25%' : '80%', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', userSelect: 'none' }}>
                            {/* <img src={greenMike} alt="Mute" height={40}  style={{cursor: 'pointer'}}/> */}
                            <div onClick={() => changeAudioState()}>
                                <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 40, cursor: 'pointer' }}>
                                    <g filter="url(#filter0_d_3_582)">
                                        <circle cx="31.5" cy="27.5" r="27.5" fill={!mikeMuted ? "#1EBB4A" : "#FF2424"} />
                                        <path d="M32 31.9474C34.6086 31.9474 36.6986 29.8316 36.6986 27.2105L36.7143 17.7368C36.7143 15.1158 34.6086 13 32 13C29.3914 13 27.2857 15.1158 27.2857 17.7368V27.2105C27.2857 29.8316 29.3914 31.9474 32 31.9474ZM40.3286 27.2105C40.3286 31.9474 36.3371 35.2632 32 35.2632C27.6629 35.2632 23.6714 31.9474 23.6714 27.2105H21C21 32.5947 25.2743 37.0474 30.4286 37.8211V43H33.5714V37.8211C38.7257 37.0632 43 32.6105 43 27.2105H40.3286Z" fill="white" />
                                        <line x1="23.7772" y1="13.3708" x2="40.7772" y2="34.3708" stroke="#FF2424" stroke-width="2" style={{ display: !mikeMuted && 'none' }} />
                                        <line x1="21.3864" y1="12.6826" x2="44.3864" y2="40.6826" stroke="white" style={{ display: !mikeMuted && 'none' }} />
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_3_582" x="0" y="0" width="63" height="63" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset dy="4" />
                                            <feGaussianBlur stdDeviation="2" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_582" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_582" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                            {enableCamera ? <img src={enableCameraImg} alt="Start Video" height={35} onClick={() => changeVideoState()} style={{ cursor: 'pointer' }} />
                                : <img src={disableCameraImg} alt="Start Video" height={36} onClick={() => changeVideoState()} style={{ cursor: 'pointer' }} />}
                            <img src={endCall} alt="End Session" height={40} onClick={() => endCallFun()} style={{ cursor: 'pointer' }} />
                            <div className="mx-1 mt-2">
                            </div>
                        </div>
                    </Col>

                    <Col md={4} xs={12} style={{ padding: 0 }}>
                        <Stack>
                            {window.innerWidth >= 768 && (<div className="mx-2" style={{ width: window.innerWidth > 576 ? 400 : window.innerWidth - 10, borderRadius: 10, boxShadow: '1px 1px 1px black', padding: '20px 20px', backgroundColor: 'rgba(148, 148, 148, 1)' }}>
                                <div style={{ color: 'white', alignSelf: 'center', textAlign: 'center', fontSize: 19 }}>Overall data</div>
                                <hr style={{ height: 2, width: '100%', color: 'white', margin: '5px 0px' }} />

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                    <div style={{ color: 'white', alignSelf: 'center', textAlign: 'center' }}>Inside frame</div>
                                    <div style={{ color: 'white', alignSelf: 'center', textAlign: 'center' }}>{`${data.visible}%`}</div>
                                </div>

                                <div style={{ width: '100%', height: 2, backgroundColor: 'white', marginTop: 10 }}>
                                    <div style={{ width: `${data.visible}%`, height: 2, backgroundColor: 'white', marginTop: 10, background: '#FF6601' }} />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                    <div style={{ color: 'white', alignSelf: 'center', textAlign: 'center' }}>Energy bar</div>
                                    <div style={{ color: 'white', alignSelf: 'center', textAlign: 'center' }}>{`${calculate_energy()}%`}</div>
                                </div>

                                <div style={{ width: '100%', height: 2, backgroundColor: 'white', marginTop: 10 }}>
                                    <div style={{ width: `${calculate_energy()}%`, height: 2, backgroundColor: 'white', marginTop: 10, background: '#FF6601' }} />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                    <div style={{ color: 'white', alignSelf: 'center', textAlign: 'center' }}>Reps</div>
                                    <div style={{ color: 'white', alignSelf: 'center', textAlign: 'center' }}>{data.count}</div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                    <div style={{ color: 'white', alignSelf: 'center', textAlign: 'center' }}>Calories burnt</div>

                                    <div style={{ color: 'white', alignSelf: 'center', textAlign: 'center' }}>{(() => {
                                        if (String(data.count * 0.4).includes(".")) {
                                            return (
                                                String(data.count * 0.4).split(".")[0] +
                                                "." +
                                                String(data.count * 0.4)
                                                    .split(".")[1]
                                                    .substring(0, 1)
                                            );
                                        }
                                        return data.count * 0.4;
                                    })()}</div>

                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

                                    <div style={{ color: 'white', alignSelf: 'center', textAlign: 'center' }}>Time</div>

                                    <div style={{ color: 'white', alignSelf: 'center', textAlign: 'center' }}>{`${9 - minutes}:${60 - seconds}`}</div>

                                </div>

                            </div>)}

                            <div style={{ width: window.innerWidth > 576 ? 400 : "100%", marginTop: 25, borderRadius: 10, overflow: 'hidden', marginLeft: window.innerWidth > 576 ? '10px' : 0 }}>
                                <>
                                    <Conference liveScreencall={true} />
                                </>
                            </div>

                        </Stack>
                    </Col>
                </Row>
            </Container>

            <Container fluid style={{ padding: '0 60px', marginTop: 20 }}>
                <h1 style={{ color: 'white', textDecoration: 'underline' }}>Related Exercise</h1>
                <div
                    className="ActionPlanData mt-3"
                    style={{
                        overflowX: "scroll",
                        zIndex: 1,
                        display: "flex",
                        alignItems: "center",
                        width: '100%'
                    }}
                >
                    {data.exercise &&
                        data.exercise.map((val, index) => {
                            return (
                                <LiveComponentActionPlanCard
                                    img={val.thumbnail_URL}
                                    exercize_name={val.name}
                                    video_URL={val.video_URL}
                                    //callback={(video_URL) => setVideo("abc")}
                                    key={index}
                                    LiveTrackingScreen={false}
                                />
                            );
                        })}
                </div>
            </Container>
        </Stack>
    );
};