import React from 'react'
import { useState } from 'react'
import './task.css'
import { Checkbox, TextField, Button } from '@mui/material'
import { Book, CalendarMonth, Star } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';

export default function Task() {
    const [isFav, setIsFav] = useState(false);

    const handleIsFav = () => {
        setIsFav(!isFav);
    };

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
                        <h6>Task 1 Please fix position of calendar icon below</h6>
                            <p>Tasks
                                <span>
                                <CalendarMonth style={{height: "1rem"}}/>
                                </span>
                                Wed 8 Mar
                            </p>
                        </span>
                    </div>
                    
                    <div className="fav_box" onClick={handleIsFav}>
                        <FontAwesomeIcon icon={isFav ? solidStar: regStar} />
                    </div>
                </div>

                <div className="task">
                    <div className="task_details">
                        <Checkbox />
                        
                        <span>
                        <h6>Task 2 When star is clicked, it will be color filled, but applied to all because Ken is using useState</h6>
                            <p>Tasks
                                <span>
                                <CalendarMonth style={{height: "1rem"}}/>
                                </span>
                                Thu 9 Mar
                            </p>
                        </span>
                    </div>

                    <div className="fav_box" onClick={handleIsFav}>
                        <FontAwesomeIcon icon={isFav ? solidStar: regStar} />
                    </div>
                    
                </div>

                <div className="task">
                    <div className="task_details">
                        <Checkbox />
                        
                        <span>
                        <h6>Task 3 The easiest, anyone please adjust font size and weight</h6>
                            <p>Tasks
                                <span>
                                <CalendarMonth style={{height: "1rem"}}/>
                                </span>
                                Fri 10 Mar
                            </p>
                        </span>
                    </div>

                    <div className="fav_box" onClick={handleIsFav}>
                        <FontAwesomeIcon icon={isFav ? solidStar: regStar} />
                    </div>
                    
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
