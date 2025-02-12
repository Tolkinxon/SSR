import { IncomingMessage, ServerResponse } from "node:http";

type Request = IncomingMessage;
type Response = ServerResponse<Request>;

export abstract class  Auth {
    abstract login (req: Request, res: Response): void;
    abstract register (req: Request, res: Response): void;
}