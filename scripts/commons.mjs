export const DEFAULTS = {
    refreshRate: 3000, // Milliseconds
    duration: 3, // Minutes
    bucketSize: 5, // Seconds
    graphOptions: {
        // Google Chart Options
        legend: { position: 'none' },
        titleTextStyle: { color: 'white' },
        hAxis: { format: 'HH:mm:ss', textStyle: { color: '#999999' }, gridlines: { color: 'none' } },
        vAxis: { textStyle: { color: '#999999' }, gridlines: { color: 'none' } },
        chartArea: { width: '80%', height: '75%' },
        backgroundColor: 'none',
    },
};

export function hideDom(dom) {
    dom.setAttribute('hidden', 'hidden');
}
export function showDom(dom) {
    dom.removeAttribute('hidden');
}

/**
 * A helper function to compute from and now
 * @param duration Number of minutes before `now`
 * @returns an array of dates
 */
export function makeNowFrom(duration) {
    const now = dayjs().utc();
    const fromDayJs = now.subtract(duration, 'minute');
    const from = fromDayJs.format('YYYY-MM-DDTHH:mm:ss');
    return [now, fromDayJs, from];
}
