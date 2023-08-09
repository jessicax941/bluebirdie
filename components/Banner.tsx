import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type BannerProps = {
  type?: 'info';
  displayText: String;
};

export default function Banner(props: BannerProps) {
  const { type = 'info', displayText } = props;

  const baseStyling =
    'rounded-md text-slate-100 px-8 py-6 flex flex-row justify-start items-center space-x-3';

  const typeStyling = {
    info: 'bg-blue-900',
  };

  const combinedStyling = `${baseStyling} ${typeStyling[type]}`;

  return (
    <div className={combinedStyling}>
      {type === 'info' && (
        <FontAwesomeIcon icon={faCircleInfo} className="h-5" />
      )}
      <p>{displayText}</p>
    </div>
  );
}
