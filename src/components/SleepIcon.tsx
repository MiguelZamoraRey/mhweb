interface HouseIconProps {
  color?: string;
  width?: string;
  height?: string;
}

function SleepIcon({
  color = '#000000',
  width = '24px',
  height = '24px',
}: HouseIconProps) {
  return (
    <svg
      width={width}
      height={height}
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
    >
      <path
        d="M19.5 16L17.0248 12.6038"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12 17.5V14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M4.5 16L6.96895 12.6124"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M3 8C6.6 16 17.4 16 21 8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

export default SleepIcon;
