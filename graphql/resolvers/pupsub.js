const {
    RedisPubSub
} = require('graphql-redis-subscriptions');
const Redis = require('ioredis');
const options = {
    host: process.env.REDISCLOUD_URL,
    port: process.env.REDISCLOUD_PORT,
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