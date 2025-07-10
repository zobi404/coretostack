import Image from "next/image";

const technologies = [
  {
    name: "Next.js",
    logo: "/tech-logos/nextjs.png",
  },
  {
    name: "React",
    logo: "/tech-logos/react.png",
  },
  {
    name: "JavaScript",
    logo: "/tech-logos/js.png",
  },
  {
    name: "Tailwind CSS",
    logo: "/tech-logos/tailwind.png",
  },
  {
    name: "Firebase",
    logo: "/tech-logos/firebase.png",
  },
  {
    name: "Genkit",
    logo: "/tech-logos/genkit.png",
  },
];

export function LogoCarousel() {
  return (
    <div className="mt-8 relative m-auto w-full overflow-hidden bg-background before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,hsl(var(--background))_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,hsl(var(--background))_0%,rgba(255,255,255,0)_100%)] after:content-['']">
      <div className="animate-infinite-scroll flex w-[calc(250px*12)]">
        {[...technologies, ...technologies].map((tech, index) => (
          <div
            className="slide flex w-[125px] items-center justify-center"
            key={`${tech.name}-${index}`}
          >
            <Image 
              src={tech.logo} 
              alt={tech.name} 
              width={48} 
              height={48} 
              className="grayscale object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
