import React from "react";
import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";

interface Props {
  task: Task;
}

const TackCrad = ({ task }: Props) => {
  return (
    <div className="mb-3  rounded bg-white p-4 dark:bg-dark-secondary dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          <div className="flex flex-wrap">
            {task.attachments && task.attachments.length > 0 && (
              <Image
                src={`/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={200}
                className="h-auto w-full rounded-t-md"
              />
            )}
          </div>
        </div>
      )}
      <p>
        <strong>ID:</strong> {task.id}
      </p>
      <p>
        <strong>Tittle:</strong> {task.title}
      </p>
      <p>
        <strong>Derscription:</strong> {" "}
        {task.description || "No description provided"}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Tags:</strong> {task.tags}
      </p>
      <p>
        <strong>Start Date:</strong> {" "}
        {task.startDate ? format(new Date(task.startDate),"P"):"No Set"}
      </p>
       <p>
        <strong>Due Date:</strong> {" "}
        {task.dueDate? format(new Date(task.dueDate),"P"):"No Set"}
      </p>
      <p>
        <strong>Author:</strong> {task.author ?task.author.username :"unknowwn" }
      </p>
       <p>
        <strong>Assignee:</strong> {task.assignee ? task.assignee.username :"Unassigned" }
      </p>
    </div>
  );
};

export default TackCrad;
