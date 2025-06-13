"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";
import {
  AlertCircle,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Icon,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
  BriefcaseIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const IndexSideBar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const {data:projects}=useGetProjectsQuery()
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const sideBarClassNames = ` fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto h-full   bg-white ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

  return (
    <div className={sideBarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* TOP LOGO */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            EDLIST
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/* TEAM */}
        <div className=" flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h3 className=" tracking-wide font-bold text-md dark:text-gray-200">
              EDROH TEAM
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem ] h-3 w-3 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* navbarlinks */}
        <nav className="z-10 w-full">
          <SideBarLinks icon={Home} lable="Home" href="/" />
          <SideBarLinks icon={Briefcase} lable="TimeLine" href="/timeline" />
          <SideBarLinks icon={Search} lable="Search" href="/search" />
          <SideBarLinks icon={Settings} lable="Settings" href="/settings" />
          <SideBarLinks icon={User} lable="Users" href="/users" />
          <SideBarLinks icon={Users} lable="Teams" href="/teams" />
        </nav>
        {/* projexts links */}
        <button onClick={()=>setShowProjects((prev)=>!prev)} className="flex w-full items-center justify-between px-8 py-3 text-gray-500">
          <span>Projects</span>
          {showProjects?(
            <ChevronUp className="h-5 w-5"/>
          ):(
            <ChevronDown className="h-5 w-5"/>
          )
          } 
        </button>
        {/* projects list */}
        {showProjects && projects?.map((project)=>(
          <SideBarLinks key={project.id}
          icon={BriefcaseIcon}
          lable={project.name}
          href={`/projects/${project.id}`}/>
        ))}
        {/* periority links */}
        <button onClick={()=>setShowPriority((prev)=>!prev)} className="flex w-full items-center justify-between px-8 py-3 text-gray-500">
          <span>Priority</span>
          {showPriority?(
            <ChevronUp className="h-5 w-5"/>
          ):(
            <ChevronDown className="h-5 w-5"/>
          )
          }
        </button>
        {showPriority &&(
          <>
                    <SideBarLinks icon={AlertCircle} lable="Urgent" href="/priority/urgent" />
                    <SideBarLinks icon={ShieldAlert} lable="High" href="/priority/high" />
                    <SideBarLinks icon={AlertTriangle} lable="Medium" href="/priority/medium" />
                    <SideBarLinks icon={Layers3} lable="Low" href="/priority/low" />
                    <SideBarLinks icon={Layers3} lable="Backlog" href="/priority/backlog" />

          </>
        )}

      </div>
    </div>
  );
};
interface SideBarLinksProps {
  href: string;
  icon: LucideIcon;
  lable: string;
  // isCollapsed?: boolean;
}

const SideBarLinks = ({
  href,
  icon: Icon,
  lable,
  // isCollapsed,
}: SideBarLinksProps) => {
  const pathName = usePathname();
  const isActive =
    pathName === href || (pathName === "/" && href === "/dashboard");
  const screenWidth = window.innerWidth;
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  return (
    <Link href={href} className="w-full">
      <div
        className={` relative flex cursor-pointer items-center  px-4 py-2 gap-2 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""}`}
      >
        {isActive && (
          <div className=" absolute left-0 top-0 h-full w-[5px] bg-blue-200" />
        )}
        <Icon className="h-6 w-6   text-gray-800 dark:text-gray-100" />
        <span className={`font-medium  text-gray-800 dark:text-gray-100`}>
          {lable}
        </span>
      </div>
    </Link>
  );
};

export default IndexSideBar;
