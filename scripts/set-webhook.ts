import { setWebhook } from '../src/bot';
import * as dotenv from 'dotenv';

dotenv.config();

const VERCEL_URL = process.env.VERCEL_URL || 'your-vercel-app.vercel.app';
const WEBHOOK_URL = `https://${VERCEL_URL}/api/telegram`;

async function run() {
    await setWebhook(WEBHOOK_URL);
}

run().catch((error) => {
    console.error('Webhook setup failed:', error);
    process.exit(1);
});