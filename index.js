const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '7838841130:AAFjmzrVsc99srQnOjt0gWuxVgftvQU9gx0'
const bot = new TelegramBot(TOKEN, { polling: true });



const obj={}

const gameOptions={
    reply_markup:{
        inline_keyboard:[
            [
                {
                    text:"1",
                    callback_data: '1'
                },
                {
                    text:"2",
                    callback_data: '2'
                },
                {
                    text:"3",
                    callback_data: '3'
                }
            ],
            [
                {
                    text:"4",
                    callback_data: '4'
                },
                {
                    text:"5",
                    callback_data: '5'
                },
                {
                    text:"6",
                    callback_data: '6'
                }
            ],
            [
                {
                    text:"7",
                    callback_data: '7'
                },
                {
                    text:"8",
                    callback_data: '8'
                },
                {
                    text:"9",
                    callback_data: '9'
                }
            ],
            [
                {
                    text:"0",
                    callback_data: '0'
                }
            ]
        ]
    }
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
        await bot.sendMessage(chatId, 'Let\'s play a game! Send me a number between 1 and 10.');
        const randomNumber = Math.floor(Math.random() * 10);
        obj[chatId] = randomNumber;
        return  bot.sendMessage(chatId, 'I have selected a random number between 1 and 10. Try to guess it!',gameOptions);
    }


    bot.sendMessage(chatId,'gapingizga cunmadim')
})
}


bootstrap();
 
