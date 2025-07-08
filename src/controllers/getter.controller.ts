import { Request, Response } from 'express';

// A handler that responds with 'Hello World!' when called.
const getHello = async (req: Request, res: Response) => {
    res.send('Hello World');
}

export default getHello;