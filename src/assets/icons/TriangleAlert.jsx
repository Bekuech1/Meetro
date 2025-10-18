export default function TriangleAlert({ size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="fill-current"
    >
      <path d="M13 14H11V9H13V14ZM13 18H11V16H13V18ZM1 21H23L12 2L1 21Z" />
    </svg>
  );
}
