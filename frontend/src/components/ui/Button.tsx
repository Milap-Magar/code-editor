import { type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ButtonWithIconProps {
  label: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const ButtonWithIcon = ({
  label,
  icon: Icon,
  iconPosition = "right",
  onClick,
  children,
  type = "button",
  className = "",
}: ButtonWithIconProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${className}`}
    >
      {iconPosition === "left" && Icon && <Icon className="mr-2 h-4 w-4" />}
      {label}
      {iconPosition === "right" && Icon && <Icon className="ml-2 h-4 w-4" />}
      {children}
    </button>
  );
};
