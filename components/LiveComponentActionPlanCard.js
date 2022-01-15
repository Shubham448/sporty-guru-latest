import Trophy from "../assets/livetracking_img/Trophy.png";
import tick from "../assets/livetracking_img/Tick.png";

const LiveScreenActionPlanCard = ({
    img,
    exercize_name,
    callback,
    video_URL,
    key,
    LiveTrackingScreen,
    exercise_completed
}) => {
    return (
        <div
        style={{
            padding: 10,
            position: "relative",
            width: !LiveTrackingScreen ? 280 : 160,
            //marginRight: window.innerWidth < 576 && 10,
        }}
        className="stacked"
        onClick={() => {
            //callback(video_URL);
        }}
        >

        <img src={Trophy} alt={Trophy} className={exercise_completed && "animateTrophy"} style={{width: 40, height: 40, position: 'absolute', top: -10, left: -10, zIndex: 3, display: !exercise_completed && 'none'}}/>

        <div className={exercise_completed && "ActionPlanCard"} style={{width: 'max-content', height: 'max-content', padding: 0, position: 'relative'}}>
            <img
                src={img}
                alt={exercize_name}
                style={{
                width: !LiveTrackingScreen ? 260 : 140,
                height: !LiveTrackingScreen ? 200 : 80,
                border: "2px solid white",
                borderBottom: "none",
                borderRadius: 5,
                objectFit: "cover",
                overflow: "hidden",
                }}
            />
            {/* <img className="ActionPlanCard" src={tick} style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, zIndex: 3, height: 40, width: 'auto', margin: 'auto', opacity: 1}}/> */}
        </div>

        <div
            style={{
            // position: "absolute",
            // bottom: 6,
            // left: 11,
            // right: 11,
            fontSize: !LiveTrackingScreen ? 25 : 17,
            fontWeight: 700,
            color: "white",
            background: !LiveTrackingScreen ? 'transperent' :
                "linear-gradient(0deg, #000000 9.46%, rgba(255, 255, 255, 0) 100%)",
            paddingBottom: 4,
            marginTop: "auto",
            width: "100%",
            marginLeft: 1,
            marginRight: 2,
            // marginBottom: "10px",
            }}
        >
            {exercize_name}
        </div>
        </div>
    );
};

export default LiveScreenActionPlanCard;
