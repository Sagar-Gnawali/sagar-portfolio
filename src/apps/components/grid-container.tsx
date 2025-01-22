type GridContainerProps = {
  GridData: {
    name: string;
    icon: JSX.Element;
  }[];
};

export default function GridContainer({ GridData }: GridContainerProps) {
  return (
    <div className="grid grid-cols-3 gap-x-10 gap-y-2">
      {GridData.map((it, index) => (
        <div key={index} className=" flex justify-between">
          <p className="text-gray-400">{it.name}</p>
          <div>{it.icon}</div>
        </div>
      ))}
    </div>
  );
}
