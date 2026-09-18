import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, status")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium text-slate-500">Central de Atendimento</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">Painel inicial</h1>
          <p className="mt-2 text-sm text-slate-500">{profile?.full_name || user.email}</p>
        </header>
        <section className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ["Novos", "0"], ["Em atendimento", "0"],
            ["Aguardando cliente", "0"], ["Resolvidos", "0"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
            </div>
          ))}
        </section>
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Estrutura do sistema</h2>
          <p className="mt-2 text-sm text-slate-600">
            Usuários, departamentos e permissões serão configurados antes de iniciar a operação.
          </p>
        </section>
      </div>
    </main>
  );
}
