import { initialize } from './modules/charts.mjs';
import enableAutoRefresh from './modules/auto-refresh.mjs';
import { enableChartConfig } from './modules/enableConfig.mjs';

function makeCharts() {
    initialize([enableAutoRefresh, enableChartConfig]);
}

google.charts.setOnLoadCallback(makeCharts);
