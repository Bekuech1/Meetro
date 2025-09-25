// This wraps two input components into a single group
export default function InputGroup({ children }) {
  return (
    <div className="grid grid-cols-2 gap-1 [&>div]:first:rounded-r-none [&>div]:nth-[2]:rounded-l-none">
      {children}
    </div>
  );
}
