"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("E-mail ou senha inválidos.");
      setLoading(false);
      return;
    }

    window.location.href = "/";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">Central de Atendimento</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">Entrar no sistema</h1>
          <p className="mt-2 text-sm text-slate-500">Acesse sua central de atendimento.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">E-mail</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-500" placeholder="seu@email.com" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Senha</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-500" placeholder="••••••••" />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}
