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

        // Init new chart
        new Chart(ctx, {
            type: type,
            data: data
        });
    } catch (e) {
        // console.error(e);
    }
}