import { Telegraf } from 'telegraf';
import { sendJumaMubarak } from './image';
import { log } from './utils';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
export const bot = new Telegraf(BOT_TOKEN);

// Help command
bot.command('yordam', async (ctx) => {
  const helpMessage = `
🤖 *Bot Buyruqlari*:
/tabrik - Juma bilan tabriklash  
/yordam - Bot haqida ma’lumot olish  
ℹ️ Buyruqlardan foydalanish uchun *"/"* belgisini kiriting.
  `;
  await ctx.reply(helpMessage, { parse_mode: 'Markdown' });
  log('info', `Help message sent to chat ${ctx.chat.id}`);
});

// Greeting command
bot.command('tabrik', async (ctx) => {
  const senderName = ctx.from?.first_name
    ? `${ctx.from.first_name}${ctx.from.last_name ? ' ' + ctx.from.last_name : ''}`
    : "Muallif noma'lum";
  await sendJumaMubarak(ctx.chat.id.toString(), senderName);
  log('info', `Tabrik sent by ${senderName} in chat ${ctx.chat.id}`);
});

// Export for webhook setup
export async function setWebhook(url: string) {
  await bot.telegram.setWebhook(url);
  log('info', `Webhook set to ${url}`);
}
