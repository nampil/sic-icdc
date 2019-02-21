const {
    RedisPubSub
} = require('graphql-redis-subscriptions');
const Redis = require('ioredis');
const options = {
    host: 'redis-15418.c61.us-east-1-3.ec2.cloud.redislabs.com',
    password: 'MaisPFEYHW0oWXtpTDga87RhEPVsuHT0',
    port: '15418',
    retry_strategy: options => {
        // reconnect after
        return Math.max(options.attempt * 100, 3000);
    }
};

const pubsub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
});

module.exports = pubsub