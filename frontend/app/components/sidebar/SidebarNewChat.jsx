import { Plus } from "lucide-react";

export default function SidebarNewChat({ open }) {
  return (
    <button
      className="
        mt-10 w-full
        bg-zinc-900 hover:bg-zinc-800
        rounded-xl p-3
        flex justify-center gap-2
      "
    >
      <Plus size={18} />
      {open && "New Chat"}
    </button>
  );
}
