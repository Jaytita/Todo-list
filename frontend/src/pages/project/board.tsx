import CardTask from '@components/cardTask';
import MyButton from '@components/myButton';
import Navbar from '@components/navbar';
import TaskModal from '@components/taskModal';
import { setCurrentSprint, setIsCardModalOpen } from '@redux/reducers/globalReducer';
import { RootState } from '@redux/store/reducers';
import { TaskDataProps, agileProgress, allSprint, data, projectName, statusBadge } from '@src/utils';
import { Card, Col, ConfigProvider, Row, theme } from 'antd';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface BoardProps {
  isDarkMode: boolean;
}

interface ItemType {
  value: string;
  label: JSX.Element;
}

const Board: React.FC<BoardProps> = ({ isDarkMode }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const dispatch = useDispatch();
  const isCardModalOpen = useSelector((state: RootState) => state.globalState.isCardModalOpen);
  const currentSprint = useSelector((state: RootState) => state.globalState.currentSprint);
  const [clickedCard, setClickedCard] = useState({});
  
  const handleCardTaskOpen = (task: TaskDataProps) => {
    setClickedCard(task)
    dispatch(setIsCardModalOpen(true))
  }

  const handleCardTaskClose = () => {
    setClickedCard({})
    dispatch(setIsCardModalOpen(false))
  }

  // Categorize by status
  const allStatuses = [...Array(agileProgress.length).keys()];
  const tasksByStatus: { [key: number]: TaskDataProps[] } = {};
  allStatuses.forEach(status => {
    tasksByStatus[status] = [];
  });

  data[currentSprint].forEach(task => {
    tasksByStatus[task.status].push(task);
  });

  const renderTaskColumns = () => {
    return Object.keys(tasksByStatus).map((status, index) => (
      <Col key={`${status}-${index}`} span={4} style={{width: "100%"}}>
        <Row  style={{width: "100%"}}>
          {tasksByStatus[parseInt(status)].map((task: TaskDataProps, idx) => (
            <div key={idx} style={{width: "100%"}}>
              <CardTask
                key={task["task-id"].toString()}
                taskId={task["task-id"]}
                title={task["title"]}
                point={task["point"]}
                priority={task["priority"]}
                assignee={task["assignee"]}
                onClick={() => handleCardTaskOpen(task)}
              />
            </div>
          ))}
        </Row>
      </Col>
    ));
  };

  const handleChangeTaskStatus = (index: number) => {
    if (clickedCard?.["task-id"]) {
      const updatedData = data[currentSprint].map((task) => {
        if (task["task-id"] === clickedCard?.["task-id"]) {
          return { ...task, status: index };
        }
        return task;
      });

      data[currentSprint] = updatedData;
    }
    dispatch(setIsCardModalOpen(false));
  };

  const items: ItemType[] = [
    ...Array.from({ length: 6 }, (_, index) => ({
      value: `${index}`,
      label: (
        <div onClick={() => handleChangeTaskStatus(index)}>
          {statusBadge(index)}
        </div>
      ),
    })),
  ];
  
  return(
    <ConfigProvider theme={{
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    }}>
      <Fragment>
        <Navbar/>
        <div className="flex flex-col md:p-8 w-full min-h-screen bg-zinc-800 overflow-x-scroll">
          <div className="flex gap-2">
            <span className="px-4 py-2 text-lg">
              {projectName} / <strong className="hover:underline hover:cursor-pointer">Sprint {currentSprint}</strong>
            </span>
            <MyButton text="Previous" disabled={currentSprint < allSprint} onClick={() => dispatch(setCurrentSprint(currentSprint-1))}/>
            <MyButton text="Next" disabled={currentSprint === allSprint}  onClick={() => dispatch(setCurrentSprint(currentSprint+1))}/>
          </div>
          <div className="md:w-auto sm:w-fit overflow-x-scroll">
            <div className="min-w-full w-fit">
              <Row gutter={{ xs: 4, sm: 8 }}>
                {agileProgress.map((progress, index) => {
                  return (
                    <Col span={4} key={`progress-index-${progress}-${index}`}>
                      <Card><strong>{progress}</strong></Card>
                    </Col>
                  )
                })}
              </Row>
            </div>
            <Row gutter={{ xs: 4, sm: 8 }}>
              {renderTaskColumns()}
            </Row>
          </div>
        </div>

        <TaskModal clickedCard={clickedCard} onCancel={handleCardTaskClose} items={items}/>
      </Fragment>
    </ConfigProvider>
  )
}

export default Board
