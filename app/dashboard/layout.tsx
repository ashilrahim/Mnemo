import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">Sidebar</aside>
            <main>{children}</main>
        </div>
    );
}
