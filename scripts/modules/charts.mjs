import { DEFAULTS, hideDom, showDom, makeNowFrom } from '../commons.mjs';
import { createColumnChart, drawGoogleChart } from './google-charts.mjs';
import getErrorChartPayload from './connector.mjs';

/**
 *
 * @param value The value to be placed into a bucket
 * @param bucketSize Size of a bucket
 * @returns The bucket which the value is to be placed into
 */
function getBucketKey(value, bucketSize = DEFAULTS.bucketSize) {
    return value - (value % bucketSize);
}

/**
 * Converts an array of timestamp into Column Chart data
 *
 * @param timestamps an array of unix timestamps
 * @param fromDayJs a dayjs instance, represent the starting time
 * @param toDayJs a dayjs instance, represents the ending time
 * @returns buckets in Google Column Chart data format
 */
function makeTimestampBuckets(timestamps, fromDayJs, toDayJs) {
    const { bucketSize } = DEFAULTS;

    // min/maxValue is determined by the from and to(from + duration)
    const minValue = fromDayJs.unix();
    const maxValue = toDayJs.unix();

    /**
     * Counting the number of time a timestamp occurred
     *
     * e.g.
     *      minValue = 0;
     *      maxValue = 6;
     *      timestamps = [1, 1, 3, 5, 5, 5]
     * Becomes
     *      {
     *          1: 2, 2: 0,
     *          3: 1, 4: 0,
     *          5: 3, 6: 0
     *      }
     *
     * i.e. the element "1" occurred twice.
     * i.e. the element "4" never occurred before.
     */
    const timestampMap = {};
    const timestampKeys = [];
    const minBucketKey = getBucketKey(minValue);
    for (let i = minBucketKey; i < maxValue; i += bucketSize) {
        timestampMap[i] = 0;
        timestampKeys.push(i);
    }
    timestamps.forEach((timestamp) => {
        timestampMap[getBucketKey(timestamp)] += 1;
    });

    /**
     * Google's Column chart requires data
     * to be in the following format:
     *
     *  [
     *      ['Y-Axis Title', 'X-Axix Title'],
     *      [y1, x1],
     *      [y2, x2],
     *      ...
     *      [yn, xn],
     *  ]
     */
    const buckets = [['Timestamp', 'Count']];
    timestampKeys.forEach((timestamp) => {
        buckets.push([new Date(timestamp * 1000), timestampMap[timestamp]]);
    });
    return buckets;
}

/**
 * Error Chart is actually a Column Bar chart.
 * So we need to transform the payload into an array of timestamp
 * before passing it to `makeTimestampBuckets` function.
 *
 * @param payload data received from API
 * @param fromDayJs a dayjs instance, represent the starting time
 * @param toDayJs a dayjs instance, represent the ending time
 * @returns buckets in Google Column Chart data format
 */
function makeErrorChartPayloadToTimestampBuckets(payload, fromDayJs, toDayJs) {
    return makeTimestampBuckets(
        // See .map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        payload.map(({ timestamp }) => timestamp),
        fromDayJs,
        toDayJs,
    );
}

const hideWarningIcon = hideDom;
const showWarningIcon = showDom;
const hideLoadingAnimation = hideDom;
const showLoadingAnimation = showDom;

export const charts = {
    'error-rate': {
        options: {
            ...DEFAULTS.graphOptions,
            title: 'errors/sec',
            colors: ['red'],
        },
        createChart: createColumnChart,
        draw: drawGoogleChart,
        payloadToData: makeErrorChartPayloadToTimestampBuckets,
        getPayload: getErrorChartPayload,
    },
};

/**
 *
 * 3 Step process
 *  1. Get the payload from the API
 *  2. Convert the payload to chart-friendly data
 *  3. Draw the chart
 *
 * @param chartId the id of the chart to be refreshed
 */
export function refreshChart(chartId) {
    const chart = charts[chartId];
    const { getPayload, payloadToData, draw, loadingAnimation, warningIcon } = chart;
    const { duration } = DEFAULTS;
    const [now, fromDayJs, from] = makeNowFrom(duration);
    showLoadingAnimation(loadingAnimation);
    // Step 1: Get payload from API
    getPayload(from, duration)
        .then((payload) => {
            // Successfully received payload
            hideWarningIcon(warningIcon);
            // Step 2: Convert payload to chart-friendly data
            const array = payloadToData(payload, fromDayJs, now);
            // Step 3: Draw the chart
            draw(array, chart);
        })
        .catch((error) => {
            // Error receiving payload.
            showWarningIcon(warningIcon);
            console.error(error); // eslint-disable-line no-console
        })
        .finally(() => {
            hideLoadingAnimation(loadingAnimation);
        });
}

/**
 * Initialize the charts
 *
 * @param plugins the list of plugins to be activated
 */
export function initialize(plugins) {
    const chartIds = Object.keys(charts);
    chartIds.forEach((chartId) => {
        const chart = charts[chartId];
        const chartContainerDom = document.getElementById(chartId);
        chart.containerDom = chartContainerDom;
        chart.chartDom = chartContainerDom.querySelector('.chart');
        chart.loadingAnimation = chartContainerDom.querySelector(`.loading-icon`);
        chart.warningIcon = chartContainerDom.querySelector(`.warning-icon`);
        chart.createChart(chart);
        refreshChart(chartId);
    });

    plugins.forEach((plugin) => {
        plugin(chartIds, charts);
    });
}
