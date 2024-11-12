import { Router } from "express";
import { createComment, deleteComment, editComment, listComments } from "../controller/comment.controller";

const CommentRouter = Router();

CommentRouter.post('/', createComment);
CommentRouter.put('/:id', editComment);
CommentRouter.delete('/:id', deleteComment);
CommentRouter.get('/', listComments);

export default CommentRouter;