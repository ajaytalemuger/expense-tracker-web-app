export default function Button({
  children,
  className,
  onClick,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#5e96f0] w-[90px] h-[30px] rounded-md text-center text-lg text-white disabled:bg-[#b1c9ee] ${
        className ? className : ""
      }`}
    >
      {children}
    </button>
  );
}
