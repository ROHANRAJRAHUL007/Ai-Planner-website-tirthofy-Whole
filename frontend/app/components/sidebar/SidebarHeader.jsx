import { Menu } from "lucide-react";

export default function SidebarHeader({ open, setOpen }) {
  return (
    <div className="flex justify-between items-center mb-10">
      {open && (
        <h1 className="text-3xl font-bold">
          Trithofy.
        </h1>
      )}

      <button onClick={() => setOpen(!open)}>
        <Menu size={24} />
      </button>
    </div>
  );
}
