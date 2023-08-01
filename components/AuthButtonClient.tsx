'use client';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  const supabase = createClientComponentClient<Database>();
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

  const baseStyles = `px-6 py-2.5 flex flex-row rounded-full`;

  return session ? (
    <button
      className={`${baseStyles} bg-blue-500 hover:bg-blue-600`}
      onClick={handleSignOut}
    >
      Sign out
    </button>
  ) : (
    <button
      className={`${baseStyles} justify-center items-center bg-slate-100 text-slate-800 space-x-2 hover:bg-slate-200`}
      onClick={handleSignIn}
    >
      <FontAwesomeIcon icon={faGithub} className="h-6" />
      <p>Sign in with GitHub</p>
    </button>
  );
}
