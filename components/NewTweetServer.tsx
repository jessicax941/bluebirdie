import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import NewTweetClient from './NewTweetClient';

export default async function NewTweetServer() {
  const supabase = createClientComponentClient<Database>();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isUserSignedIn = user !== null;

  return <NewTweetClient isUserSignedIn={isUserSignedIn}></NewTweetClient>;
}
