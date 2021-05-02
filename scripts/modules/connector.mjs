const host = `http://localhost:3000`;
const END_POINTS = {
    errors: '/stats/errors',
};

/**
 * A generic HTTP GET function, throws error if status !== 200.
 *
 * @param url the url to GET
 * @returns a Promise that resolves with the payload.
 */
function getChartPayload(url) {
    let status;
    return fetch(url)
        .then((response) => {
            status = response.status;
            return response.json();
        })
        .then((json) => {
            if (status !== 200) throw json;
            return json;
        });
}

/**
 * Makes the URL for a generic API with `from` and `duration`
 *
 * @param baseUrl the host
 * @param from the date to fetch data from (unencoded)
 * @param duration the amount of minutes from the `from` parameter
 * @returns The URL
 */
function makeFromDurationUrl(baseUrl, from, duration) {
    return `${baseUrl}?from=${encodeURIComponent(from)}&duration=${duration}`;
}

/**
 * @param from the date to fetch data from (unencoded)
 * @param duration the amount of minutes from the `from` parameter
 * @returns a Promise that resolves with the Error Chart's payload.
 */
export default function getErrorChartPayload(from, duration) {
    const url = makeFromDurationUrl(`${host}${END_POINTS.errors}`, from, duration);
    return getChartPayload(url);
}
