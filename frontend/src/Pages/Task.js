import React from 'react'
import './task.css'
import { Checkbox, TextField, Button } from '@mui/material'
import { Book, CalendarMonth, Star } from '@mui/icons-material'

export default function Task() {
    return (
        <main>
            <div className="section_name">
                <Book />
                <h2>Planned</h2>
            </div>

            <div className="task_list">
                <div className="task">
                    <div className="task_details">
                        <Checkbox />
                        
                        <span>
                        <h6>Task 1 name</h6>
                            <p>Tasks
                                <span>
                                <CalendarMonth style={{height: "1rem"}}/>
                                </span>
                                Wed 8 Mar
                            </p>
                        </span>
                    </div>

                    <Button><Star /></Button>
                    
                </div>

                <div className="task">
                    <div className="task_details">
                        <Checkbox />
                        
                        <span>
                        <h6>Task 2 name</h6>
                            <p>Tasks
                                <span>
                                <CalendarMonth style={{height: "1rem"}}/>
                                </span>
                                Thu 9 Mar
                            </p>
                        </span>
                    </div>

                    <Button><Star /></Button>
                    
                </div>

                <div className="task">
                    <div className="task_details">
                        <Checkbox />
                        
                        <span>
                        <h6>Task 3 name</h6>
                            <p>Tasks
                                <span>
                                <CalendarMonth style={{height: "1rem"}}/>
                                </span>
                                Fri 10 Mar
                            </p>
                        </span>
                    </div>

                    <Button><Star /></Button>
                    
                </div>
            </div>

            <div className="add_task">
                {/* <TextField
                    id="filled-basic"
                    label="Add a task"
                    variant="filled"
                    style={{color: "var(--text-pri"}}
                /> */}
                <input
                    type="text"
                    placeholder="Add a task"
                />
            </div>
            
        </main>
    )
}
