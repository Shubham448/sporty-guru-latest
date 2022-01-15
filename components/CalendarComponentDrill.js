import { Row, Col } from "react-bootstrap";
import { BsPlayCircle } from "react-icons/bs";
import Star from "../assets/Images/star.png";
import StarUnfilled from "../assets/Images/Star 2.png";
import Img from 'next/image';

const CalendarComponentDrill = ({
    bgImg,
    val1,
    val2,
    val3,
    starsObtained,
    completed,
}) => {
    return (
        <div
            style={{
                marginBottom: 20,
                position: "relative",
            }}
        >
            <Img
                src={bgImg}
                alt="img"
                width={100}
                height={200}
                className="calendarImg"
            />
            <Row
                style={{
                    position: "absolute",
                    width: "100%",
                    height: 200,
                    margin: "0",
                    top: 0,
                }}
            >
                <Col
                    xs={6}
                    sm={6}
                    style={{
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <BsPlayCircle
                        color="white"
                        style={{
                            width: "50%",
                            height: "50%",
                            alignSelf: "center",
                            cursor: "pointer",
                        }}
                    />
                </Col>
                <Col
                    xs={6}
                    sm={6}
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",

                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        padding: 0,
                    }}
                >
                    <Row style={{ marginRight: 10 }}>
                        <Col style={{ margin: 0, padding: 0 }}>
                            {starsObtained >= 1 ? (
                                <Img src={Star} className="img-fluid" />
                            ) : (
                                <Img src={StarUnfilled} className="img-fluid" />
                            )}
                        </Col>
                        <Col style={{ margin: 0, padding: 0 }}>
                            {starsObtained >= 2 ? (
                                <Img src={Star} className="img-fluid" />
                            ) : (
                                <Img src={StarUnfilled} className="img-fluid" />
                            )}
                        </Col>
                        <Col style={{ margin: 0, padding: 0 }}>
                            {starsObtained >= 3 ? (
                                <Img src={Star} className="img-fluid" />
                            ) : (
                                <Img src={StarUnfilled} className="img-fluid" />
                            )}
                        </Col>
                        <Col style={{ margin: 0, padding: 0 }}>
                            {starsObtained >= 4 ? (
                                <Img src={Star} className="img-fluid" />
                            ) : (
                                <Img src={StarUnfilled} className="img-fluid" />
                            )}
                        </Col>
                        <Col style={{ margin: 0, padding: 0 }}>
                            {starsObtained === 5 ? (
                                <Img src={Star} className="img-fluid" />
                            ) : (
                                <Img src={StarUnfilled} className="img-fluid" />
                            )}
                        </Col>
                    </Row>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {completed && (
                            <div
                                style={{
                                    fontSize: typeof window !== 'undefined' && window.innerWidth > 576 ? 28 : 20,
                                    color: " rgba(255, 184, 0, 1)",
                                    fontWeight: 600,
                                    marginRight: 10,
                                    //textAlign: "right",
                                }}
                            >
                                Completed
                            </div>
                        )}
                        <div
                            style={{
                                //marginLeft: "auto",
                                color: "white",
                                fontSize: typeof window !== 'undefined' && window.innerWidth > 430 ? 15 : 11,
                            }}
                        >
                            <p style={{ margin: 0 }}> Set 1 = {val1} </p>
                            <p style={{ margin: 0 }}> Set 2 = {val2} </p>
                            <p style={{ margin: 0 }}> Set 3 = {val3} </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default CalendarComponentDrill;
