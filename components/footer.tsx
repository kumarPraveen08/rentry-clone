import Link from "next/link";
import ThemeMode from "./ui/theme-mode";

const Footer = () => {
  return (
    <div className="flex items-center justify-between my-2">
      <div className="flex items-center justify-center gap-2 cursor-pointer text-sm">
        <Link href="/">New</Link>
        <Link href="/page/what">What</Link>
        <Link href="/page/how">How</Link>
        <Link href="/page/lang">Lang</Link>
        <Link href="/page/contact">Contact</Link>
      </div>
      <ThemeMode />
    </div>
  );
};

export default Footer;
