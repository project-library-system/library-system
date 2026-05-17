import Sidebar from "@/app/components/Sidebar";
import Catalog from "@/app/components/Catalog";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <Catalog />
    </div>
  );
}