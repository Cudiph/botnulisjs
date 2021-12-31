# BotNulisJS
Telegram bot to help you generate writing on paper

## Bot usage
In the bot dm type `/write` then write a text or use
[write.txt](./sample/write.txt) for testing.
For sample output see the [sample](./sample) folder

## Before you start the bot
1. Download the source code or clone the project by using git.
2. Make sure you have nodejs installed. I use v16 but v14 should work.
3. Run [mongodb server][mongodb_server] by executing `mongod` or by using [mongodb atlas][mongo_atlas] services
4. rename [example.env](./example.env) to only `.env` and change it's content. If you don't know how to get a bot token read the [introduction to bots](https://core.telegram.org/bots) from telegram

## Running the bot
1. In the command line change working directory to this project folder in your local computer
2. Install all dependency by executing `npm install`
3. Run the bot with `npm start`

[mongodb_server]: https://www.mongodb.com/try/download/community
[mongo_atlas]: https://www.mongodb.com/atlas
