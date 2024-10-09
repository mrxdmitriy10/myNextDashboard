import { Bot } from 'grammy';

// Создайте экземпляр бота с токеном
const bot = new Bot('7018166811:AAE0w-aU1ZG4orbNpedcUQ0pMa2w0YGgPxU');



// Команда /start
bot.command('start', (ctx) => ctx.reply('Привет! Я ваш Telegram бот.'));

// Экспортируйте экземпляр бота
export default bot;
