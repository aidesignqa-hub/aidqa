"use client";

import { useState } from "react";

export function EarlyAccessForm() {
  const [formData, setFormData] = useState({
    email: "",
    role: "",
    companySize: "",
    expectations: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We'll email you when your spot opens.");
  };

  return (
    <section id="early-access" className="py-20 md:py-32">
      <div className="max-w-[600px] mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Join the waitlist</h2>
          <p className="text-lg mb-2" style={{ color: "var(--text-muted)" }}>
            Get early access to the scanner, sample reports, and priority onboarding.
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            No spam. Limited early slots. We'll email you when your invite is ready.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email <span style={{ color: "var(--accent-orange)" }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--card)] focus:border-[var(--accent-orange)] focus:outline-none transition-colors"
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="role" className="block mb-2 text-sm">
              Role
            </label>
            <select
              id="role"
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--card)] focus:border-[var(--accent-orange)] focus:outline-none transition-colors"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="">Select role</option>
              <option value="founder">Founder / Indie Hacker</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="pm">PM</option>
              <option value="qa">QA / DesignOps</option>
            </select>
          </div>

          <div>
            <label htmlFor="companySize" className="block mb-2 text-sm">
              Company size
            </label>
            <select
              id="companySize"
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--card)] focus:border-[var(--accent-orange)] focus:outline-none transition-colors"
              value={formData.companySize}
              onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
            >
              <option value="">Select size</option>
              <option value="1-10">1–10</option>
              <option value="11-50">11–50</option>
              <option value="51-200">51–200</option>
              <option value="200+">200+</option>
            </select>
          </div>

          <div>
            <label htmlFor="expectations" className="block mb-2 text-sm">
              What UI problems are slowing you down? <span className="text-xs" style={{ color: "var(--text-muted)" }}>(optional)</span>
            </label>
            <textarea
              id="expectations"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--card)] focus:border-[var(--accent-orange)] focus:outline-none transition-colors resize-none"
              placeholder="e.g., 'Spacing is inconsistent', 'Mobile layouts break', 'Accessibility issues I miss'..."
              value={formData.expectations}
              onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 rounded-full bg-[var(--accent-orange)] text-white hover:opacity-90 transition-opacity shadow-lg"
          >
            Request invite
          </button>

          <p className="text-sm text-center" style={{ color: "var(--text-muted)" }}>
            No spam. We'll email you when your spot opens.
          </p>
        </form>
      </div>
    </section>
  );
}
