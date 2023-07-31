import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default function NewTweetButton() {
  const postTweet = async (formData: FormData) => {
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
  };

  return (
    <form action={postTweet} className="border border-slate-200">
      <input name="title" className="bg-inherit" />
    </form>
  );
}
