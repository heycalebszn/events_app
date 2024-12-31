import { Request, Response, NextFunction } from 'express';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const localMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

export default localMiddleware;
export function middleware(req: NextRequest) {
  console.log(`${req.method} ${req.nextUrl.pathname}`);
  return NextResponse.next();
}