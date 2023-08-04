import { getRelativeTimeFromDates } from '@/utils/formatTime';
import Image from 'next/image';
import LikeButton from './LikeButton';

type TweetItemProps = TweetWithAuthor & {
  addOptimisticTweet: (optimisticTweet: TweetWithAuthor) => void;
};

export default function TweetItem(props: TweetItemProps) {
  const {
    id,
    title,
    created_at: timestampStr,
    author: {
      avatar_url: profileAvatar,
      name: profileName,
      username: profileUsername,
    },
    addOptimisticTweet,
  } = props;

  const timestamp = new Date(timestampStr);
  const today = new Date();
  const relativeTime = getRelativeTimeFromDates(timestamp, today);

  return (
    <div
      key={id}
      className="flex flex-row px-8 py-4 space-x-4 border border-slate-800 rounded-lg"
    >
      <Image
        src={profileAvatar}
        height={50}
        width={50}
        className="h-12 rounded-full mt-1 hover:cursor-pointer"
        alt=""
      />

      <div className="flex flex-col items-start">
        <div className="flex flex-row space-x-3 items-center">
          <p className="font-semibold">{profileName}</p>
          <p className="text-slate-400 hover:underline hover:cursor-pointer">
            @{profileUsername}
          </p>
          <p className="text-slate-400">{relativeTime}</p>
        </div>

        <p className="">{title}</p>

        <LikeButton tweet={props} addOptimisticTweet={addOptimisticTweet} />
      </div>
    </div>
  );
}
