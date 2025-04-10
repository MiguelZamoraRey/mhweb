export default function Spinner() {
  return (
    <div className="w-full gap-x-2 flex justify-center items-center">
      <div className="w-5 bg-[#ffffff] animate-pulse h-5 rounded-full animate-bounce"></div>
      <div className="w-5 animate-pulse h-5 bg-[#ffffff] rounded-full animate-bounce"></div>
      <div className="w-5 h-5 animate-pulse bg-[#ffffff] rounded-full animate-bounce"></div>
    </div>
  );
}
