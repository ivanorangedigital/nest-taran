export const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    API_KEY: process.env.API_KEY,
    PASSWORD: process.env.PASSWORD,
    ORIGIN: [process.env.ORIGIN, 'https://py.ristoranteclassicosalernitano.com']
})