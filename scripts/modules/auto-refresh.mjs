import { DEFAULTS } from '../commons.mjs';
import { refreshChart } from './charts.mjs';

let interval;

/**
 * Calls the refreshChart function periodically.
 *
 * @param chartIds the list of chartId
 */
export default function enableAutoRefresh(chartIds) {
    clearInterval(interval);
    interval = setInterval(() => {
        chartIds.forEach((chartId) => {
            refreshChart(chartId);
        });
    }, DEFAULTS.refreshRate);
}
