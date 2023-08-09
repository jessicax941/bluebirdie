import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import NewTweetClient from './NewTweetClient';

export default async function NewTweetServer() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isUserSignedIn = user !== null;

  return <NewTweetClient isUserSignedIn={isUserSignedIn}></NewTweetClient>;
}
