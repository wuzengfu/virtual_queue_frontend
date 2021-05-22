export function createColumnChart(chart) {
    const { chartDom } = chart;
    chart.googleChart = new google.visualization.ColumnChart(chartDom);
}

export function createAreaChart(chart) {
    const { chartDom } = chart;
    chart.googleChart = new google.visualization.AreaChart(chartDom);
}

export function createLineChart(chart) {
    const { chartDom } = chart;
    chart.googleChart = new google.visualization.LineChart(chartDom);
}

/**
 * Create HTML DOM elements for the four waiting-time panels
 * <ul>
 *     div.panels >
 *     <li>&nbsp p.key</li>
 *     <li>&nbsp p.value</li>
 * </ul>
 *
 * @param {Object} chart - the properties of the waiting-time panel
 */
export function createWaitingTimePanels(chart) {
    const {
        chartDom,
        panels
    } = chart;

    let panelContainer, key, value;
    for (let i = 0, length = panels.length; i < length; i++) {
        //create DOM element
        panelContainer = document.createElement('div');
        key = document.createElement('p');
        value = document.createElement('p');

        //set class name for DOM element
        panelContainer.setAttribute('class', 'panels');
        key.setAttribute('class', 'key');
        value.setAttribute('class', 'value');

        //insert DOM elements to chart-container of waiting-time panels
        panelContainer.appendChild(key);
        panelContainer.appendChild(value);
        chartDom.appendChild(panelContainer);
    }
}

/**
 * Insert value/data into the four panels
 *
 * @param {Object} data - the values for four panels {mean, median, max, min}
 * @param {Object} chart - the properties of the waiting-time panel
 */
export function drawWaitingTimePanels(data, chart) {
    const { panels, options } = chart;
    let color = options.colors[0];

    let dom_panel = document.getElementsByClassName('panels');
    let dom_key = document.getElementsByClassName('key');
    let dom_value = document.getElementsByClassName('value');

    //insert values into the four panels
    for (let i = 0, length = Object.keys(data).length; i < length; i++) {
        dom_panel[i].style.backgroundColor = color; //set background color
        dom_key[i].innerHTML = panels[i].value;
        dom_value[i].innerHTML = data[panels[i].key].toFixed(1);
    }
}

export function drawGoogleChart(array, { googleChart, options }) {
    const data = google.visualization.arrayToDataTable(array);
    googleChart.draw(data, options);
}
