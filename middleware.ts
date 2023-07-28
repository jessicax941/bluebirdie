import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

// to refresh user session token when it expires so that the only time the user is logged out, is when they click on the logout button themselves
// can't be done in server components so we have to do this in middleware
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession(); // getSession() refreshes the token when it's expired
  return res;
}
