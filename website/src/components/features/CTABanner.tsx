import { Link } from "react-router-dom";
import ButtonSecondary from "../ui/ButtonSecondary";

export default function CTABanner() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
      <Link
        to="/docs"
        className="md:col-span-2 bg-accent-sky border-2 border-on-background rounded-2xl p-10 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] flex flex-col md:flex-row items-center gap-10 hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 transition-all"
      >
        <div className="flex-1 space-y-4">
          <h2 className="font-headline-lg text-headline-lg">Publish Your Own Skill</h2>
          <p className="font-body-md text-on-background">
            Share your custom skills with the community. Read our contributor guide to learn
            how to submit a skill to the marketplace.
          </p>
          <ButtonSecondary size="md">Read the Docs</ButtonSecondary>
        </div>
        <div className="w-full md:w-1/3 h-48 bg-white border-2 border-on-background rounded-xl shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] overflow-hidden flex items-center justify-center">
          <span className="material-symbols-outlined !text-6xl text-on-background">
            upload_file
          </span>
        </div>
      </Link>

      <div className="bg-brand-yellow border-2 border-on-background rounded-2xl p-10 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] flex flex-col justify-center text-center">
        <div className="w-20 h-20 bg-white border-2 border-on-background rounded-full mx-auto mb-6 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
          <span className="material-symbols-outlined !text-4xl text-on-background">
            bug_report
          </span>
        </div>
        <h3 className="font-headline-md text-headline-md mb-2">Found a Bug?</h3>
        <p className="font-body-md text-on-background mb-6">
          Help us improve by filing an issue on GitHub with details about what went wrong.
        </p>
        <a
          href="https://github.com/ljlabs/powerup/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-on-background text-white py-3 rounded-xl font-label-bold hover:translate-y-1 transition-all"
        >
          Open an Issue
        </a>
      </div>
    </section>
  );
}
