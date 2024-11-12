import { prisma } from '../lib/prisma';
import { Comment } from '@prisma/client';



// jest.mock('../src/services/userService');

test('should return a list of comments', async () => {
    const mockComments: Comment[] = [{ id: 1, body: 'This is a comment', email: 'test@gmail.com', replyToId: null }];
    jest.spyOn(prisma.comment, 'findMany').mockResolvedValue(mockComments);
    const comments = await prisma.comment.findMany();
    expect(comments).toEqual(mockComments);
});

test('should create a new comment', async () => {
    const layout: Comment = { id: 1, body: 'This is a comment', email: 'test@gmail.com', replyToId: null };
    const newComment = await prisma.comment.create({
        data: layout
    });
    expect(newComment).toEqual(layout);
});
