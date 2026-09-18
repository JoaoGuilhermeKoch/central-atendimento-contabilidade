import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { data: roles }, { data: departments }, { data: members }] = await Promise.all([
    supabase.from("profiles").select("id, full_name, email, status, active").order("full_name"),
    supabase.from("roles").select("id, name, description").order("name"),
    supabase.from("departments").select("id, name, description, active").order("name"),
    supabase.from("department_members").select("user_id, department_id, is_manager"),
  ]);

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium text-slate-500">Administração</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">Usuários, perfis e departamentos</h1>
          <p className="mt-2 text-sm text-slate-500">A estrutura está pronta para receber os cadastros reais.</p>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="font-semibold">Usuários</h2>
            <p className="mt-2 text-3xl font-semibold">{profile?.length ?? 0}</p>
            <p className="text-sm text-slate-500">perfis cadastrados</p>
          </section>
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="font-semibold">Papéis</h2>
            <p className="mt-2 text-3xl font-semibold">{roles?.length ?? 0}</p>
            <p className="text-sm text-slate-500">funções de acesso</p>
          </section>
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="font-semibold">Departamentos</h2>
            <p className="mt-2 text-3xl font-semibold">{departments?.length ?? 0}</p>
            <p className="text-sm text-slate-500">áreas cadastradas</p>
          </section>
        </div>
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Estrutura atual</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b border-slate-200">
                <th className="px-3 py-3">Usuário</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Departamentos</th>
              </tr></thead>
              <tbody>
                {(profile ?? []).map((u) => {
                  const userDepartments = (members ?? []).filter((m) => m.user_id === u.id).map((m) => departments?.find((d) => d.id === m.department_id)?.name).filter(Boolean);
                  return <tr key={u.id} className="border-b border-slate-100">
                    <td className="px-3 py-3 font-medium">{u.full_name}</td>
                    <td className="px-3 py-3">{u.status}</td>
                    <td className="px-3 py-3">{userDepartments.length ? userDepartments.join(", ") : "—"}</td>
                  </tr>;
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
