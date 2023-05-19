export default function Button({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#6ca0f5] w-[90px] h-[30px] rounded-md text-center text-lg text-white ${className ? className : ""}`}
    >
      {children}
    </button>
  );
}
