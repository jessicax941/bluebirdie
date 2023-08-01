type TweetItemProps = {
  id: string;
  createdAt: string;
  title: string;
  profileName: string;
  profileUsername: string;
  profileAvatar: string;
};

export default function TweetItem(props: TweetItemProps) {
  const { id, title, profileName, profileUsername, profileAvatar } = props;

  return (
    <div
      key={id}
      className="flex flex-row px-4 py-6 space-x-2.5 border border-slate-800 rounded-lg"
    >
      <img src={profileAvatar} className="h-8 rounded" />

      <div className="flex flex-col space-y-0.5">
        <div className="flex flex-row space-x-3 items-center">
          <p className="font-semibold">{profileName}</p>
          <p className="text-slate-400 hover:underline hover:cursor-pointer">
            @{profileUsername}
          </p>
        </div>

        <p className="">{title}</p>
      </div>
    </div>
  );
}
