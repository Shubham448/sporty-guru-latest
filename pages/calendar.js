import { useState } from "react";
import { months, week } from "../components/data.json";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Drill_img1 from "../assets/Images/drill_image2.png";
import Drill_img2 from "../assets/Images/drill_image.png";
import Fire from "../assets/Images/Vector 28.svg";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import HeaderComponent from "../components/HeaderComponent";
import CalendarDatesComponent from "../components/CalendarDatesComponent";
import CalendarDaysComponent from "../components/CalendarDaysComponent";
import CalendarComponentDrill from "../components/CalendarComponentDrill";
import WeightTrackerComponent from "../components/WeightTrackerComponent";
import Img from 'next/Image';

export default () => {
    const [selected, setSelected] = useState(0);
    const [type, setType] = useState(0);

    const getDate = (day) => {
        if (new Date().getDate() - new Date().getDay() + day <= 0) {
            return (
                months[new Date().getMonth() - 1].days +
                (new Date().getDate() - new Date().getDay() + day)
            );
        }

        return new Date().getDate() - new Date().getDay() + day;
    };

    const getDates = (day) => {
        var dates = [];

        let i = new Date().getDate() - new Date().getDay() + day;

        if (i <= 0) {
            dates.push(-1);

            i += 7;
        }
        // else if (i > months[new Date().getMonth()].days) {
        //   dates.push(-1);
        // }

        while (i > 0) {
            i -= 7;
        }

        i += 7;

        if (day - i + 1 < 0) {
            dates.push(-1);
        }

        for (; i <= months[new Date().getMonth()].days; i += 7) {
            dates.push(i);
        }

        return dates;
    };

    return (
        <div className="Container">
            <HeaderComponent />

            <Row style={{
                    margin:
                        typeof window !== 'undefined' && window.innerWidth > 768 ? 40 : typeof window !== 'undefined' && window.innerWidth >= 576 ? 20 : 7,
                }}
            >
                <Col lg={4} sm={12} style={{ color: "white", fontSize: 40, marginRight: 20 }}>
                    Calendar
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 56,
                            fontSize: 30,
                            fontWeight: 300,
                        }}
                    >
                        <div style={{ flex: 1 }}>{months[new Date().getMonth()].name}</div>

                        <BsChevronLeft
                            style={{ marginTop: 10, cursor: "pointer" }}
                            size={20}
                        />

                        <BsChevronRight
                            style={{ marginTop: 10, cursor: "pointer" }}
                            size={20}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 30,
                            marginBottom: 40,
                        }}
                    >

                        <CalendarDatesComponent getDates={() => getDates(0)} day="S" />
                        <CalendarDatesComponent getDates={() => getDates(1)} day="M" />
                        <CalendarDatesComponent getDates={() => getDates(2)} day="T" />
                        <CalendarDatesComponent getDates={() => getDates(3)} day="W" />
                        <CalendarDatesComponent getDates={() => getDates(4)} day="T" />
                        <CalendarDatesComponent getDates={() => getDates(5)} day="F" />
                        <CalendarDatesComponent getDates={() => getDates(6)} day="S" /> 

                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: 20,
                            backgroundColor: "#4A4A4A",
                            boxShadow: "2px 4px 6px black",
                            borderRadius: 20,
                            textAlign: "center",
                            fontSize: 16,
                            fontWeight: 300,
                            paddingBottom: 20,
                            marginBottom: typeof window !== 'undefined' && window.innerWidth > 768 ? "110px" : "50px",
                        }}
                    >
                        <div
                            style={{
                                marginTop: 20,
                                color: "white",
                                fontSize: 35,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                alignSelf: "center",
                                textAlign: "center",
                                fontWeight: "normal",
                            }}
                        >
                            3 day streak&nbsp;
                            <Img src={Fire} alt="fire" />
                        </div>
                        You’re doing great! Come back tomorrow to keep your.
                    </div>
                </Col>

                <Col
                    style={{
                        marginLeft: typeof window !== 'undefined' && window.innerWidth >= 992 && 40,
                        marginTop: typeof window !== 'undefined' && window.innerWidth < 992 && 40,
                        marginBottom: typeof window !== 'undefined' && window.innerWidth < 992 && 70,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flex: 1,
                            flexDirection: "row",
                            marginLeft: 16,
                            marginRight: 20,
                        }}
                    >
                        <CalendarDaysComponent
                            getDate={() => getDate(0)}
                            selected={selected === 0}
                            onClick={() => setSelected(0)}
                            day={week[0].name.substr(0, 3)}
                        />

                        <CalendarDaysComponent
                            getDate={() => getDate(1)}
                            selected={selected === 1}
                            onClick={() => setSelected(1)}
                            day={week[1].name.substr(0, 3)}
                        />

                        <CalendarDaysComponent
                            getDate={() => getDate(2)}
                            selected={selected === 2}
                            onClick={() => setSelected(2)}
                            day={week[2].name.substr(0, 3)}
                        />

                        <CalendarDaysComponent
                            getDate={() => getDate(3)}
                            selected={selected === 3}
                            onClick={() => setSelected(3)}
                            day={week[3].name.substr(0, 3)}
                        />

                        <CalendarDaysComponent
                            getDate={() => getDate(4)}
                            selected={selected === 4}
                            onClick={() => setSelected(4)}
                            day={week[4].name.substr(0, 3)}
                        />

                        <CalendarDaysComponent
                            getDate={() => getDate(5)}
                            selected={selected === 5}
                            onClick={() => setSelected(5)}
                            day={week[5].name.substr(0, 3)}
                        />

                        <CalendarDaysComponent
                            getDate={() => getDate(6)}
                            selected={selected === 6}
                            onClick={() => setSelected(6)}
                            day={week[6].name.substr(0, 3)}
                        />
                    </div>

                    <div style={{ display: "flex", flex: 3, flexDirection: "column" }}>
                        <div
                            style={{
                                display: "flex",
                                flex: 1,
                                flexDirection: "column",
                                backgroundColor: "#4A4A4A",
                                boxShadow: "1px 1px 1px black",
                                borderRadius: 20,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginTop: typeof window !== 'undefined' && window.innerWidth > 768 ? 20 : 10,
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flex: 1,
                                        //marginRight: 20,
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <div
                                        onClick={() => setType(0)}
                                        style={{
                                            padding:
                                                typeof window !== 'undefined' && window.innerWidth > 768
                                                    ? "7px 45px 7px 45px"
                                                    : "3px 10px 3px 10px",
                                            borderTopLeftRadius: typeof window !== 'undefined' && window.innerWidth > 768 ? 20 : 10,
                                            borderTopRightRadius: typeof window !== 'undefined' && window.innerWidth > 768 ? 20 : 10,
                                            color: "white",
                                            //alignSelf: "flex-end",
                                            fontSize: typeof window !== 'undefined' && window.innerWidth > 768 ? 30 : 16,
                                            cursor: "pointer",
                                            background: type === 0 && "#111111",
                                        }}
                                    >
                                        Drill
                                    </div>
                                </div>

                                <div
                                    onClick={() => setType(1)}
                                    style={{ display: "flex", flex: 1 }}
                                >
                                    <div
                                        style={{
                                            padding:
                                                typeof window !== 'undefined' && window.innerWidth > 768
                                                    ? "7px 45px 7px 45px"
                                                    : "3px 10px 3px 10px",
                                            borderTopLeftRadius: typeof window !== 'undefined' && window.innerWidth > 768 ? 20 : 10,
                                            borderTopRightRadius: typeof window !== 'undefined' && window.innerWidth > 768 ? 20 : 10,
                                            color: "white",
                                            fontSize: typeof window !== 'undefined' && window.innerWidth > 768 ? 30 : 16,
                                            cursor: "pointer",
                                            background: type === 1 && "#111111",
                                        }}
                                    >
                                        Diet
                                    </div>
                                </div>
                            </div>

                            <div
                                className="bg5"
                                style={{
                                    display: "flex",
                                    flex: 1,
                                    flexDirection: "column",
                                    marginLeft:
                                        typeof window !== 'undefined' && window.innerWidth >= "992px"
                                            ? 40
                                            : typeof window !== 'undefined' && window.innerWidth >= 430
                                                ? 20
                                                : 10,
                                    marginRight:
                                        typeof window !== 'undefined' && window.innerWidth >= "992px"
                                            ? 40
                                            :typeof window !== 'undefined' && window.innerWidth >= 430
                                                ? 20
                                                : 10,
                                    // marginBottom: 20,
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    //overflow: "hidden",
                                    padding:
                                    typeof window !== 'undefined' && window.innerWidth > 430 ? "3% 3% 0 3%" : "5% 5% 0 5%",
                                    overflowY: "scroll",
                                    maxHeight: typeof window !== 'undefined' && window.innerWidth > 768 ? 470 : 300,
                                    minHeight: typeof window !== 'undefined' && window.innerWidth > 768 ? 470 : 300,
                                }}
                            >
                                {type === 0 && (
                                    <>
                                        <CalendarComponentDrill
                                            bgImg={Drill_img1}
                                            val1={12}
                                            val2={12}
                                            val3={8}
                                            starsObtained={4}
                                            completed={true}
                                        />
                                        <CalendarComponentDrill
                                            bgImg={Drill_img2}
                                            val1={12}
                                            val2={12}
                                            val3={8}
                                            starsObtained={3}
                                            completed={true}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <hr
                style={{
                    color: "rgba(229, 229, 229, 0.35)",
                    width: "75%",
                    margin: "auto",
                }}
            />
            <WeightTrackerComponent />
        </div>
    );
};
