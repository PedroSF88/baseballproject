// d3.json("/teams/2016").then((teams) => {
//     Object.values(teams).forEach(team => {
//         Object.entries(team).forEach(([key, value]) => {
//             console.log(`${key}:${value}`)
//         });
//     });
// });

// d3.json("/people").then((teams) => {
//     Object.values(teams).forEach(team => {
//         Object.entries(team).forEach(([key, value]) => {
//             console.log(`${key}:${value}`)
//         });
//     });
// });

$(document).ready(function() {
    populatePlayer();
    buildCharts(player);
    
    //listen for year change
    $('#player').change(function() {
     buildCharts($('#player').val())
    });
});

function populatePlayer() {
    d3.json('/playerID/').then((data) => {
        var objs = Object.values(data);

        var player = [];
        for (var i = 0; i < objs.length; i++) {
            player.push(objs[i].playerID);
        }
        console.log(player)

        player.forEach(player => {
            $('#player').append(`<option>${player}</option>`);
        });
        $('#player').val(player[0]);
    });
}


function buildCharts() {
    d3.json(`/playersalaries`).then((data) => {
        var objs = Object.values(data);
        
        var year = [];
        var salary = [];
        var player= [];
        
        for (var i = 0; i < objs.length; i++) {
            year.push(objs[i].yearID);
            salary.push(objs[i].salary); 
            player.push(objs[i].playerID)         
        }

        // Build a Bubble Chart
        var bubbleLayout = {
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "Year" },
            yaxis: { title: "Salary" }
        };
        var bubbleData = [{
            x: year,
            y: salary,
            text: player,
            mode: "markers",
            marker: {
                size: 10,
                color: salary,
                colorscale: "Earth"
            },
            transforms: [{
            type: 'filter',
            target: text,
             operation: '=',
            value: [$('#player').val()]
        }]
        }];

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}
