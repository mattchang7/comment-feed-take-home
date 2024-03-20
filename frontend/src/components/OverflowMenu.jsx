import { useEffect, useRef } from "react";

const OverflowMenu = ({ items, isOpen, toggle }) => {
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        toggle(!isOpen);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, toggle, isOpen]);

  return (
    <ul
      className="absolute top-12 right-4 bg-zinc-600 w-40 rounded-md text-sm font-normal"
      ref={ref}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className={
            i === 0 && i === items.length - 1
              ? "hover:bg-zinc-800 h-8 flex items-center rounded-md"
              : i === 0
              ? "hover:bg-zinc-800 h-8 flex items-center rounded-t-md"
              : i === items.length - 1
              ? "hover:bg-zinc-800 h-8 flex items-center rounded-b-md"
              : "hover:bg-zinc-800 h-8 flex items-center"
          }
        >
          <button className="w-full h-full" onClick={item.action}>
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default OverflowMenu;
