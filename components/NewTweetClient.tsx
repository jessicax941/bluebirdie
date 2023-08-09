'use client';

import { postTweet } from '@/app/actions';
import { ChangeEvent, useState } from 'react';
import Button from './Button';

type NewTweetProps = {
  isUserSignedIn: boolean;
};

export default function NewTweetClient(props: NewTweetProps) {
  const { isUserSignedIn } = props;
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

  const isPostButtonDisabled =
    !isUserSignedIn || (isUserSignedIn && title === '');

  return (
    <div className="bg-slate-800 rounded-md px-8 py-6">
      <form className="space-y-2.5 flex flex-col items-end">
        <textarea
          id="newTweetInput"
          name="title"
          value={title}
          className="bg-inherit h-full w-full border-none focus:outline-none resize-none"
          placeholder="What's happening?"
          onChange={handleInput}
          rows={3}
        />
        <Button
          type="submit"
          buttonType={isPostButtonDisabled ? 'disabled' : 'primary'}
          onClick={handleSubmit}
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}
