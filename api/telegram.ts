import type { VercelRequest, VercelResponse } from '@vercel/node';
import { bot } from '../src/bot';

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    if (req.method === 'POST') {
      await bot.handleUpdate(req.body);
      res.status(200).send('OK');
    } else {
      res.status(405).send('Method Not Allowed');
    }
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
};