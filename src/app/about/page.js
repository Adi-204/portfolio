import Link from "next/link";
export default function About() {
  return (
    <div className=" flex flex-col w-full md:flex-row-reverse h-full items-center gap-x-10 gap-y-10 justify-center pb-10 md:pb-0">
      <div className="flex flex-col font-ropaSans w-4/5 md:w-2/5 lg:w-1/3 text-md text-white gap-y-4">
        <h2 className="text-accent-text opacity-70">Adi Boghawala</h2>
        <h2>
          I am a Computer Science student at IIIT Pune who loves turning ideas into impactful web and mobile experiences.
        </h2>

        <h2>
          I'm proficient in{" "}
          <span className="text-[#DED7FC] italic ">
            JavaScript, TypeScript and C++ with a lot of experience in full-stack development (React, Next.js, Node.js, Express.js, MongoDB, PostgreSQL) and cloud platforms (AWS).
          </span>{" "}
          I excel at translating designs into clean, maintainable code and pushing the boundaries of conventional thinking to build ambitious projects.
        </h2>

        <h2>
          Currently, I’m an active Google Summer of Code 2025 Mentee with the{" "}
          <span className="text-[#DED7FC] hover:opacity-70  transform transition-all duration-300">
            <Link href={"https://www.asyncapi.com/en"} target={"_blank"}>
              AsyncAPI Initiative organization
            </Link>
          </span>{" "}
          developing templates and tools to streamline microservices testing and WebSocket integrations. I’m developing maintainer skills by handling issue triaging, bug fixes, PR reviews, writing tests, improving documentation, helping newcomers to contribute and guiding the project's long-term growth. 
        </h2>
        <h2>
          I'm passionate about embracing new challenges and build solutions that make a positive impact. Open to collaborations let’s build something amazing together! 🚀
        </h2>
        <Link
          href="/search?q=Adi-projects"
          className="border border-[#DED7FC] flex flex-row w-full items-center justify-center rounded-md p-4 hover:bg-[#DED7FC] hover:text-dark-purple-100 transform transition-all duration-300"
        >
          Discover my projects
        </Link>
      </div>
      <div className="flex md:flex-col-reverse items-center justify-start">
        <div
          className="bg-no-repeat bg-cover w-32 h-32 md:w-48 md:h-48"
          style={{ backgroundImage: `url("head-shot.png")` }}
        />
      </div>
    </div>
  );
}
