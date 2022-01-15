import { BsPlayCircle } from "react-icons/bs";
import Bulb from "../assets/Images/Bulb.svg";
import Dumbell from "../assets/Images/Dumbell.svg";
import GoLive from "../assets/Images/Go-Live.png";
import { Col, Row } from "react-bootstrap";
import Sets from "../assets/Images/sets.svg";

export default ({
    name,
    description,
    thumbnail_URL,
    completed,
    type,
    video_URL,
    onClick,
    callback,
    min_Sets,
    max_Sets,
    min_Reps,
    max_Reps,
    live_callback
}) => {
    //console.log("This is drill component", thumbnail_URL);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 20,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10,
            }}
        >
            <Row
                style={{
                    // position: "absolute",
                    display: "flex",
                    width: "100%",
                    // height: 200,
                    flexDirection: "row",
                    alignSelf: "center",
                    color: "white",
                    padding: 0,
                }}
            >
                <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={6}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        height: 200,
                        border: "3px solid gray",
                        padding: 0,
                    }}
                >
                    <img
                        // className="img-blur"
                        style={{ width: "100%", height: 200, objectFit: "cover" }}
                        src={thumbnail_URL}
                    />
                    <BsPlayCircle
                        style={{
                            alignSelf: "center",
                            marginBottom: 20,
                            cursor: "pointer",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                        size={70}
                        color="white"
                        onClick={() => {
                            console.log("Called");
                            callback(video_URL);
                        }}
                    />
                </Col>

                <Col
                    xs={12}
                    sm={12}
                    md={6}
                    style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        color: "white",
                        fontSize: 12,
                        marginTop: window.innerWidth < 991 ? 20 : 0,
                        height: 200,
                        border: "1px solid black",
                        borderLeft: window.innerWidth > 768 ? "none" : "1px solid black",
                        background:
                            "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.58) )",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div style={{ width: "20px", height: "20px" }}></div>
                        <div
                            style={{
                                fontSize:
                                    window.innerWidth > 768
                                        ? 20
                                        : 18,
                                maxWidth: 160,
                                width: 160,
                                height: "maxContent",
                                marginTop: 5,
                            }}
                        >
                            {name}
                        </div>
                        <div
                            className="technique-btn"
                            data-tooltip={description}
                            style={{ position: "relative" }}
                        >
                            <img
                                src={Bulb}
                                width={window.innerWidth > 400 ? 35 : 27}
                                height={window.innerHeight > 400 ? 43 : 37}
                                alt="Bulb"
                                style={{
                                    marginTop: 10,
                                    cursor: "pointer",
                                }}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                // width: "100%",
                                // background: "red",
                                alignItems: "center",
                                justifyContent: "space-around",
                            }}
                        >
                            <img
                                src={Dumbell}
                                alt="Sets"
                                width={41}
                                height={32}
                                style={{
                                    cursor: "pointer",
                                    // marginRight: "5px",
                                }}
                            />
                            <span style={{ fontSize: window.innerWidth > 300 ? 17 : 13 }}>
                                {min_Reps} - {max_Reps}
                            </span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                // width: "100%",
                                // background: "red",
                                alignItems: "center",
                                justifyContent: "space-around",
                            }}
                        >
                            <img
                                src={Sets}
                                alt="Sets"
                                height={23}
                                width={30}
                                style={{
                                    cursor: "pointer",
                                    marginRight: "10px",
                                }}
                            />
                            <span style={{ fontSize: window.innerWidth > 300 ? 17 : 13 }}>
                                {min_Sets} - {max_Sets}
                            </span>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {type === 0 && (
                            <button
                                onClick={live_callback}
                                className="button"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: 23,
                                    textAlign: "center",
                                    paddingTop: 15,
                                    paddingBottom: 15,
                                    borderRadius: 20,
                                    color: "white",
                                    borderWidth: 0,
                                    marginBottom: 10,
                                    width: window.innerWidth > 300 ? 147 : 117,
                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                }}
                            >
                                <img src={GoLive} style={{ marginLeft: 16 }} />
                                <div
                                    style={{
                                        marginRight: "auto",
                                        fontSize: 15,
                                        margin: "5px 0 5px 10px",
                                    }}
                                >
                                    Go Live
                                </div>
                            </button>
                        )}

                        <button
                            className={(completed && "bg8") || "button"}
                            style={{
                                alignSelf: "center",
                                paddingTop: 7,
                                paddingBottom: 7,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderRadius: 20,
                                color: "white",
                                borderWidth: 0,
                                marginBottom: 24,
                                width: window.innerWidth > 300 ? 180 : 150,
                                fontSize: 13,
                                padding: "5px 0",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            }}
                            onClick={onClick}
                        >
                            {(completed && "Completed") || "Mark as done"}
                        </button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
