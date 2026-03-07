"use client";

import {
  UploadIcon,
  FileIcon,
  XIcon,
  SparklesIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ZapIcon,
  ShieldCheckIcon,
  RefreshCwIcon,
} from "lucide-react";
import { useState, useRef, DragEvent } from "react";

type AnalysisResult = {
  score: number;
  detectedSkills: string[];
  missingKeywords: string[];
  atsScore: number;
  atsFriendly: boolean;
  atsSummary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
};

export default function AnalysePage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ACCEPTED = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  function validate(f: File) {
    if (!ACCEPTED.includes(f.type))
      return "Only PDF or DOCX files are allowed.";
    if (f.size > 5 * 1024 * 1024) return "File must be under 5MB.";
    return null;
  }

  function handleFileChange(f: File | null) {
    if (!f) return;
    const err = validate(f);
    if (err) {
      setError(err);
      setFile(null);
      return;
    }
    setError("");
    setFile(f);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files?.[0] ?? null);
  }

  function handleReset() {
    setResult(null);
    setError("");
    setFile(null);
    setJobTitle("");
    setJobDescription("");
  }

  async function handleSubmit() {
    if (!file) return;

    setUploading(true);
    setResult(null);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jobTitle", jobTitle);
      formData.append("jobDescription", jobDescription);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok)
        throw new Error(data?.error || "Analysis failed. Please try again.");
      if (typeof data?.score !== "number")
        throw new Error("Unexpected response. Please try again.");

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setUploading(false);
    }
  }

  const scoreColor = (s: number) =>
    s >= 80 ? "text-emerald-600" : s >= 60 ? "text-amber-600" : "text-red-600";
  const scoreBg = (s: number) =>
    s >= 80 ? "bg-emerald-50" : s >= 60 ? "bg-amber-50" : "bg-red-50";
  const progressColor = (s: number) =>
    s >= 80 ? "bg-emerald-500" : s >= 60 ? "bg-amber-500" : "bg-red-500";
  const scoreLabel = (s: number) =>
    s >= 80 ? "Strong Match" : s >= 60 ? "Moderate Match" : "Needs Work";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap');
        .font-serif-display { font-family: 'Instrument Serif', serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .progress-fill { transition: width 1s cubic-bezier(0.4,0,0.2,1); }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .shimmer { background: linear-gradient(90deg, #f5f5f4 25%, #ede8e3 50%, #f5f5f4 75%); background-size: 400% 100%; animation: shimmer 1.4s ease infinite; }
        @keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
        .spin { animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="font-outfit bg-stone-50 min-h-screen text-stone-900">
        <nav className="h-16 border-b border-stone-200 flex items-center justify-between px-[8vw] bg-stone-50/90 backdrop-blur-md sticky top-0 z-40">
          <div className="font-serif-display text-[22px] tracking-tight">
            resume<span className="text-blue-600">ai</span>
          </div>
          <button className="px-5 py-2 rounded-lg bg-stone-900 text-stone-50 text-[13px] font-medium hover:bg-stone-800 transition-colors">
            Get Started
          </button>
        </nav>

        <div className="px-[8vw] pt-12 pb-20">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-blue-600 mb-2">
            AI-Powered · Instant Feedback
          </p>
          <h1 className="font-serif-display text-4xl text-stone-900 leading-tight tracking-tight mb-2">
            Score your resume
            <br />
            <em>against any job.</em>
          </h1>
          <p className="text-sm text-stone-500 leading-relaxed mb-10">
            Upload your resume, paste a job description,
            <br />
            and get a full breakdown in seconds.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-10 items-start">
            <div>
              <div
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className={`rounded-2xl border-[1.5px] border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 p-8 mb-5 min-h-[180px]
                  ${
                    file
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-stone-300 bg-white hover:border-blue-400 hover:bg-blue-50"
                  }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(e.target.files?.[0] ?? null)
                  }
                />

                {file ? (
                  <>
                    <div className="w-14 h-14 rounded-[14px] bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                      <FileIcon size={24} className="text-emerald-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-[15px] font-semibold text-emerald-700">
                        {file.name}
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {(file.size / 1024).toFixed(1)} KB · Ready to analyse
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setError("");
                      }}
                      className="flex items-center gap-1 text-xs text-red-500 hover:underline bg-transparent border-none cursor-pointer font-outfit"
                    >
                      <XIcon size={12} /> Remove file
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-[14px] bg-stone-100 border border-stone-200 flex items-center justify-center">
                      <UploadIcon size={22} className="text-stone-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-[15px] font-semibold text-stone-800">
                        Drop your resume here
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5">
                        PDF or DOCX · Max 5 MB · Click to browse
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-stone-500 mb-1.5">
                  Job Title
                </label>
                <input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Frontend Developer"
                  className="w-full px-3.5 py-2.5 border-[1.5px] border-stone-200 rounded-xl text-sm text-stone-900 bg-white placeholder:text-stone-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-stone-500 mb-1.5">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  className="w-full px-3.5 py-2.5 border-[1.5px] border-stone-200 rounded-xl text-sm text-stone-900 bg-white placeholder:text-stone-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-y min-h-[120px] leading-relaxed font-outfit"
                />
              </div>

              {error && (
                <div className="mb-3 flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-red-50 border border-red-100">
                  <AlertCircleIcon
                    size={14}
                    className="text-red-500 flex-shrink-0 mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-red-700 leading-relaxed">
                      {error}
                    </p>
                  </div>
                  <button
                    onClick={() => setError("")}
                    className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                  >
                    <XIcon size={13} />
                  </button>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!file || uploading}
                className="w-full py-3.5 rounded-xl bg-stone-900 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-stone-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-stone-900/15 transition-all disabled:opacity-35 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
              >
                {uploading ? (
                  <>
                    <svg
                      className="spin"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <circle
                        cx="7"
                        cy="7"
                        r="5.5"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                      />
                      <path
                        d="M7 1.5A5.5 5.5 0 0112.5 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Analysing resume...
                  </>
                ) : (
                  <>
                    <SparklesIcon size={14} />
                    Generate Analysis
                  </>
                )}
              </button>

              {result && (
                <button
                  onClick={handleReset}
                  className="mt-3 w-full py-2.5 rounded-xl border border-stone-200 text-stone-500 text-sm font-medium flex items-center justify-center gap-2 hover:bg-stone-100 hover:text-stone-700 transition-all"
                >
                  <RefreshCwIcon size={13} />
                  Start over
                </button>
              )}
            </div>

            <div>
              {!result && !uploading && (
                <div className="flex flex-col items-center justify-center min-h-[300px] gap-3 text-center">
                  <div className="w-14 h-14 rounded-[14px] border-[1.5px] border-dashed border-stone-200 flex items-center justify-center">
                    <SparklesIcon size={22} className="text-stone-300" />
                  </div>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    Results will appear here
                    <br />
                    after you generate an analysis.
                  </p>
                </div>
              )}

              {uploading && !result && (
                <div className="flex flex-col gap-3.5">
                  {[88, 120, 100, 130].map((h, i) => (
                    <div
                      key={i}
                      className="shimmer rounded-2xl"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              )}

              {result && (
                <div className="flex flex-col gap-4 fade-in">
                  <h2 className="font-serif-display text-2xl text-stone-900 tracking-tight">
                    Your Analysis
                  </h2>

                  <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                    <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-stone-400 mb-3">
                      Resume Score
                    </p>
                    <div className="flex items-center gap-5">
                      <div
                        className={`w-[72px] h-[72px] rounded-full ${scoreBg(result.score)} flex items-center justify-center flex-shrink-0`}
                      >
                        <span
                          className={`font-serif-display text-[26px] leading-none ${scoreColor(result.score)}`}
                        >
                          {result.score}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-base text-stone-900 mb-0.5">
                          {scoreLabel(result.score)}
                        </p>
                        <p className="text-xs text-stone-400 mb-2.5">
                          Out of 100 · Job match score
                        </p>
                        <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full progress-fill ${progressColor(result.score)}`}
                            style={{ width: `${result.score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-stone-400 mb-3 flex items-center gap-1.5">
                        <ZapIcon size={10} className="text-blue-500" /> Detected
                        Skills
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.detectedSkills.map((s) => (
                          <span
                            key={s}
                            className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-stone-400 mb-3 flex items-center gap-1.5">
                        <AlertCircleIcon size={10} className="text-red-400" />{" "}
                        Keyword Gaps
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.missingKeywords.map((s) => (
                          <span
                            key={s}
                            className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                    <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-stone-400 mb-3 flex items-center gap-1.5">
                      <ShieldCheckIcon
                        size={10}
                        className={
                          result.atsFriendly
                            ? "text-emerald-500"
                            : "text-amber-500"
                        }
                      />
                      ATS Optimization
                    </p>
                    <div className="flex items-center gap-2.5 mb-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold
                        ${
                          result.atsFriendly
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}
                      >
                        {result.atsFriendly
                          ? "✓ ATS Friendly"
                          : "⚠ Needs Improvement"}
                      </span>
                      <span className="text-xs text-stone-400">
                        ATS score: {result.atsScore}/100
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {result.atsSummary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-stone-400 mb-3 flex items-center gap-1.5">
                        <CheckCircleIcon
                          size={10}
                          className="text-emerald-500"
                        />{" "}
                        Strengths
                      </p>
                      <ul className="space-y-2.5 list-none p-0 m-0">
                        {result.strengths.map((s, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-[13px] text-stone-600 leading-snug"
                          >
                            <span className="w-[18px] h-[18px] rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold">
                              ✓
                            </span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-stone-400 mb-3 flex items-center gap-1.5">
                        <SparklesIcon size={10} className="text-violet-500" />{" "}
                        Suggestions
                      </p>
                      <ul className="space-y-2.5 list-none p-0 m-0">
                        {result.suggestions.map((s, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-[13px] text-stone-600 leading-snug"
                          >
                            <span className="w-[18px] h-[18px] rounded-full bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold">
                              →
                            </span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
