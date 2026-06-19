import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-4">
      <div className="container flex items-center justify-center">
        <div>
          <p className="text-center">
            <small>
              <span className="text-muted-foreground">
                Built with Next.js, ShadCN, and deployed on Vercel and Posts written in Markdown
                <br />
                by{" "}
                <Link href="https://mkhotami.com" className="text-primary">
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
