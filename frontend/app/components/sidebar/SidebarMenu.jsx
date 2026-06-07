import { menu } from "@/app/constants/menu";
import Link from "next/link";

export default function SidebarMenu({ open }) {
  return (
    <div className="space-y-5">
      {menu.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="
            flex items-center gap-3
            p-3 rounded-xl
            hover:bg-zinc-900
          "
        >
          <item.icon size={20} />
          {open && item.name}
        </Link>
      ))}
    </div>
  );
}
