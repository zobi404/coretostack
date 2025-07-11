import Image from "next/image";

const technologies = [
  {
    name: "sql",
    logo: "/database.png",
  },
  {
    name: "React",
    logo: "/react.png",
  },
  {
    name: "JavaScript",
    logo: "/js.png",
  },
  {
    name: "Django",
    logo: "/django.png",
  },
  {
    name: "Firebase",
    logo: "/fire.png",
  },
  {
    name: "Python",
    logo: "/python.png",
  },
  {
    name: "CSS",
    logo: "/css.png",
  },
  {
    name: "Machine Learning",
    logo: "/ai.png",
  },
];

export function LogoCarousel() {
  return (
    <div className="mt-8 relative m-auto w-full overflow-hidden bg-background before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,hsl(var(--background))_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,hsl(var(--background))_0%,rgba(255,255,255,0)_100%)] after:content-['']">
      <div className="animate-infinite-scroll flex w-[calc(250px*12)]">
        {[...technologies, ...technologies].map((tech, index) => (
          <div key={`${tech.name}-${index}`} className="flex flex-col items-center text-center mx-4">
            <div className="slide flex w-[125px] h-[80px] items-center justify-center">
              <Image 
                src={tech.logo} 
                alt={tech.name} 
                width={48} 
                height={48} 
                className="object-contain"
              />
            </div>
            <h2 className="text-sm text-primary mt-2">{tech.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
