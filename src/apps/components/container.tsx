type ContainerPrps = {
  children: React.ReactNode;
  className?: string;
};
export default function Container({ children, className }: ContainerPrps) {
  return (
    <div className={`p-[10px] m-[50px] mx-[20px] md:m-[40px] md:mx-[200px] ${className}}`}>
      {children}
    </div>
  );
}
