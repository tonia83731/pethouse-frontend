const RandomCodeGenerator = ({
  value,
  onClick,
}: {
  value: string;
  onClick: () => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="random-code" className="font-bold text-lg md:text-xl">
        ID
      </label>
      <div className={`flex gap-2 h-[45px] md:h-[60px]`}>
        <input
          id="random-code"
          disabled
          value={value}
          className="h-full rounded-md px-4 bg-skin disabled:bg-skin-40"
        />
        <button
          className="bg-wine text-white rounded-md px-2"
          onClick={onClick}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default RandomCodeGenerator;
