import AuthButtonClient from '@/components/AuthButtonClient';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect('/');
  }

  return <AuthButtonClient session={session} />; // use the client component bc the user is NOT signed in, so they wouldn't have a session, so we'll just pass a null session to the button
}
