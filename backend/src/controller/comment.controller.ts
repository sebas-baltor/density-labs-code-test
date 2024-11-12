import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
// import { Comment } from '@prisma/client';
const createComment = async (req: Request, res: Response) => {
    try {
        const { body, email } = req.body;
        console.log(req.body);
        const newComment = await prisma.comment.create({
            data: req.body
        });
        res.status(201).json(newComment);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const editComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { body} = req.body;
        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(id) },
            data: { body }
        });
        res.status(200).json(updatedComment);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.comment.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const listComments = async (req: Request, res: Response) => {
    try {
        const comments = await prisma.comment.findMany({
            where: { replyToId: null },
            include: { replies: true}
        });
        res.status(200).json(comments);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

export { createComment, editComment, deleteComment, listComments };