import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import WeightTrackerComponentChart from "./WeightTrackerComponentChart";
import { months, week } from "./data.json";

const WeightTrackerComponent = () => {
    const [weight, setWeight] = useState(50);
    const changeWeight = (e) => {
        console.log(e.target.value);
        setWeight(e.target.value);
    };
    return (
        <Container
        // style={{
        //   width: "100%",
        //   maxWidth: "100%",
        // }}
        >
        <Row>
            <Col
            sm={12}
            md={12}
            lg={6}
            style={{
                fontFamily: "Raleway, sans-serif",
                color: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                margin:
                typeof window !== 'undefined' && window.innerWidth > 992
                    ? "148px 40px 40px -40px"
                    : "100px 40px 40px 0",
            }}
            >
            <h2
                style={{
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: 48,
                textAlign: "center",
                color: "#FFFFFF",
                marginBottom: 53,
                }}
            >
                Daily Weight Tracker
            </h2>
            <h2
                style={{
                fontStyle: "normal",
                fontWeight: "normal",
                fontWize: 48,
                textAlign: "center",
                fontSize: typeof window !== 'undefined' && window.innerWidth > 768 ? 36 : 30,
                color: "#FFFFFF",
                marginBottom: 44,
                }}
            >
                {new Date().getDate()}th {months[new Date().getMonth()].name}&nbsp;
                {new Date().getFullYear()}, <br />
                {week[new Date().getDay()].name}
            </h2>

            <div
                style={{
                display: "flex",
                flexDirection: "column",
                width: typeof window !== 'undefined' && window.innerWidth > 430 ? 310 : 290,
                height: 268,
                alignItems: "center",
                justifyContent: "space-around",
                background: "#4A4A4A",
                boxShadow:
                    "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(255, 255, 255, 0.15)",
                borderRadius: 20,
                color: "#FFFFFF",
                marginBottom: typeof window !== 'undefined' && window.innerWidth > 991 ? 194 : 50,
                }}
            >
                <p
                style={{
                    fontSize: 24,
                    color: "#FFFFFF",
                    textAlign: "center",
                    margin: "26px 0 0 0",
                    //   line-height: 28px;
                }}
                >
                Log Weight
                </p>
                <input
                type="text"
                spellCheck="false"
                autoComplete="off"
                placeholder="Type in current weight"
                style={{
                    background: "rgba(0, 0, 0, 0.35)",
                    boxShadow: "inset 0px 2px 3px #000000",
                    borderRadius: 20,
                    width: 244,
                    height: 40,
                    fontFamily: "Roboto Slab",
                    color: "#FFFFFF",
                    textAlign: "center",
                    border: "none",
                }}
                />
                <div
                style={{
                    display: "flex",
                    width: "70%",
                    alignItems: "center",
                    justifyContent: "space-around",
                }}
                >
                <p
                    style={{
                    fontWeight: 300,
                    fontSize: 14,
                    color: "#FFFFFF",
                    margin: "0",
                    }}
                >
                    (in kgs)
                </p>
                <div
                    onClick={() => setWeight(Math.max(weight - 1, 0))}
                    style={{
                    background:
                        "linear-gradient(180deg, #FFB800 0%, #FF5C00 100%)",
                    borderRadius: "50%",
                    color: "#FFFFFF",
                    width: 24,
                    height: 24,
                    textAlign: "center",
                    cursor: "pointer",
                    }}
                >
                    -
                </div>
                <input
                    type="text"
                    spellCheck="false"
                    autoComplete="off"
                    value={weight}
                    onChange={(e) => changeWeight(e)}
                    style={{
                    background: "rgba(0, 0, 0, 0.35)",
                    boxShadow: "inset 0px 2px 3px #000000",
                    borderRadius: 20,
                    width: 48,
                    color: "#FFFFFF",
                    textAlign: "center",
                    border: "none",
                    }}
                />

                <div
                    onClick={() => {
                    setWeight(weight + 1);
                    console.log("+ clicked", weight);
                    }}
                    style={{
                    background:
                        "linear-gradient(180deg, #FFB800 0%, #FF5C00 100%)",
                    borderRadius: "50%",
                    color: "#FFFFFF",
                    width: 24,
                    height: 24,
                    textAlign: "center",
                    cursor: "pointer",
                    }}
                >
                    +
                </div>
                </div>
                <p
                style={{
                    fontWeight: 300,
                    fontSize: 14,
                    color: "#FFFFFF",
                    margin: "0 0 25px 0",
                }}
                >
                Tip ( time to weigh )
                </p>
                <button
                style={{
                    background: "linear-gradient(180deg, #FFB800 0%, #FF5C00 100%)",
                    width: 83,
                    height: 43,
                    borderRadius: 20,
                    fontSize: 18,
                    color: "#FFFFFF",
                    border: "none",
                    margin: "0 0 25px 0",
                }}
                >
                Done
                </button>
            </div>
            </Col>
            <Col
            style={{
                //   display: "flex",
                //   flexDirection: "column",
                //   alignItems: "center",
                padding:
                typeof window !== 'undefined' && window.innerWidth > 768
                    ? "78px 20px 127px 20px"
                    : "30px 20px 127px 20px",
                height: "740px",
                marginTop: typeof window !== 'undefined' && window.innerWidth > 991 ? 70 : 0,
            }}
            >
            <div
                style={{
                marginLeft: typeof window !== 'undefined' && window.innerWidth < 576 ? "-10px" : "0",
                marginBottom: "20px",
                color: "white",
                fontSize: typeof window !== 'undefined' && window.innerWidth > 576 ? 20 : 20,
                }}
            >
                ( kgs )
            </div>
            <WeightTrackerComponentChart />
            </Col>
        </Row>
        </Container>
    );
};

export default WeightTrackerComponent;
