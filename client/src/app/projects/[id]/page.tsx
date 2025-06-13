"use client";
import React, { use, useState } from "react";
import ProjectHeader from "../ProjectHeader";
import Board from "../BoardView";
import List from "../ListView";
import TimeLine from "../TimeLine";
import TableView from "../Table";
import ModalNewTask from "@/components/ModalNewTask";

interface Props {
  params: Promise<{ id: string }>;
}

const page = ({ params }: Props) => {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("Board");
  const [isModelNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
     <ModalNewTask 
     isOpen={isModelNewTaskOpen}
     onClose={()=>setIsModalNewTaskOpen(false)}
     id={id}
     />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
       {activeTab === "Timeline" && (
        <TimeLine id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
        {activeTab === "Table" && (
        <TableView  id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default page;
