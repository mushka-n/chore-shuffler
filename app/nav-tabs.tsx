"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabsProps {}

const NavTabs = ({}: TabsProps) => {
  const pathname = usePathname();

  return (
    <div className={"w-full bg-black flex items-center justify-center py-8"}>
      <Tabs defaultValue={pathname} className="w-[400px] ">
        <TabsList>
          <TabsTrigger asChild value="/week-shuffle" className="w-48">
            <Link href="/week-shuffle">This week`s shuffle</Link>
          </TabsTrigger>
          <TabsTrigger asChild value="/chores" className="w-48">
            <Link href="/chores">All chores</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default NavTabs;
