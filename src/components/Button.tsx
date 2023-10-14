const Button = ({
  children,
  onClick,
  className,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}) => {
  return (
    <button
      className={`rounded-lg border border-transparent p-3 text-lg font-semibold focus:outline-none hover:border-yellow-500   focus:border-pink-600 ${className}
        ${
          variant === "secondary"
            ? "text-sm bg-stone-900 text-white"
            : "bg-yellow-400 opacity-80 text-stone-900"
        }
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
