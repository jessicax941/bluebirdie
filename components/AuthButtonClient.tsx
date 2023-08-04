'use client';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Button from './Button';

export default function AuthButtonClient({
  session,
}: {
  session: Session | null;
}) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`, // to redirect users to a page after they have authenticated with github with a token
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return session ? (
    <Button onClick={handleSignOut}>Sign out</Button>
  ) : (
    <Button buttonType="github" onClick={handleSignIn}>
      <FontAwesomeIcon icon={faGithub} className="h-6" />
      <p>Sign in with GitHub</p>
    </Button>
  );
}
