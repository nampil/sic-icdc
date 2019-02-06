const express = require('express');
const bodyParser = require('body-parser');
const graphalHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const graphQlSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');
const app = express();


app.use(bodyParser.json());
app.use(cors())
app.use(isAuth);

app.use('/graphql', graphalHttp({
    schema: graphQlSchema,
    rootValue: graphQLResolvers,
    graphiql: true

}));

app.set('port', process.env.PORT || 5000)

app.use(express.static(__dirname + '/public'))


// mongoose.connect('mongodb://nampil:17abdi.sofi23@localhost:27017/icdcSicDb?retryWrites=true', {
//         useNewUrlParser: true,


//     })
//     .then(() => {
//         console.log('Connected to DB...');
//         app.listen(app.get('port'));
//     }).catch(err => {
//         console.log(err)
//     });
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ndev01-quhgy.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true`, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Connected to DB...');
        app.listen(app.get('port'));
    }).catch(err => {
        console.log(err)
    });