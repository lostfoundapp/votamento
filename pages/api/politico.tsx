import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';

interface ErrorResponseType {
    error: string;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | Record<string, unknown>[]>
): Promise<void> => {
    if (req.method === 'GET') {

        const { db } = await connect();
        const response = await db.find().toArray();

        res.status(200).json(response);
    } else {
        res.status(400).json({ error: 'Wrong request method' });
    }
}