import PortfolioGrid from "./PortfolioGrid";

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <section className="text-center mb-16 md:mb-24">
        <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">Our Portfolio</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We're proud of the work we've done. Explore our projects to see how we've helped businesses like yours succeed.
        </p>
      </section>
      <PortfolioGrid />
    </div>
  );
}
