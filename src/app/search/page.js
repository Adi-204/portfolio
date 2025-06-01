"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import projects from "../../data/projects.json";
import experiences from "../../data/experience.json";
import blogs from "../../data/blogs.json";

export default function Search() {
  const [isHover, setIsHover] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q");
  const project = searchParams.get("p");
  const [selectedSearch, setSelectedSearch] = useState(
    project === "meetmidway"
      ? projects.find((proj) => proj.alias === "meetmidway")
      : ""
  );
  const displayQuery = query ? query : "";
  const displayData =
    (displayQuery == "Adi-projects" && [...projects]) ||
    (displayQuery == "experience" && [...experiences]) ||
    (displayQuery == "blogs" && [...blogs]) || [];

  const [showMore, setShowMore] = useState(false);
  const [isOpen, setIsOpen] = useState(project === "meetmidway" ? true : false);
  const languages = [
    "Python",
    "Java",
    "C",
    "C++",
    "JavaScript",
    "Typescript",
    "HTML",
    "CSS",
    "SQL"
  ];
  const technologies = [
    "React JS",
    "Nodejs",
    "Next JS",
    "Tailwind CSS",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Express.js",
    "Mongoose",
    "Jest",
    "Podman",
    "MongoDB",
    "MySQL"
  ];

  useEffect(() => {
    if (project) {
      const params = new URLSearchParams(searchParams);
      params.delete("p");
      router.replace(`?${params.toString()}`, { shallow: true });
    }
  }, [project, searchParams, router]);

  const handleSelect = (data) => {
    setIsOpen(true);
    setSelectedSearch(data);
  };

  const SearchItem = ({ data }) => {
    return (
      <div className="font-ropaSans flex flex-row gap-x-2" style={{ zIndex: 10 }}>
        <div className="w-4/5">
          <div className="flex flex-row items-center gap-x-4">
            <div className="bg-dark-purple-300 rounded-full w-8 h-8 flex items-center justify-center">
              <div
                className="bg-no-repeat bg-cover w-5 h-5"
                style={{ backgroundImage: `url(icons/key.svg)` }}
              />
            </div>
            <div className="font-light leading-tight">
              <h2>{data.title}</h2>
              <h2 className="opacity-75 text-sm">{data.timeline}</h2>
            </div>
          </div>
          <h2
            className="text-search-blue text-xl hover:underline cursor-pointer"
            onClick={() => handleSelect(data)}
          >
            {data.headline}
          </h2>
          <h2 className="text-white opacity-50">{data.searchDescription}</h2>
        </div>
      </div>
    );
  };

  const SearchItemOpen = ({ data }) => {
    return (
      <div>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-40 flex items-center justify-center p-4">
          <div className={`p-2 flex flex-col items-center w-full max-w-2xl bg-accent-color rounded-lg shadow-lg z-50 max-h-[90vh]`}>
            <div className="flex row w-full justify-end mb-2">
              <div
                className="bg-no-repeat bg-cover w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity duration-150"
                style={{ backgroundImage: "url(icons/exit.svg)" }}
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div className="flex flex-col w-full items-center justify-start h-full p-4 gap-y-2 overflow-hidden">
              <h2 className="w-full text-2xl">{data.title}</h2>

              {(data.links && data.links.length > 0) && (
                <div className={`flex flex-row w-full gap-x-2 flex-wrap`}>
                  {data.links.map((link, idx) => (
                    <Link
                      className={`flex flex-row py-1.5 px-3 text-sm font-medium text-center items-center gap-x-2 rounded border border-stone-700 transform transition-all duration-300 ${link.name == "github"
                          ? "bg-dark-purple-300 hover:bg-[#4D456E] border-dark-purple-300 flex-row-reverse"
                          : "bg-white text-dark-purple-100 hover:bg-stone-200 hover:text-dark-purple-300"
                        }`}
                      key={idx}
                      href={link.link}
                      target={"_blank"}
                      onMouseEnter={() => setIsHover(true)}
                      onMouseLeave={() => setIsHover(false)}
                    >
                      <h2>{link.name}</h2>
                      <div
                        className={`bg-no-repeat bg-cover ${link.name == "video" ? "w-6 h-6" : "w-4 h-4"
                          }`}
                        style={{
                          backgroundImage: `url(icons/${isHover ? link.urlHover : link.url
                            })`,
                        }}
                      />
                    </Link>
                  ))}
                </div>
              )}

              <div className="relative w-full h-full overflow-y-auto text-wrap scroll-smooth">
                <div className="font-thin">{data.longDescription}</div>
              </div>

              {data.type == "project" && data.tech && (
                <div className="flex flex-wrap gap-2 overflow-y-auto p-2">
                  {data.tech.map((stack, idx) => (
                    <div
                      key={idx}
                      className="bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                    >
                      {stack}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full text-white font-ropaSans">
      <div className="flex flex-col w-full relative ">
        <div className="borber-b border-[0.05rem] border-white border-opacity-10" />
        <div className="w-full flex flex-row gap-x-20 py-10">
          <div className="flex flex-col gap-y-4 px-4 md:w-1/2 lg:pl-48">
            {(displayQuery !== "why-hire-a-Adi" &&
              displayData.map((data, idx) => (
                <div key={idx}>
                  <SearchItem data={data} />
                </div>
              ))) || (
                <div className="flex flex-col gap-y-2">
                  <div className="flex flex-row gap-x-2 items-center">
                    <div
                      className="bg-no-repeat bg-cover w-4 h-5"
                      style={{ backgroundImage: "url(icons/star.svg)" }}
                    />
                    <h2>AI Overview</h2>
                  </div>

                  <div
                    className={`flex flex-col gap-y-3 relative ${showMore ? "h-auto" : "h-60 overflow-y-hidden"
                      }`}
                  >
                    {!showMore && (
                      <>
                        <h2>
                          <span className="bg-[#735B95] py-1">
                            I transform environments.
                          </span>
                        </h2>
                        <h2>
                          <span className="bg-[#735B95] py-1">
                            seeking global opportunities to specialize in emerging
                            technologies and apply my skills in software, project
                            management, and problem solving.
                          </span>
                        </h2>
                      </>
                    )}

                    <h2>
                      I take full ownership of challenges and move projects forward independently—whether that's designing a new microservice architecture, optimizing CI/CD pipelines with Podman, or delivering critical AsyncAPI Generator features during GSoC'25. You won't need to spoon-feed me tasks; I proactively identify gaps, research solutions overnight, and return with a clear plan to unblock the team.
                    </h2>

                    <h2>
                      My communication style blends clarity with assertiveness: I distill complex technical proposals into three-point summaries for stakeholders, and I give and receive code-review feedback rooted in data and best practices. This transparent approach builds trust, accelerates decision-making, and prevents costly misunderstandings.
                    </h2>

                    <h2>
                      I write more than working code—I craft maintainable, well-documented solutions that stand the test of time. From defining robust API contracts in Node/Express to architecting React/Next.js frontends with ESLint and PostCSS standards, I ensure every line of code supports scalability, security, and easy collaboration.
                    </h2>

                    <h2>
                      Hire me for my proven track record of delivering measurable impact: I've built AI-driven budgeting tools in FinanceFriend, implemented sentiment-analysis recovery features in NutriPlan, and contributed core templates to AsyncAPI Generator via GSoC'25. My relentless drive for innovation and continuous improvement guarantees products that delight users and move business KPIs.
                    </h2>
                  </div>

                  {!showMore && (
                    <div className="flex flex-col justify-end md:px-48 absolute left-0 w-full -bottom-8">
                      <button
                        onClick={() => setShowMore(!showMore)}
                        className="mt-3 py-3 border border-accent-color w-full rounded-full sm:w-3/4 md:w-2/3 lg:w-2/5 bg-dark-purple-200 flex items-center justify-center hover:bg-[#322C48] gap-x-2 cursor-pointer"
                      >
                        <h2>Show More</h2>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18 9L12 15L6 9" stroke="#C48DF6" />
                        </svg>
                      </button>

                      <div className="borber-b border-[0.05rem] border-accent-text border-opacity-50 w-full mt-3" />
                    </div>
                  )}
                </div>
              )}
          </div>

          {displayQuery === "blogs" && (
            <div className="hidden w-1/3 p-2 h-[40rem] border-[0.05rem] border-white border-opacity-30 shadow-xl rounded-lg md:flex flex-col gap-y-3 ">
              <img
                src="blog.png"
                alt="Adi writing"
                className="w-full h-[17rem] rounded-t-lg"
              />
              <div className="flex flex-col gap-y-3 p-2">
                <h2 className="text-xl">"Writing is thinking on paper"</h2>
                <h2 className="opacity-70 text-lg">
                  I believe in documenting my journey—the wins, the failures, and the lessons in between.
                </h2>
                <h2 className="opacity-70 text-lg">
                  These blogs capture my thought process, technical deep dives, and personal reflections.
                </h2>
                <h2 className="opacity-70 text-lg">
                  From open-source contributions to competitive programming experiences,
                  each post tells a story of growth.
                </h2>
              </div>
            </div>
          )}

          {displayQuery === "Adi-projects" && (
            <div className="hidden w-1/3 p-2 h-[40rem] border-[0.05rem] border-white border-opacity-30 shadow-xl rounded-lg md:flex flex-col gap-y-3 ">
              <img
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=Adi-204&layout=compact&theme=nightowl&hide_border=true&exclude_repo=the-www-blog,clean-water-foundation&langs_count=6"
                alt="Adi"
                className="w-full h-[17rem] rounded-t-lg"
              />
              <div className="flex flex-col gap-y-3">
                <h2 className="opacity-70 text-lg">
                  I love building impact-driven, full-stack projects.{" "}
                </h2>
                <h2 className="opacity-70 text-lg">
                  Currently, I'm working on specializing my technical skills
                  in Next JS.
                </h2>
                <div className="flex flex-col">
                  <h2 className="uppercase tracking-wider text-sm">
                    languages
                  </h2>
                  <div className="flex flex-row flex-wrap gap-2">
                    {languages.map((stack, idx) => (
                      <div
                        key={idx}
                        className="inline-flex bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                      >
                        {stack}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col">
                  <h2 className="uppercase tracking-wider text-sm">
                    Frameworks & Libraries
                  </h2>
                  <div className="flex flex-row flex-wrap gap-2">
                    {technologies.map((stack, idx) => (
                      <div
                        key={idx}
                        className="inline-flex bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                      >
                        {stack}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {displayQuery === "experience" && (
            <div className="hidden w-1/3 p-2 h-[40rem] border-[0.05rem] border-white border-opacity-30 shadow-xl rounded-lg md:flex flex-col gap-y-3 ">
              <img
                src="search-img/life.jpeg"
                alt="Adi"
                className="w-full h-[17rem] rounded-t-lg"
              />
              <div className="flex flex-col gap-y-3 p-2">
                <h2 className="text-xl">"Lead a life worth telling"</h2>
                <h2 className="opacity-70 text-lg">
                  This is one of my favourite quotes of all as it reminds me to prioritize experiences over possessions,
                  pushing me to explore, learn, and grow through new adventures.
                </h2>
                <h2 className="opacity-70 text-lg">
                  The following is curated log of those moments when I stepped beyond my
                  comfort zone to create unforgettable stories.
                </h2>
                <h2 className="opacity-70 text-lg">
                  No frills, no filters—just raw moments that shaped who I am.
                </h2>
                <h2 className="opacity-70 text-lg">
                  Dive in and witness the journey of turning the unexpected into the extraordinary.
                </h2>
              </div>
            </div>
          )}
        </div>

        {isOpen && <SearchItemOpen data={selectedSearch} />}
      </div>
    </div>
  );
}
