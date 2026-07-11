import { Link } from "react-router-dom";
import ButtonSecondary from "../ui/ButtonSecondary";

export default function CTABanner() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
      <Link
        to="/skills"
        className="md:col-span-2 bg-accent-sky border-2 border-on-background rounded-2xl p-10 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] flex flex-col md:flex-row items-center gap-10 hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 transition-all"
      >
        <div className="flex-1 space-y-4">
          <h2 className="font-headline-lg text-headline-lg">Build Your Own Skill</h2>
          <p className="font-body-md text-on-background">
            Are you a developer? Our SDK makes it incredibly easy to publish your
            own tools and earn credits.
          </p>
          <ButtonSecondary size="md">Get Developer Docs</ButtonSecondary>
        </div>
        <div className="w-full md:w-1/3 h-48 bg-white border-2 border-on-background rounded-xl shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] overflow-hidden flex items-center justify-center">
          <span className="material-symbols-outlined !text-6xl text-on-background">
            code_blocks
          </span>
        </div>
      </Link>

      <div className="bg-brand-yellow border-2 border-on-background rounded-2xl p-10 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] flex flex-col justify-center text-center">
        <div className="w-20 h-20 bg-white border-2 border-on-background rounded-full mx-auto mb-6 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
          <span className="material-symbols-outlined !text-4xl text-on-background">
            groups
          </span>
        </div>
        <h3 className="font-headline-md text-headline-md mb-2">Join the Discord</h3>
        <p className="font-body-md text-on-background mb-6">
          Discuss new skills with 50,000+ creators.
        </p>
        <a
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-on-background text-white py-3 rounded-xl font-label-bold hover:translate-y-1 transition-all"
        >
          Launch Community
        </a>
      </div>
    </section>
  );
}