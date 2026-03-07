"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function LandingPage() {
  const heroBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate progress bar
    const t = setTimeout(() => {
      if (heroBarRef.current) heroBarRef.current.style.width = "84%";
    }, 400);

    // Scroll-triggered fade-up
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap');
        .font-serif-display { font-family: 'Instrument Serif', serif; }
        .progress-fill { transition: width 1.4s cubic-bezier(0.4,0,0.2,1) 0.5s; }
        .fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        .float-1 { animation: float 3s ease-in-out infinite; }
        .float-2 { animation: float 3s ease-in-out infinite; animation-delay: 1.5s; }
      `}</style>

      <div className="font-[Outfit,sans-serif] bg-stone-50 text-stone-900 overflow-x-hidden">
        {/* NAV */}
        <nav className="h-16 border-b border-stone-200 flex items-center justify-between px-[8vw] bg-stone-50/90 backdrop-blur-md sticky top-0 z-40">
          <Link
            href="/"
            className="font-serif-display text-[22px] tracking-tight text-stone-900 no-underline"
          >
            resume<span className="text-blue-600">ai</span>
          </Link>
          <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
            <li>
              <a
                href="#how"
                className="text-[13px] text-stone-500 hover:text-stone-900 transition-colors no-underline font-medium"
              >
                How it works
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="text-[13px] text-stone-500 hover:text-stone-900 transition-colors no-underline font-medium"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#reviews"
                className="text-[13px] text-stone-500 hover:text-stone-900 transition-colors no-underline font-medium"
              >
                Reviews
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-2.5">
            <Link
              href="#"
              className="px-4 py-2 rounded-lg border border-stone-200 text-[13px] font-medium text-stone-700 hover:bg-stone-100 transition-all no-underline"
            >
              Sign in
            </Link>
            <Link
              href="/analyse"
              className="px-4 py-2 rounded-lg bg-stone-900 text-white text-[13px] font-semibold hover:bg-stone-800 transition-colors no-underline flex items-center gap-1.5"
            >
              <SparkleIcon />
              Try free
            </Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="px-[8vw] pt-20 pb-24 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="fade-up visible text-[11px] font-semibold tracking-[0.12em] uppercase text-blue-600 mb-3">
              AI-Powered · Instant Feedback
            </p>
            <h1 className="fade-up visible delay-1 font-serif-display text-5xl lg:text-6xl text-stone-900 leading-[1.08] tracking-tight mb-5">
              Land your
              <br />
              dream job
              <br />
              <em>faster.</em>
            </h1>
            <p className="fade-up visible delay-2 text-[15px] text-stone-500 leading-relaxed mb-9 max-w-[440px]">
              Upload your resume, paste any job description, and get an instant
              AI-powered score with actionable feedback to beat the ATS and
              impress hiring managers.
            </p>
            <div className="fade-up visible delay-3 flex items-center gap-3 flex-wrap">
              <Link
                href="/analyse"
                className="px-7 py-3.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-stone-900/15 transition-all no-underline flex items-center gap-2"
              >
                <SparkleIcon />
                Analyse my resume
              </Link>
              <a
                href="#how"
                className="px-5 py-3.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-700 hover:bg-stone-100 transition-all no-underline"
              >
                See how it works
              </a>
            </div>
            <div className="fade-up visible delay-4 flex items-center gap-2 mt-7 text-xs text-stone-400">
              <span>Free to use</span>
              <span className="w-1 h-1 rounded-full bg-stone-300 inline-block" />
              <span>No signup required</span>
              <span className="w-1 h-1 rounded-full bg-stone-300 inline-block" />
              <span>PDF &amp; DOCX supported</span>
            </div>
          </div>

          {/* Right: Mock UI */}
          <div className="hidden lg:block relative fade-up visible delay-2">
            <div className="float-1 absolute -top-5 -right-3 z-10 bg-white border border-stone-200 rounded-2xl px-4 py-2.5 shadow-lg flex items-center gap-2.5 text-xs font-medium text-stone-700">
              <span className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-sm flex-shrink-0">
                ✓
              </span>
              ATS Friendly · Score 82/100
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-stone-400 mb-4">
                Resume Score
              </p>
              <div className="flex items-center gap-5 mb-5">
                <div className="w-[72px] h-[72px] rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <span className="font-serif-display text-[26px] leading-none text-emerald-600">
                    84
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-base text-stone-900 mb-0.5">
                    Strong Match
                  </p>
                  <p className="text-xs text-stone-400 mb-2.5">
                    Out of 100 · Job match score
                  </p>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      ref={heroBarRef}
                      className="h-full rounded-full bg-emerald-500 progress-fill"
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-stone-400 mb-2">
                    ⚡ Detected Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["React", "Node.js", "TypeScript"].map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-stone-400 mb-2">
                    ⚠ Keyword Gaps
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Docker", "CI/CD", "AWS"].map((s) => (
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

              <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 whitespace-nowrap">
                  ✓ ATS Friendly
                </span>
                <span className="text-xs text-stone-500 leading-snug">
                  Well structured with strong keyword density for this role.
                </span>
              </div>
            </div>

            <div className="float-2 absolute -bottom-4 -left-6 z-10 bg-white border border-stone-200 rounded-2xl px-4 py-2.5 shadow-lg flex items-center gap-2.5 text-xs font-medium text-stone-700">
              <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-sm flex-shrink-0">
                🎯
              </span>
              3 suggestions to improve
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="border-t border-b border-stone-200 bg-white py-8 px-[8vw]">
          <div className="max-w-[1280px] mx-auto flex flex-wrap justify-center gap-12 lg:gap-20">
            {[
              { num: "50k+", label: "Resumes analysed" },
              { num: "3.2×", label: "More interview callbacks" },
              { num: "92%", label: "User satisfaction" },
              { num: "<30s", label: "Time to results" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`text-center fade-up ${i > 0 ? `delay-${i}` : ""}`}
              >
                <p className="font-serif-display text-4xl text-stone-900 leading-none mb-1">
                  {s.num}
                </p>
                <p className="text-xs text-stone-400 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <section id="how" className="bg-white px-[8vw] py-24">
          <div className="max-w-[1280px] mx-auto">
            <p className="fade-up text-[11px] font-semibold tracking-[0.12em] uppercase text-blue-600 mb-2">
              Simple process
            </p>
            <h2 className="fade-up delay-1 font-serif-display text-4xl lg:text-[44px] text-stone-900 leading-tight tracking-tight mb-3">
              Three steps to a<br />
              <em>better resume</em>
            </h2>
            <p className="fade-up delay-2 text-sm text-stone-500 leading-relaxed max-w-[420px] mb-14">
              No fluff, no complexity. Upload, paste, and get the feedback you
              need to stand out.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  n: "01",
                  icon: "📄",
                  bg: "bg-blue-50",
                  title: "Upload your resume",
                  desc: "Drag and drop your PDF or DOCX file. We support all standard resume formats up to 5MB.",
                },
                {
                  n: "02",
                  icon: "📋",
                  bg: "bg-violet-50",
                  title: "Paste the job description",
                  desc: "Add the job title and full description from any listing. The more detail, the better the match.",
                },
                {
                  n: "03",
                  icon: "✨",
                  bg: "bg-emerald-50",
                  title: "Get your score & fix it",
                  desc: "Instant breakdown: match score, missing keywords, ATS rating, strengths, and targeted suggestions.",
                },
              ].map((step, i) => (
                <div
                  key={step.n}
                  className={`fade-up ${i > 0 ? `delay-${i}` : ""} bg-stone-50 border border-stone-200 rounded-2xl p-7 hover:shadow-md hover:-translate-y-0.5 transition-all`}
                >
                  <p className="font-serif-display text-5xl text-stone-200 leading-none mb-4">
                    {step.n}
                  </p>
                  <div
                    className={`w-11 h-11 rounded-xl ${step.bg} flex items-center justify-center text-xl mb-4`}
                  >
                    {step.icon}
                  </div>
                  <p className="font-semibold text-base text-stone-900 mb-2">
                    {step.title}
                  </p>
                  <p className="text-[13px] text-stone-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="bg-stone-900 px-[8vw] py-24">
          <div className="max-w-[1280px] mx-auto">
            <p className="fade-up text-[11px] font-semibold tracking-[0.12em] uppercase text-blue-400 mb-2">
              Everything you need
            </p>
            <h2 className="fade-up delay-1 font-serif-display text-4xl lg:text-[44px] text-white leading-tight tracking-tight mb-14">
              Built for job seekers
              <br />
              <em>who are serious.</em>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  icon: "⚡",
                  bg: "bg-blue-500/20",
                  title: "Skills Detection",
                  desc: "Automatically identifies every skill on your resume and maps it against the job requirements.",
                },
                {
                  icon: "🎯",
                  bg: "bg-red-500/20",
                  title: "Keyword Gap Analysis",
                  desc: "Pinpoints the exact keywords missing from your resume that recruiters and ATS systems look for.",
                },
                {
                  icon: "🛡️",
                  bg: "bg-emerald-500/20",
                  title: "ATS Optimization Score",
                  desc: "Checks if your resume will survive automated screening with a dedicated ATS compatibility score.",
                },
                {
                  icon: "📊",
                  bg: "bg-amber-500/20",
                  title: "Match Score",
                  desc: "A 0–100 score showing exactly how well your resume aligns with the specific role you're applying for.",
                },
                {
                  icon: "💡",
                  bg: "bg-violet-500/20",
                  title: "Actionable Suggestions",
                  desc: "Specific, targeted improvements — not vague advice. Know exactly what to add, change, or remove.",
                },
                {
                  icon: "🔒",
                  bg: "bg-pink-500/20",
                  title: "Privacy First",
                  desc: "Your resume is never stored. Analysis happens in real-time and your data is never saved to our servers.",
                },
              ].map((f, i) => (
                <div
                  key={f.title}
                  className={`fade-up ${i % 3 > 0 ? `delay-${i % 3}` : ""} bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 hover:bg-white/[0.07] transition-colors`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center text-lg mb-4`}
                  >
                    {f.icon}
                  </div>
                  <p className="font-semibold text-[15px] text-white mb-2">
                    {f.title}
                  </p>
                  <p className="text-[13px] text-white/40 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="border-t border-stone-200">
          <div className="fade-up px-[8vw] py-24 text-center max-w-[680px] mx-auto">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-blue-600 mb-3">
              Free · Instant · No signup
            </p>
            <h2 className="font-serif-display text-4xl lg:text-[52px] text-stone-900 leading-tight tracking-tight mb-4">
              Your next job starts
              <br />
              with a <em>better resume.</em>
            </h2>
            <p className="text-[15px] text-stone-500 leading-relaxed mb-9">
              Stop guessing what recruiters want. Get your score in under 30
              seconds and know exactly what to fix.
            </p>
            <Link
              href="/analyse"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-xl bg-stone-900 text-white text-[15px] font-semibold hover:bg-stone-800 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-stone-900/20 transition-all no-underline"
            >
              <SparkleIcon size={15} />
              Analyse my resume — it&apos;s free
            </Link>
            <p className="mt-4 text-xs text-stone-400">
              No account needed · PDF &amp; DOCX · Results in seconds
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-stone-200 px-[8vw] py-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="font-serif-display text-[18px] text-stone-900 no-underline"
          >
            resume<span className="text-blue-600">ai</span>
          </Link>
          <ul className="flex flex-wrap gap-6 list-none m-0 p-0">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <li key={l}>
                <Link
                  href="#"
                  className="text-xs text-stone-400 hover:text-stone-700 transition-colors no-underline"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-stone-400">
            © 2026 resumeai. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

function SparkleIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
