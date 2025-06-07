const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const { gameOptions, againOption } = require('./options');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });



const obj={}

 

const startGame = async (chatId)=> {
    await bot.sendMessage(chatId, 'Let\'s play a game! Send me a number between 1 and 10.');
        const randomNumber = Math.floor(Math.random() * 10);
        obj[chatId] = randomNumber;
        await bot.sendMessage(chatId, 'I have selected a random number between 1 and 10. Try to guess it!',
            gameOptions);
}
const bootstrap =() => {
    bot.setMyCommands([{
    command: '/start',
    description: 'Start the bot'
},
{
    command: '/info',
    description: 'Get information about the bot'
},
{
    command: '/game',
    description: 'Play a simple game'
}
    
])

bot.on('message',async msg=>{
    const text = msg.text;
    const chatId = msg.chat.id;


    if (text === '/start') {
        await bot.sendAnimation(chatId,'https://tlgrm.eu/_/stickers/232/efc/232efc5a-b6eb-4d09-abf4-4252d60747f5/256/3.webp')
        return bot.sendMessage(chatId, 'Welcome to the bot! Please send me a message.');
    }
    if (text === '/info'){
        await bot.sendSticker(chatId,'https://tlgrm.eu/_/stickers/be1/98c/be198cd5-121f-4f41-9cc0-e246df7c210d/7.webp')
        return  bot.sendMessage(chatId, 'This is a simple Telegram bot created using node-telegram-bot-api.');
    }
    if (text === '/game') {
        return startGame(chatId);
    }


    bot.sendMessage(chatId,'gapingizga cunmadim')
})
bot.on('callback_query',msg =>{
    const data = msg.data
    const chatId = msg.message.chat.id;

    if (data === '/again') {
        return startGame(chatId);
    }

    if(data == obj[chatId]){
        return bot.sendMessage(chatId,
             'Siz tugri javob berdiz!');
    }
    else {
        return bot.sendMessage(
            chatId,
             `Siz xato javob berdiz ${data}! To'g'ri javob: ${obj[chatId]} `,
             againOption);
        
    }
})
}


bootstrap();
 
