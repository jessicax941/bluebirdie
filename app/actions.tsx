'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function postTweet(formData: FormData) {
  // server actions
  'use server';
  const title = String(formData.get('title'));
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await supabase.from('tweets').insert({ title, user_id: user.id });
  }
}
