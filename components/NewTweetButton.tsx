'use client';

import { postTweet } from '@/app/actions';
import { ChangeEvent, useState } from 'react';
import Button from './Button';

export default function NewTweetButton() {
  const [title, setTitle] = useState('');

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    const formData: FormData = new FormData();
    formData.set('title', title);
    postTweet(formData);

    setTitle('');
  };

  return (
    <div className="bg-slate-800 rounded-md px-10 py-6">
      <form>
        <textarea
          id="newTweetInput"
          name="title"
          value={title}
          className="bg-inherit h-full w-full border-none focus:outline-none resize-none"
          placeholder="What's happening?"
          onChange={handleInput}
          rows={3}
        />
        <Button type="submit" onClick={handleSubmit}>
          Post
        </Button>
      </form>
    </div>
  );
}
