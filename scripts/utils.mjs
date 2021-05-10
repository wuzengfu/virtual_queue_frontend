import { DEFAULTS } from './commons.mjs';

export function makeFromParameter() {
    const { duration } = DEFAULTS;
    const now = dayjs().utc();
    const from = now.subtract(duration, 'minute');
    return [from.format('YYYY-MM-DDTHH:mm:ss'), from, now];
}
