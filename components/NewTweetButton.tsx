'use client';

import { postTweet } from '@/app/actions';
import { useState } from 'react';

export default function NewTweetButton() {
  const [value, setValue] = useState('');
  const handleSubmitForm = () => {
    console.log(value);
    setValue('');
  };

  return (
    <div>
      <form action={postTweet}>
        <input
          id="newTweetInput"
          name="title"
          value={value}
          className="bg-slate-800 h-full w-full rounded-md border-none p-6 focus:outline-none"
          placeholder="What's happening?"
          onSubmit={handleSubmitForm}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </div>
  );
}
