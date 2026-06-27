import Link from "next/link";
import Logo from "../Logo";
import LinkToLang from "../LinkToLang";

export default function Footer() {
  return (
    <footer className="text-white">
      <div className="bg-gray-700 py-6">
        <div className="container flex justify-between">
          <Logo />
          <LinkToLang />
        </div>
      </div>
      <div className="bg-gray-800 py-2">
        <div className="container">
          <p className="text-center">
            <small>
              <span className="text-muted">
                Built with Next.js, ShadCN, and deployed on Vercel and Posts written in Markdown
                <br />
                by{" "}
                <Link href="https://mkhotami.com" className="text-gray-200">
                  Mkhotami
                </Link>{" "}
                in 2025
              </span>
            </small>
          </p>
        </div>
      </div>
    </footer>
  );
}
