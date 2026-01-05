interface EyeIconProps {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
}

export default function EyeIcon({
  width = 16,
  height = 16,
  className = "",
  fill = "#1a1a1a",
}: EyeIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 3C4.5 3 1.73 5.11 0.5 8C1.73 10.89 4.5 13 8 13C11.5 13 14.27 10.89 15.5 8C14.27 5.11 11.5 3 8 3ZM8 11.5C6.07 11.5 4.5 9.93 4.5 8C4.5 6.07 6.07 4.5 8 4.5C9.93 4.5 11.5 6.07 11.5 8C11.5 9.93 9.93 11.5 8 11.5ZM8 6C6.9 6 6 6.9 6 8C6 9.1 6.9 10 8 10C9.1 10 10 9.1 10 8C10 6.9 9.1 6 8 6Z"
        fill={fill}
      />
    </svg>
  );
}
