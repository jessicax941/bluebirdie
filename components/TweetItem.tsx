type TweetItemProps = {
  id: string;
  createdAt: string;
  title: string;
  profileName: string;
  profileUsername: string;
  profileAvatar: string;
};

export default function TweetItem(props: TweetItemProps) {
  const { id, title, profileName, profileUsername } = props;

  return (
    <div key={id}>
      <p>{profileName}</p>
      <p>{title}</p>
    </div>
  );
}
