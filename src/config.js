import { config } from 'dotenv';

config();


export const cfg = {
    general: {
        PORT: process.env.PORT || 3000,
        APP_URL: 'http://localhost:3000'
    }
};
