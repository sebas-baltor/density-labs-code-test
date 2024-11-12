export interface Comment {
    id: number;
    body: string;
    email: string;
    replyToId?: number;
    replies?: Comment[];
}