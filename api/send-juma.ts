import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendJumaMubarak } from '../src/image';

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    if (req.method === 'POST') {
      const chatId = process.env.GROUP_CHAT_ID || '';
      if (!chatId) throw new Error('GROUP_CHAT_ID not set');
      await sendJumaMubarak(chatId);
      res.status(200).send('Juma Mubarak sent');
    } else {
      res.status(405).send('Method Not Allowed');
    }
  } catch (error) {
    console.error('Send Juma error:', error);
    res.status(500).send('Failed to send Juma Mubarak');
  }
};
