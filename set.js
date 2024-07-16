const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0dqUUl2UTEyS000bFhldks0MGVic2dlZXBtTmYvNDgySHAwbVBZS3RrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid3E0bVBaa3ZMTlZINi9rU0ZwZk9YMk0wa2dPYy9RRkJReUpqUFFZWVFEaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1TVFaeXliZUZoODFCLzZrY1NzazIydThCeEh3NjZmRForaU5XSUxuZFhNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2cEViRUJ0Zi9JcEpVVDZUQWJLOGtGcWlOWFR4Mm5SUGpYODQxaWU1V3hZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFCZ3VGT0NlQ08rZ1lSMlpCQlpybnp0UlNTMCszaThVQWhYOXFScE9ta3c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpuOFMwOHRsaEpSZGVuV0YyRnkwcEE4VXVtUHJwZ3NkRVpYN2FSWXFCUXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU9uczRpMHVFcisvT2ZROG9Pc2RQL3o5TW04L0xwOStFOE9wUE9NNENYUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMitnV0pQbDhaOXYxa0ZnQUxyM1BYcGFPanRLZXlidnZOaHJQRFQ4MzNrND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFWRmFHOGQrYjNhbWYwSzMvQmpjcHZSdHF3TXFMQmdqQXRqbzhDTVB5QTNsVGZ2L3Q0L1kzU21Da0NSNm5PVjVUeDkwWm9zOFdFaVNnWThzQW1Fb2d3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjgsImFkdlNlY3JldEtleSI6InpTOHl3ZE1wdFhvaUhudzl1MXk1cC8xMmdSWXpEWmVZZ2FaZ1BHUnhtNFU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlFyeVZ4dDJoUmQyQlI5YjgzajhxUUEiLCJwaG9uZUlkIjoiNDllY2EyZGQtODc1Yy00YmJlLTk0MzItYjJmNjMzNmQ3ZDk2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRDSHZQbHhlZjRxVWljUE5kNEt2NnlzNkFNdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuL05WQ0ZaWjRITTVnTzMwSVFwOG5HUXo4N2c9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVkZTTTI0QTEiLCJtZSI6eyJpZCI6IjkyMzAzNzQ4NDE2NzoyMEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJHWFMgQkFOS0lORyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSTZFM1pFR0VQckwyclFHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVkROS2JXSGkzc0JuT1VPeHdtbXhSKy9DeHo3TkpYTGFLTThEOXZCM21EZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoicFQvZEUxcHpuTGEzcG1QWEVsTEhFVXVyZEViVmlwZ2s4R2ZXdElVY01KV0xRNit6U2RtdnMwRGF6WUNsak1neG5uVkF5WER5a3l4cHhiRENkRHV2Qnc9PSIsImRldmljZVNpZ25hdHVyZSI6Inppb3gxVFFkanR4TWFCbVVua29sLzFOMDgrWHZSTldpdUNyRGJEKzVza0ZURmJhdUkvbE8raWpQcE5GTmRmemlPa200aGtKb2x6WUVOajN1K2FUcmlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMDM3NDg0MTY3OjIwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZRelNtMWg0dDdBWnpsRHNjSnBzVWZ2d3NjK3pTVnkyaWpQQS9id2Q1ZzQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjExNDg5MzMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUGh3In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "923037484167",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || 'love you',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
