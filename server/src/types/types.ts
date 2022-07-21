import { Request, Response } from 'express'
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import { FindOneOptions } from 'typeorm';
import { User } from '../entities/User';

export type Context = {
    req: Request & { session: Session & Partial<SessionData> & { userId: FindOneOptions<User> } }
    redis: Redis
    res: Response
}