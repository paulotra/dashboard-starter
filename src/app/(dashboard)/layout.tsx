import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-body-color">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navigation />
        <main className="flex-1 overflow-y-auto p-5">{children}</main>
      </div>
    </div>
  );
}
