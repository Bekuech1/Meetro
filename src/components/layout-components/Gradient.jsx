export default function Gradient({
  color = "#AEFC40",
  className = "",
  opacity = "opacity-30",
}) {
  return (
    <div className={`relative size-[345px] ${className}`}>
      <div
        className={`absolute inset-0 rounded-full ${opacity}`}
        style={{
          boxShadow: `0 0 200px 100px ${color}`,
          backgroundColor: `${color}`,
          filter: "blur(100px)",
        }}
      />
    </div>
  );
}
