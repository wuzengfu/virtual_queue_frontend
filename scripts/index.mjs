import { initialize } from './modules/charts.mjs';
import enableAutoRefresh from './modules/auto-refresh.mjs';

function makeCharts() {
    initialize([enableAutoRefresh]);
}

google.charts.setOnLoadCallback(makeCharts);
