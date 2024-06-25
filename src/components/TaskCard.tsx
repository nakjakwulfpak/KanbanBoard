"use client";
import { Task } from "@/utils/data-task";
import React, { useState } from "react";

const TaskCard = ({ task,updateTaskPoints,updateTaskTitle }: { task: Task, updateTaskPoints: (task:Task,points:number)=>void, updateTaskTitle: (task:Task,title:string)=>void }) => {
    const [isEditing,setIsEditing]=useState(false)
    const points= task.points ||0
    const updatePoints=(direction:'up' | 'down')=>{
        const fib=[0,1,2,3,5,8,13]
        const index =fib.indexOf(points)
        const nextIndex = direction === 'up'? index + 1 : index - 1
        const newPoints =fib[nextIndex]
        if (newPoints){
        updateTaskPoints(task, newPoints)}
    }
  return (
    <div
        draggable
        onDragStart={(e)=>{
            e.dataTransfer.setData('id',task.id)
        }}
        className="flex flex-col bg-gray-200 justify-between gap-y-4 ml-4 items-start p-4 border border-black  rounded-lg mt-4  w-full h-full">
      <div className="text-xl text-black font-bold leading-[150%] w-full ">
      {isEditing ?(
            <input autoFocus
                type="text"
                className="w-full"
            onBlur={()=>setIsEditing(false)} 
               value={task.title}
             onChange={(e)=>updateTaskTitle(task,e.target.value)}/>
        ):(
            <div onClick={()=>setIsEditing(true)}>
            {task.title}
        </div>
        )}
      </div>
      <div className="flex justify-between max-md:gap-x-14 gap-x-40 items-center w-full">
        <p className="text-lg font-semibold text-gray-600">{task.id}</p>
        <p className="text-lg font-semibold text-gray-600">{task.priority}</p>
        <div className="flex items-center gap-x-2 ">
            <button className="text-black" onClick={()=>updatePoints('up')}>+</button>
            <p className="text-lg text-gray-600">{points}</p>
            <button className="text-black" onClick={()=>updatePoints('down')}>-</button>
        </div>
        
      </div>
    </div>
  );
};

export default TaskCard;
