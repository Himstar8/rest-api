import express from 'express';
import { connect } from './config/db';

const app = express();

connect();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server runnning on port ${port}...`));
