import CardTask from '@components/cardTask';
import Navbar from '@components/navbar';
import { setIsCardModalOpen } from '@redux/reducers/globalReducer';
import { RootState } from '@redux/store/reducers';
import { TaskDataProps, agileProgress, data, pointBadge, priorityBadge, projectName } from '@src/utils';
import { Card, Col, ConfigProvider, Modal, Row, theme } from 'antd';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface BoardProps {
  isDarkMode: boolean;
}

const Board: React.FC<BoardProps> = ({ isDarkMode }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const dispatch = useDispatch();
  const isCardModalOpen = useSelector((state: RootState) => state.globalState.isCardModalOpen);

  // const allSprint = Object.keys(data).length;
  const currentSprint = 1;
  const [clickedCard, setClickedCard] = useState<TaskDataProps | null>(null);

  const handleCardTaskOpen = (task: TaskDataProps) => {
    setClickedCard(task)
    dispatch(setIsCardModalOpen(true))
  }

  const tasksByStatus = data[currentSprint].reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as { [key: number]: TaskDataProps[] });

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

  return(
    <ConfigProvider theme={{
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    }}>
      <Fragment>
        <Navbar/>
        <div className="flex flex-col gap-4 md:p-8 w-full min-h-screen bg-zinc-800 overflow-x-scroll">
          <span className="text-lg">{projectName} / <strong className="hover:underline hover:cursor-pointer">Sprint {currentSprint}</strong></span>
          <div className="md:w-auto sm:w-[920px]">
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

        <Modal centered title={clickedCard?.["title"]} footer={false} open={isCardModalOpen} onCancel={() => dispatch(setIsCardModalOpen(false))}>
          <div className="mb-2">
            {clickedCard?.["detail"]}
          </div>
          <div className="flex justify-between items-center">
            <div className="">
              {projectName}-{clickedCard?.["task-id"]}
            </div>
            <div className="flex justify-between items-center gap-1">
              {pointBadge(clickedCard?.["point"] || 3)}
              {priorityBadge(clickedCard?.["priority"])}
              {clickedCard?.["assignee"]}
            </div>
          </div>
        </Modal>
      </Fragment>
    </ConfigProvider>
  )
}

export default Board
