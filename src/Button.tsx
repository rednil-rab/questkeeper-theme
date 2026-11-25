import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'danger' | 'ghost' };

export function Button({ variant, className, type = 'button', ...rest }: ButtonProps) {
  const classes = ['button', variant && `button--${variant}`, className].filter(Boolean).join(' ');
  return <button {...rest} type={type} className={classes} />;
}
