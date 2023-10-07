const { TwitterApi } = require('twitter-api-v2');
const axios = require('axios');
const download = require('download');

class TwitterController {
    constructor() {
        this.client = new TwitterApi({
            appKey: process.env.APP_KEY,
            appSecret: process.env.APP_SECRET,
            accessToken: process.env.ACCESS_KEY,
            accessSecret: process.env.ACCESS_SECRET
        });
        this.request_cats = (parameters) => {
            return axios.get(`https://api.thecatapi.com/v1/images/search?${parameters}`,
            {
                headers: {
                    'x-api-key': process.env.CAT_API_KEY
                }
            });
        }
    }

    async tradeHeaderWithCats(){
        console.log('starting trading header with cats');
        try{
            const random_page = Math.floor(Math.random() * 10);
            const random_image = Math.floor(Math.random() * 10);
            const cat_image = await this.request_cats(`limit=100&page=${random_page}`);
            const image = await download(cat_image.data[random_image].url);
            await this.client.v1.updateAccountProfileBanner(image, {
                width: 1500,
                height: 500,
            })
        }
        catch(err){
            console.log(err);
        }

        console.log("finishing trading header with cats")
    }

}

module.exports = new TwitterController();