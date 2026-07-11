import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { SkillMeta, SkillFile } from "../types";

interface Props {
  skill: SkillMeta;
}

type Tab = "overview" | "files";

export default function SkillDetail({ skill }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [selectedFile, setSelectedFile] = useState<SkillFile | null>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);

  const hasDetail = Boolean(skill.readme || skill.skillFiles);

  return (
    <div className="space-y-0">
      {/* Header / Skill Identity */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-tertiary-fixed rounded-2xl border-2 border-on-background shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] flex items-center justify-center">
            <span className="material-symbols-outlined !text-5xl text-on-background">
              {skill.icon || "extension"}
            </span>
          </div>
          <div>
            <h1 className="font-headline-xl text-headline-xl text-on-background">
              {skill.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              {skill.author && (
                <>
                  <span className="font-label-bold text-label-bold text-secondary">
                    by
                  </span>
                  <span className="font-label-bold text-label-bold px-3 py-1 bg-surface-container border-2 border-on-background rounded-full">
                    {skill.author}
                  </span>
                </>
              )}
              {skill.version && (
                <span className="font-label-sm text-label-sm px-2 py-0.5 border-2 border-on-background rounded-full bg-secondary-container">
                  v{skill.version}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setShowInstallModal(true)}
            className="shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none bg-brand-yellow border-2 border-on-background rounded-xl px-6 py-3 font-label-bold text-on-background flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined">download</span>
            Install Skill
          </button>
          <button className="shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none bg-white border-2 border-on-background rounded-xl px-6 py-3 font-label-bold text-on-background flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined">star</span>
            Star on GitHub
          </button>
        </div>
      </section>

      {/* Tabs Navigation */}
      {hasDetail && (
        <nav className="flex gap-4 border-b-2 border-on-background mb-12">
          <button
            className={`flex items-center gap-2 px-6 py-3 font-label-bold border-t-2 border-l-2 border-r-2 border-on-background rounded-t-xl transition-all ${
              activeTab === "overview"
                ? "bg-white translate-y-[2px]"
                : "text-secondary hover:text-on-background border-transparent"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            <span className="material-symbols-outlined">description</span>
            Overview
          </button>
          {skill.skillFiles && skill.skillFiles.length > 0 && (
            <button
              className={`flex items-center gap-2 px-6 py-3 font-label-bold border-t-2 border-l-2 border-r-2 border-on-background rounded-t-xl transition-all ${
                activeTab === "files"
                  ? "bg-white translate-y-[2px]"
                  : "text-secondary hover:text-on-background border-transparent"
              }`}
              onClick={() => setActiveTab("files")}
            >
              <span className="material-symbols-outlined">folder</span>
              Files & Code
            </button>
          )}
        </nav>
      )}

      {/* Tab Content */}
      {hasDetail && activeTab === "overview" && (
        <div className="bg-white border-2 border-on-background rounded-2xl shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] p-8 max-w-4xl">
          <article className="prose prose-slate max-w-none prose-headings:text-on-background prose-a:text-tertiary prose-strong:text-on-background prose-code:text-tertiary prose-code:bg-surface-container prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-on-background prose-pre:text-surface-container-lowest prose-th:border-2 prose-th:border-on-background prose-td:border-2 prose-td:border-on-background">
            <h2 className="font-headline-md text-headline-md mb-4">README.md</h2>
            {skill.readme && (
              <div className="font-body-lg text-body-lg text-secondary mb-6 leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {skill.readme}
                </ReactMarkdown>
              </div>
            )}
            {skill.features && skill.features.length > 0 && (
              <>
                <h3 className="font-label-bold text-xl mb-3 text-on-background">
                  Key Features
                </h3>
                <ul className="space-y-3 mb-8">
                  {skill.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-tertiary">
                        check_circle
                      </span>
                      <span className="font-body-md">{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="bg-surface-container p-6 rounded-xl border-2 border-dashed border-on-background mb-6">
              <h4 className="font-label-bold mb-3">How to Install</h4>
              <ol className="space-y-2 font-body-md list-decimal list-inside">
                <li>Click the <strong>Download Skill</strong> button above</li>
                <li>Extract the downloaded folder to your Claude skills directory:</li>
              </ol>
              <code className="block font-mono text-sm bg-on-background text-white p-3 rounded-lg mt-3 mb-3">
                ~/.claude/skills/{skill.slug || "skill-name"}/
              </code>
              <ol className="space-y-2 font-body-md list-decimal list-inside" start={3}>
                <li>Restart Claude to load the new skill</li>
                <li>The skill will now be available in your Claude workflows</li>
              </ol>
            </div>
          </article>
        </div>
      )}

      {/* Simple fallback when no detail data */}
      {!hasDetail && (
        <div className="bg-white border-2 border-on-background rounded-2xl shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] p-8 max-w-4xl">
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {skill.description}
          </p>
          {skill.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-label-sm bg-surface-container px-3 py-1 rounded-full border-2 border-on-background font-label-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Files & Code Tab */}
      {hasDetail && activeTab === "files" && skill.skillFiles && (
        <>
          <div className="bg-white border-2 border-on-background rounded-2xl shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low border-b-2 border-on-background">
                <tr>
                  <th className="px-6 py-4 font-label-bold text-on-background">
                    Name
                  </th>
                  <th className="px-6 py-4 font-label-bold text-on-background">
                    Size
                  </th>
                  <th className="px-6 py-4 font-label-bold text-on-background">
                    Last Modified
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-surface-variant">
                {skill.skillFiles.map((file) => {
                  const ext = file.name.split(".").pop()?.toLowerCase();
                  const iconName =
                    file.isBinary
                      ? "image"
                      : ext === "md"
                        ? "description"
                        : ext === "json"
                          ? "settings"
                          : "code";
                  return (
                    <tr
                      key={file.name}
                      className={`hover:bg-surface-container transition-colors cursor-pointer ${
                        selectedFile?.name === file.name
                          ? "bg-surface-container"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedFile(
                          selectedFile?.name === file.name ? null : file,
                        )
                      }
                    >
                      <td className="px-6 py-4 flex items-center gap-3 font-body-md">
                        <span
                          className={`material-symbols-outlined ${
                            ext === "ts" ? "text-tertiary" : "text-secondary"
                          }`}
                        >
                          {iconName}
                        </span>
                        {file.name}
                      </td>
                      <td className="px-6 py-4 font-body-md text-secondary">
                        {file.size}
                      </td>
                      <td className="px-6 py-4 font-body-md text-secondary">
                        {file.lastModified}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Code Viewer */}
          {selectedFile && (
            <div className="mt-8">
              <div className="bg-on-background border-2 border-on-background rounded-2xl shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 bg-[#2a2a2a] border-b-2 border-on-background">
                  <span className="font-mono text-sm text-surface-container-lowest">
                    {selectedFile.name}
                  </span>
                  {selectedFile.content && (
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-lg font-label-bold text-on-background border-2 border-on-background active:translate-y-0.5 transition-all"
                      onClick={() =>
                        navigator.clipboard.writeText(selectedFile.content!)
                      }
                    >
                      <span className="material-symbols-outlined !text-sm">
                        content_copy
                      </span>{" "}
                      Copy Raw Code
                    </button>
                  )}
                </div>
                {selectedFile.content ? (
                  <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
                    <code className="text-[#f1f1f1]">{selectedFile.content}</code>
                  </pre>
                ) : (
                  <div className="p-6 text-center">
                    <span className="material-symbols-outlined !text-4xl text-surface-container-lowest/50 mb-2">
                      image
                    </span>
                    <p className="font-body-md text-surface-container-lowest/70">
                      Binary file — preview not available
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Install Modal */}
      {showInstallModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowInstallModal(false)}
        >
          <div
            className="bg-white border-2 border-on-background rounded-2xl shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] p-8 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowInstallModal(false)}
              className="absolute top-4 right-4 text-secondary hover:text-on-background transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h2 className="font-headline-lg text-headline-lg text-on-background mb-2">
              Install {skill.name}
            </h2>
            <p className="font-body-md text-secondary mb-6">
              Download the skill into your project's
              <code className="bg-surface-container px-1 py-0.5 rounded text-sm"> .claude/skills</code> folder:
            </p>

            <div className="bg-on-background rounded-xl p-4 mb-6 relative group">
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `curl -L https://github.com/ljlabs/powerup/tree/main/skills/${skill.slug} | tar -xz -C .claude/skills/`,
                  )
                }
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-surface-container/20 hover:bg-surface-container/40 text-surface-container-lowest opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Copy to clipboard"
              >
                <span className="material-symbols-outlined !text-base">content_copy</span>
              </button>
              <pre className="font-mono text-sm text-[#f1f1f1] whitespace-pre-wrap break-all">
                <code>{`curl -L https://github.com/ljlabs/powerup/tree/main/skills/${skill.slug} | tar -xz -C .claude/skills/`}</code>
              </pre>
            </div>

            <p className="font-body-sm text-secondary mb-2">
              Or browse the skill files directly:
            </p>

            <a
              href={`https://github.com/ljlabs/powerup/tree/main/skills/${skill.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-body-sm text-tertiary hover:underline mb-6"
            >
              <span className="material-symbols-outlined !text-base">open_in_new</span>
              github.com/ljlabs/powerup/tree/main/skills/{skill.slug}
            </a>

            <button
              onClick={() => setShowInstallModal(false)}
              className="w-full shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none bg-brand-yellow border-2 border-on-background rounded-xl px-6 py-3 font-label-bold text-on-background transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
