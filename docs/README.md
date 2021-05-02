# ST0507 ADES AY21/22 Sem 1 CA1 Website

## Setup

1. Setup [ST0507 ADES AY21/22 Sem 1 CA1 Backend](https://ades-fsp.github.io/2122s1-backend/#setup)
2. Run [the Backend](https://ades-fsp.github.io/2122s1-backend/#run)

    ```
    $ npm run start-db

    $ npm run start
    ```

3. Run `npm install`

## Run

1. Serve `index.html` on `localhost` and access it via your desired browser
    1. You should see the error chart auto refreshing every 3 seconds
    2. You should see the error chart displaying data for the past 3 minute
2. Make a 404 request to the backend (e.g. `GET /some-unknown-url`)
    1. You should see a single bar appearing
3. Make a few more 404 request to the backend
    1. You should see more bars appearing

## Test

1. ESLint

    ```
    npm run eslint
    ```
