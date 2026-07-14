import Link from "next/link";

type Props = {
  menu: { label: string; url: string }[];
};

export default function AsideDesktop({ menu }: Props) {
  return (
    <nav className="hidden md:block">
      {menu.map((item, i) => (
        <Link href={item.url} key={i} className="text-sm px-3 block py-2 rounded hover:bg-gray-100">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
