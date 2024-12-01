function init_charts() {
    try {
        // Init tokenomics chart
        init_tokenomics_chart();
    } catch (e) {
        // console.error(e);
    }
}

function init_tokenomics_chart() {
    try {
        // Vars
        var ctx = document.getElementById("tokenomics_chart").getContext("2d");
        var type = "pie";

        // Data
        var data = {
            labels: [
                "Team",
                "LP"
            ],
            datasets: [{
                label: "Allocation",
                data: [5, 95],
                backgroundColor: [
                    "#ff9900",
                    "#1d1fff"
                ],
                hoverOffset: 4
            }]
        }

        // Options
        var options = {
            onHover: (event, chartElement) => {
                event.native.target.style.cursor = chartElement[0] ? "pointer" : "default";
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: "#fff"
                    },
                    onHover: (event, chartElement) => {
                        event.native.target.style.cursor = chartElement ? "pointer" : "default";
                    }
                },
                tooltip: {
                    backgroundColor: "#1d1a7a",
                    callbacks: {
                        label: function (context) {
                            return " Allocation: " + context.dataset.data[context.dataIndex] + "%";
                        }
                    },
                }
            },
            rotation: 270
        }

        // Init new chart
        new Chart(ctx, {
            type: type,
            data: data,
            options: options
        });
    } catch (e) {
        // console.error(e);
    }
}