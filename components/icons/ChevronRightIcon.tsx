interface ChevronRightIconProps {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
}

export default function ChevronRightIcon({
  width = 16,
  height = 16,
  className = "",
  fill = "black",
}: ChevronRightIconProps) {
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
        d="M5.87362 4.20919C5.59768 4.4879 5.59743 4.9397 5.87307 5.21872L8.62072 8L5.87307 10.7813C5.59743 11.0603 5.59768 11.5121 5.87362 11.7908C6.14977 12.0697 6.5975 12.0697 6.87365 11.7908L10.1256 8.50627C10.4024 8.22667 10.4024 7.77334 10.1256 7.49373L6.87365 4.20919C6.5975 3.93027 6.14977 3.93027 5.87362 4.20919Z"
        fill={fill}
      />
    </svg>
  );
}
