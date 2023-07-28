import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthButtonClient from './AuthButtonClient';

export default async function AuthButtonServer() {
  // to dynamically render the UI based on whether user is signed in or not, we need to create server component for the auth button bc getting the session is async
  // so we get the session first, and then pass it to the client component button to directly render the correct IU
  // if we get the user session in the useEffect hook in the client component, the UI will need to refresh after getting the session in the useEffect, which isn't desirable
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <AuthButtonClient session={session} />;
}
