import { DEFAULTS } from '../commons.mjs';
import { convertColorFormat } from '../external/convertColorFormat.js';
import { charts } from './charts.mjs';
import enableAutoRefresh from './auto-refresh.mjs';

/**
 *  Array Object of configuration to be enabled for charts
 */
const initChart = [{
    'value': 'Refresh Rate (ms)',
    'type': 'number',
    'default': DEFAULTS.refreshRate
}, {
    'value': 'Duration (min)',
    'type': 'number',
    'default': DEFAULTS.duration
}, {
    'value': 'Bucket Size (sec)',
    'type': 'number',
    'default': DEFAULTS.bucketSize
}];

/**
 * enable chart configuration and customize colors
 */
export const enableChartConfig = function (chartID, charts) {
    initChartConfig();
    initCustomColor(chartID, charts);
};

/**
 * enable chart configuration
 */
function initChartConfig() {
    const keys = Object.keys(DEFAULTS);
    initChart.forEach((ele, index) => {
        //get DOM elements
        let container = createContainer();
        let label = createLabel(ele.value);
        let input = createInput(ele.type, ele.default);

        //append DOM elements
        container.appendChild(label);
        container.appendChild(input);

        //register events
        container.addEventListener('change', (e) => {
            let value = e.target.value;
            DEFAULTS[keys[index]] = value * 1;
            enableAutoRefresh(Object.keys(charts));
        });

        //insert into the outer config-container
        document.getElementById('config-container')
            .appendChild(container);
    });
}

/**
 * enable customization of color
 */
function initCustomColor(chartId, charts) {
    chartId.forEach((ele, index) => {
        const { options } = charts[ele];
        let color = options.colors[0];

        //get DOM elements
        let container = createContainer();
        let label = createLabel(chartId[index] + ' color ');
        let input = createInput('color', color);

        //append DOM elements
        container.appendChild(label);
        container.appendChild(input);

        //register events
        if (ele === 'waiting-time') {
            container.addEventListener('change', (e) => {
                let panels = document.getElementsByClassName('panels');
                Array.from(panels)
                    .forEach(panel => {
                        panel.style.backgroundColor = e.target.value;
                    });
            });
        } else {
            container.addEventListener('change', (e) => {
                options.colors[0] = e.target.value;
            });
        }

        //insert into the container
        document.getElementById('config-container')
            .appendChild(container);
    });
}

/**
 * create container for each configuration
 */
function createContainer() {
    let container = document.createElement('div');
    container.setAttribute('class', 'config');

    return container;
}

/**
 * create label for each configuration
 */
function createLabel(value) {
    let label = document.createElement('label');
    label.setAttribute('class', 'lbl');
    label.innerHTML = value;

    return label;
}

/**
 * create input for each configuration
 */
function createInput(inputType, value) {
    let input = document.createElement('input');
    input.setAttribute('class', 'custom');
    input.setAttribute('type', inputType);

    if (inputType === 'color') {
        value = convertColorFormat(value);
    }

    input.value = value;

    return input;
}
