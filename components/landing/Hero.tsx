import Image from "next/image";
import { FaDownload, FaEye, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { contact } from "@/lib/main-content/contact";

export default function Hero() {
  return (
    <section id="hero" className="py-12">
      <div className="">
        <div className="flex flex-col sm:flex-row items-left sm:items-center justify-between gap-8">
          <div className="order-2 sm:order-1 space-y-3">
            <h1 className="h1">Hello, I am Mkhotami</h1>
            <p className="leading-relaxed text-muted-foreground">
              I’m a fullstack web developer with expertise in
              <span className="text-primary font-medium"> Next.js, Laravel, and WordPress. </span>I currently work as a
              freelance web developer, helping businesses build modern and scalable websites.{" "}
              <Link href="/about" className="underline text-primary">
                More about me
              </Link>
            </p>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size={"default"}>View CV</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <a href={contact.cvDownloadPdf} className="flex items-center">
                      <FaDownload className="mr-1" />
                      Download PDF
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={contact.cvPreview} className="flex items-center">
                      <FaEye className="mr-1" />
                      View Online
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <a href={contact.github} aria-label="GitHub Profile">
                <Button variant={"secondary"} size="icon" aria-label="GitHub Profile">
                  <FaGithub className="text-lg" />
                </Button>
              </a>
              <a href={contact.linkedin} aria-label="Linkedin Profile">
                <Button variant={"secondary"} size="icon">
                  <FaLinkedinIn className="text-lg" />
                </Button>
              </a>
            </div>
          </div>
          <Image
            src="/profile-mkhotami-samping-square.jpg"
            alt="Logo"
            width={200}
            height={200}
            className="order-1 sm:order-2 size-40 rounded-xl object-cover object-center dark:grayscale"
          />
        </div>
      </div>
    </section>
  );
}
