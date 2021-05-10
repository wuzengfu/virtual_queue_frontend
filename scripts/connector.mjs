const host = `http://localhost:3000/`;
const errorChartEndpoint = `stats/errors`;

export function getErrorChartPayload(from, duration) {
    const url = `${host}${errorChartEndpoint}?from=${encodeURIComponent(from)}&duration=${duration}`;
    return fetch(url).then((response) => response.json());
}
