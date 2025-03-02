import axios from 'axios';
import { bot } from './bot';
import { generateCaption } from './captions';
import { log } from './utils';

const UNSPLASH_CLIENT_ID = process.env.UNSPLASH_CLIENT_ID || '';
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1592326871020-04f58c1a52f3?q=80&w=2565&auto=format&fit=crop';

// Fetch random mosque image from Unsplash
export async function getJumaImage(): Promise<string> {
  if (!UNSPLASH_CLIENT_ID) {
    log('warn', 'Unsplash Client ID missing, using default image');
    return DEFAULT_IMAGE;
  }
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: { query: 'mosque', client_id: UNSPLASH_CLIENT_ID },
    });
    return response.data.urls.regular;
  } catch (error) {
    log('error', 'Unsplash API error', error);
    return DEFAULT_IMAGE;
  }
}

// Send Juma Mubarak message
export async function sendJumaMubarak(
  chatId: string,
  senderName?: string
): Promise<void> {
  try {
    const imageUrl = await getJumaImage();
    const caption = generateCaption(senderName);
    await bot.telegram.sendPhoto(chatId, imageUrl, {
      caption,
      parse_mode: 'Markdown',
    });
    log('info', `Juma Mubarak sent to chat ${chatId}`);
  } catch (error) {
    log('error', 'Error sending Juma Mubarak', error);
    throw error;
  }
}
