import { Play, Download } from "lucide-react";

export function DemoSection() {
  return (
    <section id="demo" className="py-20 md:py-32 bg-[var(--card)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">See a Clarity Score in 60 seconds</h2>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            Import → Scan → Fix. Plain-English issues grouped by Critical, Important, Minor.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="aspect-video bg-[var(--background)] rounded-2xl shadow-2xl flex items-center justify-center mb-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[var(--accent-orange)] bg-opacity-10 flex items-center justify-center mx-auto mb-4">
                <Play className="w-10 h-10" style={{ color: "var(--accent-orange)" }} />
              </div>
              <p style={{ color: "var(--text-muted)" }}>Demo Video Placeholder</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-full bg-[var(--accent-orange)] text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Watch demo
            </button>
            <button className="px-8 py-4 rounded-full border-2 border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download sample report
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
