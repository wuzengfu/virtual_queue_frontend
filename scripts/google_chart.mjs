export function createColumnChart(chartDom) {
    return new google.visualization.ColumnChart(chartDom);
}

export function drawChart(chart, array, options) {
    const data = google.visualization.arrayToDataTable(array);
    chart.draw(data, options);
}
