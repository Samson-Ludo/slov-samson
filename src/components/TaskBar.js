import React from 'react'

function TaskBar({taskCount, setOpenTaskForm}) {
    const openTaskForm = () => {
        setOpenTaskForm(true)
    }
  return (
    <div className='taskBar'>
        <div className='taskBar_taskCount'>TASKS {taskCount}</div>
        <div title="Add Task"  className='taskBar_addTaskBtn' onClick={openTaskForm}> + </div>
    </div>
  )
}

export default TaskBar