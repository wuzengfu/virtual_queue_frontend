export function createColumnChart(chart) {
    const { chartDom } = chart;
    chart.googleChart = new google.visualization.ColumnChart(chartDom);
}

export function createAreaChart(chart) {
    const { chartDom } = chart;
    chart.googleChart = new google.visualization.AreaChart(chartDom);
}

export function drawGoogleChart(array, { googleChart, options }) {
    const data = google.visualization.arrayToDataTable(array);
    googleChart.draw(data, options);
}
