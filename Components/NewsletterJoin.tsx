"use client";

import React, { useState } from "react";
import { Loader2, Mail, X, CheckCircle2 } from "lucide-react";
import { api, ApiError } from "@/lib/api";

type Status = "idle" | "submitting" | "success";

const NewsletterJoin = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const close = () => {
    setOpen(false);
    // Reset after the close animation so the modal doesn't flash old state
    // the next time it opens.
    setTimeout(() => {
      setStatus("idle");
      setEmail("");
      setError(null);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    setError(null);
    try {
      await api.subscribe(email.trim());
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      setError(
        err instanceof ApiError ? err.message : "Could not subscribe right now"
      );
    }
  };

  return (
    <>
      {/* The orange "Join Our Club" banner that overlaps the hero image */}
      <div className="absolute -bottom-12 right-8 lg:right-20 xl:right-40 w-80 bg-primary rounded-lg shadow-xl p-6 text-white z-10">
        <h3 className="text-2xl font-bold mb-4 uppercase">Join Our Club</h3>
        <p className="mb-6 text-white/90">
          Subscribe for the latest tech news and analysis delivered straight to
          your inbox.
        </p>
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-[#2a2a2a] hover:bg-black text-white font-semibold py-3 rounded transition-colors"
        >
          Join Now
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={close}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {status === "success" ? (
              <div className="text-center py-2">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-9 h-9 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  You&apos;re in!
                </h2>
                <p className="text-gray-600 mb-6">
                  Thanks for subscribing. Watch your inbox — we just sent a
                  welcome email, and we&apos;ll ping you whenever a fresh
                  article lands.
                </p>
                <button
                  onClick={close}
                  className="bg-primary text-secondary hover:bg-secondary hover:text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  Join the newsletter
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  Get a heads-up whenever we publish something new. No spam, no
                  fluff — unsubscribe in one click.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg px-4 py-2">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting" || !email.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-secondary hover:bg-secondary hover:text-white px-5 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Mail className="w-4 h-4" />
                    )}
                    Subscribe
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By subscribing you agree to receive newsletter emails from
                    24|7 Tech Spyware. You can opt out any time.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterJoin;
