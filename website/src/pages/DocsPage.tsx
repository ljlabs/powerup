import { Link } from "react-router-dom";
import ButtonSecondary from "../components/ui/ButtonSecondary";

const sections = [
  {
    id: "overview",
    title: "What are Skills?",
    body: `Skills are reusable capability packages that extend Claude's functionality. They can contain prompts, tool configurations, scripts, and documentation. Skills are shared as simple markdown packages with a standard structure.`,
  },
  {
    id: "structure",
    title: "Skill Package Structure",
    body: `Every skill follows the same directory layout. At minimum you need a SKILL.md file — that's the only hard requirement. Everything else is optional depending on what your skill does.`,
    code: `my-skill/\n├── SKILL.md          # Required — skill description, usage, and trigger rules\n├── README.md         # Optional — public-facing documentation\n├── src/              # Optional — scripts, tool wrappers, or runtime code\n│   └── index.ts\n├── prompts/          # Optional — prompt templates\n│   └── system.md\n├── examples/         # Optional — example inputs/outputs\n└── package.json      # Optional — if your skill runs code`,
  },
  {
    id: "skill-md",
    title: "The SKILL.md File",
    body: `This is the core of your skill. It tells Claude what the skill does, when to use it, and how to invoke it. Write it clearly — this is what gets loaded into context.`,
    code: `# My Skill Name\n\nShort description of what this skill does and when to use it.\n\n## When to Use\n- Describe trigger conditions here\n- e.g. "Use when the user asks to generate charts"\n\n## How to Use\n1. Step one\n2. Step two\n3. Step three\n\n## Examples\n\`\`\`bash\n# Example invocation\nsome-command --flag value\n\`\`\``,
  },
  {
    id: "publish",
    title: "How to Publish",
    body: `Skills are submitted to the Claude Skills Storefront by opening a pull request on the GitHub repository.`,
    steps: [
      "Fork the Claude Skills repository on GitHub.",
      "Create a new directory under skills/ with your skill name as the folder name.",
      "Add your SKILL.md and any supporting files inside that directory.",
      "Open a pull request with a clear title and description of what your skill does.",
      "A maintainer will review your submission and merge it if it meets the guidelines.",
    ],
  },
  {
    id: "guidelines",
    title: "Submission Guidelines",
    guidelines: [
      "Your SKILL.md must have a clear title, description, and usage instructions.",
      "Do not include sensitive data, API keys, or credentials in your skill files.",
      "Keep your skill focused — one skill should do one thing well.",
      "Include at least one example of how to use the skill.",
      "Use MIT or Apache-2.0 license for any code you include.",
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1 font-label-bold text-secondary hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined !text-base">arrow_back</span>
        Back to Home
      </Link>

      <div className="bg-white border-2 border-on-background rounded-2xl shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] p-8">
        <h1 className="font-headline-xl text-headline-xl mb-4">Contributor Guide</h1>
        <p className="font-body-lg text-body-lg text-secondary mb-8 leading-relaxed">
          Learn how to build, package, and publish your own skills to the Claude Skills
          Storefront.
        </p>

        <nav className="flex flex-wrap gap-2 mb-10">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1 rounded-full border-2 border-on-background bg-surface-container font-label-sm text-label-sm hover:bg-tertiary-container transition-colors"
            >
              {s.title}
            </a>
          ))}
        </nav>

        <div className="space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="font-headline-md text-headline-md mb-3">{s.title}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed whitespace-pre-line">
                {s.body}
              </p>

              {s.code && (
                <pre className="bg-on-background text-white rounded-xl p-6 overflow-x-auto text-sm font-mono leading-relaxed mb-4">
                  <code>{s.code}</code>
                </pre>
              )}

              {s.steps && (
                <ol className="space-y-3 mb-4">
                  {s.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 font-body-md text-body-md">
                      <span className="flex-shrink-0 w-7 h-7 bg-brand-yellow border-2 border-on-background rounded-full flex items-center justify-center font-label-bold text-label-bold text-on-background">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              )}

              {s.guidelines && (
                <ul className="space-y-3 mb-4">
                  {s.guidelines.map((g, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-tertiary mt-0.5">
                        check_circle
                      </span>
                      <span className="font-body-md text-body-md">{g}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t-2 border-on-background flex flex-col sm:flex-row gap-4">
          <Link to="/skills">
            <ButtonSecondary size="md">Browse Skills</ButtonSecondary>
          </Link>
          <a
            href="https://github.com/ljlabs/powerup/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ButtonSecondary size="md">Report an Issue</ButtonSecondary>
          </a>
        </div>
      </div>
    </div>
  );
}
