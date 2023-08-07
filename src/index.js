require('dotenv').config()

const CronJob = require('cron').CronJob;
const  twitterController  = require('./controllers/twitterController')

const job = new CronJob(
    '* 2 * * *', 
    async function() {
        twitterController.tradeHeaderWithCats();
    }
)


job.start();

