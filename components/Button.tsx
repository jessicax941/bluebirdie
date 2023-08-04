import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonType?: 'primary' | 'github';
}

export default function Button(props: ButtonProps) {
  const { children, buttonType = 'primary', ...buttonProps } = props;

  const baseStyles =
    'px-6 py-2.5 flex flex-row rounded-full justify-center items-center space-x-2';
  const styles = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    github: 'bg-slate-100 text-slate-800 hover:bg-slate-200',
  };
  const typeStyles = styles[buttonType];

  return (
    <button className={`${baseStyles} ${typeStyles}`} {...buttonProps}>
      {children}
    </button>
  );
}
