import { useEffect, useState } from 'react';
import './style.scss';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CopyBar from '@Components/sidebar_old/CopyBar';
import {
  Nightlight,
  WbSunny
} from '@mui/icons-material';
import { Button, Divider, Form, Input } from 'antd';

export default function Task() {
  // Dark mode
  const [darkMode, setDarkMode] = useState(true);
  const root = document.querySelector(':root');

  // Set the default to dark mode
  useEffect(() => {
		root.dataset.theme = 'dark';
	}, []);
	
	const themeChange = () => {
		setDarkMode(!darkMode);
		root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
	};

  // default tasks list, id is used for DragDropContext
  const [tasks, setTasks] = useState([
    {id: 1, name: "Complete online JavaScript course", completed: false},
    {id: 2, name: "Jog around the park 3x", completed: false},
    {id: 3, name: "10 minutes meditation", completed: false},
    {id: 4, name: "Read for 1 hour", completed: false},
    {id: 5, name: "Pick up groceries", completed: false},
    {id: 6, name: "Complete Todo App on Frontend Mentor", completed: false}
  ]);

  // add new task from input
  const handleAddTask = (e) => {
    if (e.key === "Enter") {
      const newTaskName = e.target.value;
      setTasks((prevTasks) => [...prevTasks, { id: tasks.length, name: newTaskName, completed: false }]);
      e.target.value = "";
    }
  };
  
  // make line across on text when ticked
  const handleCheckboxClick = (index) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[index] = { ...newTasks[index], completed: !newTasks[index].completed };
      return newTasks;
    });
  };

  // delete task when 'cross' is clicked
  const handleDelete = (index) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks.splice(index, 1);
      return newTasks;
    });
  };
  
  // show all tasks
  const [showActive, setShowActive] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleShowAll = () => {
    setShowActive(false);
    setShowCompleted(false);
  };

  // show active
  const handleShowActive = () => {
    setShowActive(true);
    setShowCompleted(false);
  };
  
  // show ticked
  const handleShowCompleted = () => {
    setShowActive(false);
    setShowCompleted(true);
  };

  // delete task completed
  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // drag and drop
  const [draggedTaskIndex, setDraggedTaskIndex] = useState(null);

  const handleDragStart = index => {
    setDraggedTaskIndex(index);
  };
  
  // normal drag and drop, not beautiful
  const handleDrop = index => {
    if (draggedTaskIndex !== index) {
      const newTasks = [...tasks];
      const draggedTask = newTasks[draggedTaskIndex];
      newTasks.splice(draggedTaskIndex, 1);
      newTasks.splice(index, 0, draggedTask);
      setTasks(newTasks);
    };
  };

  // * react-beautiful-dnd (not using) *
  // const handleDragEnd = (result) => {
  //   if (!result.destination) return;

  //   const newTasks = Array.from(tasks);
  //   const [reorderedTask] = newTasks.splice(result.source.index, 1);
  //   newTasks.splice(result.destination.index, 0, reorderedTask);

  //   setTasks(newTasks);
  // };

  const loginPage = () => {
    return (
      <div>
      <Form
        className="card"
        name="login"
        layout="vertical"
      >
        <div className="img-container">
          <h1>MaiLok Dev</h1>
        </div>

        <div className="input-login-form">
          <div className="form-inline">
            <Form.Item
              key={"email"}
              rules={[
                {
                  required: true,
                  message: "Email is required!",
                },
                {
                  type: "email",
                  message: "This is not a valid email!",
                },
              ]}
              name={"email"}
              label={null}
            >
              <Input size="large" placeholder="Email" />
            </Form.Item>
          </div>

          <div className="form-inline">
            <Form.Item
              key={"password"}
              rules={[{ required: true, message: "Password is required!" }]}
              name={"password"}
              label={null}
            >
              <Input
                size="large"
                type="password"
                placeholder="Password"
              />
            </Form.Item>
          </div>
        </div>

        <div className="form-inline end-form">
          <Button
            size="large"
            htmlType="submit"
            type="primary"
          >
            <span>Login With Email</span>
          </Button>
        </div>

        <div className="form-inline end-line">
            <GoogleOAuthProvider
            >
              <LoginButton />
            </GoogleOAuthProvider>
          </div>

        <Divider />
        <div className="form-inline" style={{ marginTop: "0px" }}>
          <Button
            type="link"
          >
            Forgot password ?
          </Button>
        </div>
      </Form>
    </div>
    )
  }

  return (
    <div className="fem-task-app">
      <header>
        <img src={darkMode ? "/images/bg-desktop-dark.jpg" : "/images/bg-desktop-light.jpg"} alt="banner" />
      </header>
      
      <section className="sidebar">
        <CopyBar/>

        {/* !!! CLOSE MENU SUPPOSED TO BE HERE, BUT WHERE? !!! */}
        <div className="close-sidebar">
          <Nightlight style={{fill: "white"}}/>
        </div>
      </section>

      <div className="todo-app">
        <div className="topbar">
          <h1>TODO</h1>
          <div className="theme-switch" onClick={themeChange}>
            {darkMode ? 
              <WbSunny style={{fill: "white"}}/> :
              <Nightlight style={{fill: "white"}}/>
            }
          </div>
        </div>

        <div className="create-new">
          <input 
            onKeyDown={handleAddTask}
            placeholder="Create a new todo..."
          />
        </div>

        <div className="todo">
          {tasks.map((task, index) => {
            // return nothing if no to show
            if ((showActive && task.completed) || (showCompleted && !task.completed)) {
              return null;
            }
            return (
              <div
                className="task"
                key={index}
                draggable={true}
                onDragStart={() => handleDragStart(index)}
                onDragOver={event => event.preventDefault()}
                onDrop={() => handleDrop(index)}
              >
                <div className="task-left">
                  <div
                    className="check-box"
                    onClick={() => handleCheckboxClick(index)}
                    style={{backgroundColor: task.completed ? "var(--bright-blue)" : "transparent"}}
                  >
                    {task.completed && <img src="/images/icon-check.svg" alt="tick" />}
                  </div>

                  <p
                    className={task.completed ? 'completed' : ''}
                    onClick={() => handleCheckboxClick(index)}
                  >
                    {task.name}
                  </p>

                </div>

                <div className="delete-task" onClick={() => handleDelete(index)}>
                  <img src="/images/icon-cross.svg" alt="close" />
                </div>

              </div>
            )
          })}

          <div className="details">
            {/* show number of incompleted task(s) */}
            <p>{tasks.filter(task => !task.completed).length} item{tasks.filter(task => !task.completed).length > 1 ? 's' : ''} left</p>

            <div className="menus">
              <p className="menus-text primary" onClick={handleShowAll}>All</p>
              <p className="menus-text" onClick={handleShowActive}>Active</p>
              <p className="menus-text" onClick={handleShowCompleted}>Completed</p>
            </div>

            <div className="clear-completed" onClick={handleClearCompleted}>
              <p>Clear Completed</p>
            </div>
          </div>

          {/* another menu for mobile */}
          <div className="details mobile">
            <p className="menus-text primary" onClick={handleShowAll}>All</p>
            <p className="menus-text" onClick={handleShowActive}>Active</p>
            <p className="menus-text" onClick={handleShowCompleted}>Completed</p>
          </div>

        </div>

        <div className="advice">
          <p>Drag and drop to reorder list</p>
        </div>
      </div>
    </div>
  )
}
