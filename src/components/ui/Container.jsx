export default function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-page px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}
