import { ReactNode, MouseEventHandler } from 'react';

interface CardProps
{
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function Card({ children, onClick }: CardProps) {
  return (
    <div className="gui_card" onClick={onClick}>
      {children}
    </div>
  );
}
