import './Loading.scss';

export const Loading = ({ className }: { className?: string }) => {
  return <div className={`loading${className ? ` ${className}` : ''}`} />;
};
