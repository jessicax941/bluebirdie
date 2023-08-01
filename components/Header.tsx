import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthButtonServer from './AuthButtonServer';

export default function Header() {
  return (
    <>
      <div className="flex flex-row justify-between px-8 py-4 border-b border-slate-700">
        <div className="flex flex-row items-center space-x-4 ">
          <FontAwesomeIcon icon={faTwitter} className="h-10 text-blue-400" />
          <p className="text-xl font-bold tracking-wide">Home</p>
        </div>

        <AuthButtonServer />
      </div>
    </>
  );
}
