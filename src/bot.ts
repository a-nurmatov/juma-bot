import { Telegraf } from 'telegraf';
import { sendJumaMubarak } from './image';
import { log } from './utils';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
export const bot = new Telegraf(BOT_TOKEN);

bot.command('yordam', async (ctx) => {
  const helpMessage = `
🤖 *Bot Buyruqlari*:
/tabrik - Juma bilan tabriklash  
/yordam - Bot haqida ma'lumot olish  
ℹ️ Buyruqlardan foydalanish uchun *"/"* belgisini kiriting.
  `;
  await ctx.reply(helpMessage, { parse_mode: 'Markdown' });
  log('info', `Help sent to chat ${ctx.chat.id}`);
});

bot.command('tabrik', async (ctx) => {
  const senderName = ctx.from?.first_name
      ? `${ctx.from.first_name}${ctx.from.last_name ? ' ' + ctx.from.last_name : ''}`
      : "Muallif noma'lum";
  await sendJumaMubarak(ctx.chat.id.toString(), senderName);
  log('info', `Tabrik sent by ${senderName} in chat ${ctx.chat.id}`);
});

export async function setWebhook(url: string) {
  try {
    await bot.telegram.setWebhook(url);
    log('info', `Webhook set to ${url}`);
  } catch (error) {
    log('error', 'Failed to set webhook', error);
    throw error;
  }
}