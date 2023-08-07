require('dotenv').config()

const CronJob = require('cron').CronJob;
const  twitterController  = require('./controllers/twitterController')

const job = new CronJob(
    '*  * * * *', 
    async function() {
        twitterController.tradeHeaderWithCats();
    }
)


job.start();

