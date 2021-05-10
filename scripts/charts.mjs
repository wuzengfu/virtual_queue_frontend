import {createColumnChart, drawChart} from './google_chart.mjs';
import {getErrorChartPayload} from './connector.mjs';
import {makeFromParameter} from './utils.mjs';
import {DEFAULTS} from './commons.mjs';

function getBucketKey(value, bucketSize) {
    return value - (value % bucketSize);
}

function makeTimestampBuckets(timestamps, minValue, maxValue) {
    const bucketSize = 5; // This is a constant, it could be defined in DEFAULTS variable in commons.mjs

    const timestampMap = {};
    const timestampKeys = [];
    const minBucketKey = getBucketKey(minValue, bucketSize);
    for (let i = minBucketKey; i < maxValue; i += bucketSize) {
        timestampMap[i] = 0;
        timestampKeys.push(i);
    }
    timestamps.forEach((timestamp) => {
        timestampMap[getBucketKey(timestamp, bucketSize)] += 1;
    });

    const buckets = [['Timestamp', 'Count']];
    timestampKeys.forEach((timestamp) => {
        buckets.push([new Date(timestamp * 1000), timestampMap[timestamp]]);
    });
    return buckets;
}

function makeErrorChartPayloadToTimestampBuckets(payload, fromDayJs, toDayJs) {
    const minValue = fromDayJs.unix();
    const maxValue = toDayJs.unix();
    return makeTimestampBuckets(
        payload.map(({timestamp}) => timestamp),
        minValue,
        maxValue,
    );
}

const charts = [
    // error chart
    {
        options: {},
        containerId: 'error-rate',
        create: createColumnChart,
        getData: getErrorChartPayload,
        convertToGraphData: makeErrorChartPayloadToTimestampBuckets,
        draw: (chart, array, options) => drawChart(chart, array, options),
    },
];

export function initialize() {
    charts.forEach(({options, containerId, create, getData, convertToGraphData, draw}) => {
        const chartContainerDom = document.getElementById(containerId);
        const chartDom = chartContainerDom.querySelector('.chart');
        const chart = create(chartDom);
        const [from, fromDayJs, toDayJs] = makeFromParameter();
        const {duration} = DEFAULTS;
        getData(from, duration)
            .then((data) => convertToGraphData(data, fromDayJs, toDayJs))
            .then((array) => draw(chart, array, options));
    });
}
