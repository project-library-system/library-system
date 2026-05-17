import MenuLateral from "@/app/components/SidebarAdmin";
import Panel from "@/app/components/Panel";

export default function Home() {
    return (
        <div className="flex">
            <MenuLateral />
            <Panel />
        </div>
    );
}