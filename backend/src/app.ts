import express, {Express, Request, Response} from 'express';
import dotenv from "dotenv";
import cors from "cors";
import CommentRouter from './routes/comment.route';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/v1/comment', CommentRouter);


app.listen(port, ()=> {
console.log(`[Server]: I am running at https://localhost:${port}`);
});