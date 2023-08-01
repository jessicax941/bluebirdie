import LikeButton from './LikeButton';

type TweetItemProps = TweetWithAuthor & {
  addOptimisticTweet: (optimisticTweet: TweetWithAuthor) => void;
};

export default function TweetItem(props: TweetItemProps) {
  const {
    id,
    title,
    author: {
      avatar_url: profileAvatar,
      name: profileName,
      username: profileUsername,
    },
    addOptimisticTweet,
  } = props;

  return (
    <div
      key={id}
      className="flex flex-row px-8 py-4 space-x-4 border border-slate-800 rounded-lg"
    >
      <img
        src={profileAvatar}
        className="h-12 rounded-full mt-1 hover:cursor-pointer"
      />

      <div className="flex flex-col items-start">
        <div className="flex flex-row space-x-3 items-center">
          <p className="font-semibold">{profileName}</p>
          <p className="text-slate-400 hover:underline hover:cursor-pointer">
            @{profileUsername}
          </p>
        </div>

        <p className="">{title}</p>

        <LikeButton tweet={props} addOptimisticTweet={addOptimisticTweet} />
      </div>
    </div>
  );
}
