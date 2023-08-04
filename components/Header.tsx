import AuthButtonServer from './AuthButtonServer';
import Logo from './Logo';

export default function Header() {
  return (
    <div className="flex flex-row justify-between px-8 py-6 border-b border-slate-700">
      <Logo />
      <AuthButtonServer />
    </div>
  );
}
