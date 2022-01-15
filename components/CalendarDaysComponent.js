

export default ({ getDate, selected, onClick, day }) => (
    <div
        className={selected && "bg4"}
        style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            color: "white",
            alignItems: "center",
            backgroundColor: selected && "#4A4A4A",
            cursor: "pointer",
            borderTopLeftRadius: typeof window !== 'undefined' && window.innerWidth <= 768 && 10,
            borderTopRightRadius: typeof window !== 'undefined' && window.innerWidth <= 768 && 10,

            padding:
                typeof window !== 'undefined' && window.innerWidth > 576
                    ? "10px 10px 20px 10px"
                    : typeof window !== 'undefined' && window.innerWidth > 330
                        ? "2px 3px 5px 3px"
                        : 0,
        }}
        onClick={onClick}
    >
        {day}

        <div
            className="bg1"
            style={
                typeof window !== 'undefined' && window.innerWidth >= 768
                    ? {
                        display: "flex",
                        width: 50,
                        height: 50,
                        marginTop: 5,
                        marginBottom: 5,
                        borderRadius: 25,
                        alignItems: "center",
                        justifyContent: "center",
                    }
                    : {
                        display: "flex",
                        width: 30,
                        height: 30,
                        marginTop: 5,
                        marginBottom: 5,
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                    }
            }
        >
            <div
                className="bg2"
                style={
                    typeof window !== 'undefined' && window.innerWidth >= 768
                        ? {
                            display: "flex",
                            width: 44,
                            height: 44,
                            borderRadius: 22,
                            color: "white",
                            alignItems: "center",
                            justifyContent: "center",
                        }
                        : {
                            display: "flex",
                            width: 25,
                            height: 25,
                            borderRadius: "50%",
                            color: "white",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "small",
                        }
                }
            >
                {getDate()}
            </div>
        </div>
    </div>
);