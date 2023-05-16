import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import errorMiddleware from './middlewares/error.middleware';
import submitRoute from './routes/submit.route';
import indexRoute from './routes/index.route';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

app.use('/', indexRoute);
app.use('/submit', submitRoute);

app.use(errorMiddleware);

export default app;