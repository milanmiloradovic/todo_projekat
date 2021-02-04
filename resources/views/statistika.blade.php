@extends('layouts.app')

@section('content')
    <div class="container">

        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

        </head>

        <body>
            <input hidden id="chartData" value='<?php echo json_encode($zadatak); ?>'>
            <div id="timeline" style="height: 50vh;"></div>
            <div id="piechart" style=""></div>
            <script type="text/javascript">
                const chartData = JSON.parse(document.getElementById("chartData").value);

                google.charts.load('current', {
                    'packages': ['timeline']
                });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    var container = document.getElementById('timeline');
                    var chart = new google.visualization.Timeline(container);
                    var dataTable = new google.visualization.DataTable();

                    dataTable.addColumn({
                        type: 'string',
                        id: 'Zadatak'
                    });
                    dataTable.addColumn({
                        type: 'date',
                        id: 'Start'
                    });
                    dataTable.addColumn({
                        type: 'date',
                        id: 'Deadline'
                    });

                    dataTable.addRows(chartData.map(cd => {
                        return [cd.naziv, new Date(cd.created_at), new Date(cd.deadline)]
                    }))

                    chart.draw(dataTable);
                }

                let numberFinished = chartData.filter(cd => cd.finished == true).length;
                let numberNotFinished = chartData.filter(cd => cd.finished == false).length;

                google.charts.load('current', {
                    'packages': ['corechart']
                });
                google.charts.setOnLoadCallback(drawPieChart);

                function drawPieChart() {

                    var data = google.visualization.arrayToDataTable([
                        ['Task', 'Broj'],
                        ['Zavrsen', numberFinished],
                        ['Nezavrsen', numberNotFinished]

                    ]);

                    var options = {
                        title: 'Statistika zadataka'
                    };

                    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

                    chart.draw(data, options);
                }

            </script>
        </body>

        </html>
    </div>

@endsection
