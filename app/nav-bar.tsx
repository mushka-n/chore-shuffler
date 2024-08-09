"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NavBarProps {}

const NavBar = ({}: NavBarProps) => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center border-box justify-between p-4 px-8 bg-neutral-900 border-b border-neutral-800">
      <div className="text-lg font-bold">Chore Shuffler</div>

      <Tabs defaultValue={pathname} className="">
        <TabsList className="dark:bg-neutral-900 gap-8">
          <TabsTrigger
            asChild
            value="/week-shuffle"
            className=" data-[state=active]:dark:bg-neutral-900 p-0"
          >
            <Link href="/week-shuffle">Week Shuffle</Link>
          </TabsTrigger>
          <TabsTrigger
            asChild
            value="/chores"
            className=" data-[state=active]:dark:bg-neutral-900 p-0"
          >
            <Link href="/chores">Chore List</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </nav>
  );
};

export default NavBar;
