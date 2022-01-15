import React from "react";
import Col from "react-bootstrap/Col";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import EnergyBar from "../assets/Images/EnergyBar.svg";

export default ({ text, val, progressbar, extra_styles, sizes }) => {

  return (
    <div
      className={" align-items-center"}
      style={{
        position: "relative",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        //   borderRadius: 50,
        //   border: "solid 1px black",
        //padding: window.innerWidth > 576 && "20px 0px",
        marginLeft: window.innerWidth <= 576 && 10,
        marginBottom: window.innerWidth >= 768 && 10,
        ...extra_styles
      }}
    >
      {/* <div style = {{ display: 'flex', flexDirection: 'column', width: window.innerWidth <= 768 && 40 || 70, height: window.innerWidth <= 768 && 40 || 70, borderRadius: 35, background: 'linear-gradient(#754B3D, #754B3D, #AAAAAA)', color: 'white', textAlign: 'center', justifyContent: 'center' }}>
                { val }
            </div> */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width:
            window.innerWidth <= 576 ? 40 : window.innerWidth <= 878 ? 55 : 55,
          height:
            window.innerWidth <= 576 ? 40 : window.innerWidth <= 878 ? 55 : 55,
          borderRadius: 50,
          background: "white",
          justifyContent: "center",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          ...sizes
        }}
      >
        {progressbar && (
          <CircularProgressbar
            value={val}
            className="text-center justify-content-center p-0"
            styles={buildStyles({
              pathColor: "#EE6000",
              strokeLinecap: "round",
            })}
          />
        )}

        <div
          style={{
            position: "absolute",
            fontSize: (window.innerWidth > 768 && 18) || 13,
            color: "black",
            zIndex: 1,
            alignSelf: "center",
          }}
        >
          <strong style = {{ fontSize: sizes ? 30 : 16 }}>
            {text !== "Energy bar" && `${val}${(progressbar && "%") || ""}`}
          </strong>
          {text === "Energy bar" && (
            <img
              src={EnergyBar}
              style={{
                height:
                  window.innerWidth > 870
                    ? "50%"
                    : window.innerWidth > 576
                    ? 35
                    : 28,
                width: "auto",
              }}
              alt={`${val}${(progressbar && "%") || ""}`}
            />
          )}
        </div>
      </div>

      <div
        className={"text-center text-white"}
        style={{
          fontWeight: 500,
          fontSize: window.innerWidth > 576 ? 17 : 12,
          width: "min-content",
          marginTop: 7,
        }}
      >
        {text}
      </div>
    </div>
  );
};
