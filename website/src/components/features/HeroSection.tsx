import SearchBar from "../ui/SearchBar";

interface Props {
  onSearch?: (query: string) => void;
}

export default function HeroSection({ onSearch }: Props) {
  return (
    <section className="mb-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
      <div className="md:w-3/5 space-y-4">
        <div className="inline-block bg-accent-lavender px-4 py-1 border-2 border-on-background rounded-full font-label-sm shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
          NEW VERSION 2.0
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-background leading-tight">
          Give Claude New{" "}
          <span className="text-tertiary">Superpowers</span>
        </h1>
        <p className="font-body-lg text-body-lg text-secondary max-w-xl">
          Discover, install, and create custom &quot;Skills&quot; that extend
          Claude&apos;s capabilities. From complex data analysis to specialized
          creative workflows.
        </p>
        <div className="mt-10 max-w-2xl">
          <SearchBar
            placeholder="Search for tools, prompts, or agents..."
            size="lg"
            showButton
            onSearch={onSearch}
          />
        </div>
      </div>

      <div className="md:w-2/5 flex justify-center relative">
        <div className="relative z-10 w-72 h-72 md:w-96 md:h-96 bg-accent-mint border-4 border-on-background rounded-2xl shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] flex items-center justify-center">
          <div className="w-4/5 h-4/5 rounded-xl bg-white border-2 border-on-background flex items-center justify-center overflow-hidden">
            <img
              src="/favicon.png"
              alt="Claude Skills"
              className="w-full h-full object-contain p-2"
            />
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-yellow border-4 border-on-background rounded-full shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] z-0 animate-bounce" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-accent-sky border-4 border-on-background rounded-2xl shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] z-0 rotate-12" />
      </div>
    </section>
  );
}
