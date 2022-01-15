

export default ({ getDates, day }) => (
    <div
        style={{
            display: "flex",
            flex: 6,
            flexDirection: "column",
            fontSize: 20,
            alignItems: "center",
        }}
    >
        <div
            style={{
                // width: 50,
                color: "#00F0FF",
                textAlign: "center",
            }}
        >
            {day}
        </div>

        {getDates().map((value) => {
            if (value === -1) {
                return <div style={{ height: 50, visibility: "collapse" }}>-1</div>;
            }

            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        maxWidth: 50,
                        height: 50,
                        borderRadius: 25,
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <div
                        className={value === new Date().getDate() && "bg1"}
                        style={{ borderRadius: "50%", width: 30 }}
                    >
                        <div style={{ textAlign: "center" }}>{value}</div>
                    </div>
                </div>
            );
        })}
    </div>
);
