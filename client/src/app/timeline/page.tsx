"use client"
import { useAppSelector } from "@/app/redux";
import { useGetProjectsQuery } from "@/state/api";
import React, { useMemo, useState } from "react";
import "gantt-task-react/dist/index.css";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import Header from "@/components/Header";

interface Props {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

type TaskTypeItems = "task" | "milestone" | "project";
const TimeLine = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: projects,
    isLoading,
    error,
  } = useGetProjectsQuery();
  const [dispalyOptions, setDispalyOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-Us",
  });
  const ganttTasks = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date (project.startDate as string),
        end: new Date (project.endDate as string),
        name:project.name,
        id: `Project-${project.id}`,
        type: "project" as TaskTypeItems,
        progress:50,
        isDisabled: false,
      })) || []
    ); 
  }, [projects]);

  const handelViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDispalyOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };
  if (isLoading) return <div>Loading...</div>;
  if (error||!projects) return <div>An error occurred while fetching tasks</div>;
  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center">
        <Header name="Projects Timeline"/>
        <div className=" relative inline-block w-64">
          <select
            className=" focus:shadow-outline block w-full appearance-none rounded
             border border-gray-400 bg-white p-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:bg-dark-secondary dark:border-dark-secondary dark:text-white "
            value={dispalyOptions.viewMode}
            onChange={handelViewModeChange}
          >
            <option value={ViewMode.Day}>
              {dispalyOptions.viewMode === ViewMode.Day ? "✓" : ""} Day
            </option>
            <option value={ViewMode.Week}>
              {" "}
              {dispalyOptions.viewMode === ViewMode.Week ? "✓" : ""} Week
            </option>
            <option value={ViewMode.Month}>
              {" "}
              {dispalyOptions.viewMode === ViewMode.Month ? "✓" : ""} Month
            </option>
          </select>
        </div>
      </header>
      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary  dark:text-white">
        <div className=" timeline">
          <Gantt
            tasks={ganttTasks}
            {...dispalyOptions}
            columnWidth={dispalyOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
           projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
            projectProgressColor={isDarkMode?"#1f2937":"#aeb8c2"}
            barBackgroundSelectedColor={isDarkMode ? "#000" : "#9b1aa6"}
          />
        </div>
        
      </div>
    </div>
  );
};

export default TimeLine;
