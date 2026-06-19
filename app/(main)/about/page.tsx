import Image from "next/image";

export default function About() {
  return (
    <section className="py-4">
      <div className="container">
        <h1 className="p1-h1">About Me</h1>
        <article className="prose dark:prose-invert">
          <Image
            src="/profile-mkhotami-tengah.jpg"
            alt="profile mkhotami"
            width={100}
            height={100}
            className="w-42 h-56 mr-4 mb-4 rounded-lg float-left object-cover object-center dark:grayscale"
          />
          <h3>Introduction</h3>
          <p>
            Hi, I’m Khotami, a full-stack web developer with strong experience in building websites using Next.js,
            Laravel, and WordPress. I focus on creating clean, fast, and user-friendly web applications.
          </p>
          <h3>Background</h3>
          <p>
            I graduated from UIN Jakarta with a degree in Arabic Literature. While the field wasn’t my true interest, I
            completed it with responsibility and discipline.
          </p>
          <p>
            After college, I explored several career paths — from teaching Arabic to trying roles in accounting and data
            analysis. But through that journey, I realized what I really needed was to commit to one skill and focus.
          </p>
          <p>
            That’s when I discovered web development. With a proper laptop in hand, I began learning from scratch —
            starting with HTML, CSS, and JavaScript, then moving into Laravel, and eventually React and Next.js.
          </p>
          <h3>Skills & Tech Stack</h3>
          <p>Over time, I’ve built real-world projects and mastered tools like:</p>
          <ul>
            <li>
              <strong>Frontend</strong>: Next.js, React, Vue, Tailwind CSS, Motion
            </li>
            <li>
              <strong>Backend</strong>: Laravel, RESTful APIs, MySQL, Mongodb, Postgresql
            </li>
            <li>
              <strong>CMS</strong>: WordPress (Elementor, Gutenberg, custom themes/plugins)
            </li>
            <li>Familiar with Git, GitHub, hosting platform like Hostinger, deployment platforms like Vercel</li>
          </ul>
          <h3>Work Values</h3>
          <ul>
            <li>Writing clean and efficient code</li>
            <li>Understanding the user’s needs</li>
            <li>Learning continuously and adapting to challenges</li>
            <li>Being reliable and committed in any team I join</li>
          </ul>
          <h3>My Goal</h3>
          <p>
            My goal is to grow as a developer who not only builds websites that work, but also makes them fast,
            accessible, and enjoyable to use. I’m focused on building a long-term career in web development by
            delivering real value in every project.
          </p>
          <h3>Personal Touch</h3>
          <p>
            Outside of tech, I enjoy summarizing what I’ve learned, exploring UI animations, and spending time with
            playing chess and watching korean drama.
          </p>
        </article>
      </div>
    </section>
  );
}
