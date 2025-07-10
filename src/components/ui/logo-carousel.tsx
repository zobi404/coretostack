import { cn } from "@/lib/utils";

const technologies = [
  {
    name: "Next.js",
    logo: (
      <svg width="48" height="48" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="64" fill="black" />
        <path
          d="M107.421 111.415C99.8518 114.932 91.4828 117 82.6074 117C64.637 117 49.3335 108.638 39.3683 94.634L64.7179 53.0416V117C69.6556 117 74.4533 116.143 78.8514 114.613L107.421 111.415Z"
          fill="url(#paint0_linear_1_2)"
        />
        <path
          d="M83.4062 17.0001L39.3672 94.6341C48.1328 108.038 63.8349 117 82.6063 117C83.0053 117 83.4062 116.974 83.8043 116.95L83.4062 17.0001Z"
          fill="url(#paint1_linear_1_2)"
        />
        <defs>
          <linearGradient id="paint0_linear_1_2" x1="107.421" y1="111.415" x2="33.8293" y2="88.2407" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="paint1_linear_1_2" x1="83.8043" y1="116.95" x2="63.8349" y2="53.0416" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "React",
    logo: (
      <svg width="48" height="48" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "JavaScript",
    logo: (
      <svg width="48" height="48" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#F7DF1E" d="M0 0h256v256H0z"/>
        <path d="M68 83h31l4 21h-25l-4-21zm72 71c0 14-8 23-22 23s-22-9-22-23c0-15 8-23 22-23s22 8 22 23zm-11-1c0-9-5-14-11-14s-11 5-11 14 5 14 11 14 11-5 11-14zm-30-29h20v-10h-29l4 47h22v-10h-13l-3-27zm-27-21c0-9 5-13 12-13s12 4 12 13c0 8-4 13-12 13s-12-5-12-13zm11-1c0-4-2-6-4-6s-5 2-5 6 2 6 5 6 4-2 4-6z"/>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    logo: (
        <svg width="48" height="48" viewBox="0 0 256 154" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#38BDF8" d="M128 0c-43.3 0-66.6 20-76 37.3C62.6 57.3 84.7 77.3 128 77.3s65.4-20 76-37.3C194.6 20 171.3 0 128 0zM128 76.8c-43.3 0-66.6 20-76 37.3C62.6 136.8 84.7 154 128 154s65.4-17.2 76-37.3C194.6 96.8 171.3 76.8 128 76.8z"/>
        </svg>
    ),
  },
  {
    name: "Firebase",
    logo: (
      <svg width="48" height="48" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.8,53.8a2,2,0,0,1-1.9-2.9L24.8,5.1a2,2,0,0,1,3.8,1L11.7,51.9A2,2,0,0,1,9.8,53.8Z" fill="#FFC24A"/>
        <path d="M42.3,62,9.8,53.8a2,2,0,0,1,1.9-3.5L52.5,58a2,2,0,0,1-1.3,3.8A2,2,0,0,1,49.4,62Z" fill="#F4BD62"/>
        <path d="M26.2,6.1,10.1,51.4,42.3,62,54,16.5Z" fill="#FFA000"/>
        <path d="M11.7,51.9,9.8,53.8,42.3,62l-1-2.2Z" fill="#F57C00"/>
        <path d="M54,16.5,24.8,5.1a2,2,0,0,1,1.4-3.8,2,2,0,0,1,2.4,2.5L54.4,14.6A2.1,2.1,0,0,1,54,16.5Z" fill="#FFCA28"/>
      </svg>
    ),
  },
  {
    name: "Genkit",
    logo: (
      <svg width="48" height="48" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path fill="#4285F4" d="M896 128H128v768h768V128z"/>
        <path fill="#FFF" d="m480.9 618.3l-105-105.1l-105 105.1l-60.3-60.3l105.1-105.1l-105.1-105l60.3-60.3l105 105l105.1-105l60.3 60.3l-105.1 105l105.1 105.1zM736 512h-96v-64h96v64zm-96 128h96v-64h-96v64zm-256-64H128v64h256v-64z"/>
      </svg>
    ),
  },
];

export function LogoCarousel() {
  return (
    <div className="mt-8 relative m-auto w-full overflow-hidden bg-background before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,hsl(var(--background))_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,hsl(var(--background))_0%,rgba(255,255,255,0)_100%)] after:content-['']">
      <div className="animate-infinite-scroll flex w-[calc(250px*12)]">
        {[...technologies, ...technologies].map((tech, index) => (
          <div
            className="slide flex w-[125px] items-center justify-center grayscale"
            key={`${tech.name}-${index}`}
          >
            {tech.logo}
          </div>
        ))}
      </div>
    </div>
  );
}
