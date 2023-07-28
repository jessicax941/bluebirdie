'use client';

import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function AuthButtonClient({
  session,
}: {
  session: Session | null;
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback', // to redirect users to a page after they have authenticated with github with a token
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return session ? (
    <button onClick={handleSignOut}>Sign out</button>
  ) : (
    <button onClick={handleSignIn}>Sign in</button>
  );
}
