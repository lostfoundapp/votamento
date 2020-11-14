import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';

interface ErrorResponseType {
    error: string;
}

interface SuccessResponseType {
    _id: string;
    politico: number;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
    if (req.method === 'POST') {
        const {
            politico
        }: {
            politico: number;
        } = req.body;

        if (!politico) {
            res.status(400).json({ error: 'Nenhum politico escolhido...' });
            return;
        }

        const { db } = await connect();
        const response = await db.insertOne({
            politico
        });
        res.status(200).json(response.ops[0]);
    } else {
        res.status(400).json({ error: 'Wrong request method' });
    }
}