import { useState } from "react";
import type { SkillMeta, SkillFile } from "../types";

interface Props {
  skill: SkillMeta;
}

type Tab = "overview" | "files";

export default function SkillDetail({ skill }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [selectedFile, setSelectedFile] = useState<SkillFile | null>(null);

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
          <button className="shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none bg-brand-yellow border-2 border-on-background rounded-xl px-6 py-3 font-label-bold text-on-background flex items-center gap-2 transition-all">
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
          <article className="prose prose-slate max-w-none">
            <h2 className="font-headline-md text-headline-md mb-4">README.md</h2>
            {skill.readme && (
              <p className="font-body-lg text-body-lg text-secondary mb-6 leading-relaxed whitespace-pre-line">
                {skill.readme}
              </p>
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
            {skill.useCommand && (
              <div className="bg-surface-container p-6 rounded-xl border-2 border-dashed border-on-background mb-6">
                <h4 className="font-label-bold mb-2">How to Use</h4>
                <code className="block font-mono text-sm bg-on-background text-white p-3 rounded-lg">
                  {skill.useCommand}
                </code>
              </div>
            )}
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
                  const ext = file.name.split(".").pop();
                  const iconName =
                    ext === "md"
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
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-lg font-label-bold text-on-background border-2 border-on-background active:translate-y-0.5 transition-all"
                    onClick={() =>
                      navigator.clipboard.writeText(selectedFile.content)
                    }
                  >
                    <span className="material-symbols-outlined !text-sm">
                      content_copy
                    </span>{" "}
                    Copy Raw Code
                  </button>
                </div>
                <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
                  <code className="text-[#f1f1f1]">{selectedFile.content}</code>
                </pre>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
