import { z } from 'zod'

export const createCommentSchema = z.object({
    body: z.string().min(1).max(240, 'Comment must be less than 240 characters'),
    email: z.string().email(),
    replyToId: z.number().optional(),
})

export const editCommentSchema = z.object({
    // id: z.string().min(1),
    body: z.string().min(1).max(240, 'Comment must be less than 240 characters'),
    // email: z.string().email(),
})

export const deleteCommentSchema = z.object({
    id: z.string().min(1),
    confirm: z.boolean().default(false),
    // email: z.string().email(),
})