type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`page-enter w-full max-w-[960px] mx-auto px-4 sm:px-6 py-8 sm:py-12 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
