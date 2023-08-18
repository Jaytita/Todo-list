import CardTask from '@components/cardTask';
import Navbar from '@components/navbar';
import { TaskDataProps, agileProgress, data, projectName } from '@src/utils';
import { Card, Col, ConfigProvider, Row, theme } from 'antd';
import { Fragment } from 'react';

interface BoardProps {
  isDarkMode: boolean;
}

const Board: React.FC<BoardProps> = ({ isDarkMode }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const allSprint = Object.keys(data).length;
  const currentSprint = 1;

  const tasksByStatus = data[currentSprint].reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as { [key: number]: TaskDataProps[] });

  const renderTaskColumns = () => {
    return Object.keys(tasksByStatus).map((status, index) => (
      <Col key={index} span={4}>
        <Row>
          {tasksByStatus[parseInt(status)].map((task) => (
            <CardTask
              taskId={task["task-id"]}
              title={task["title"]}
              point={task["point"]}
              priority={task["priority"]}
              assignee={task["assignee"]}
            />
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
          <span className="text-lg">{projectName} / <strong>Sprint {allSprint}</strong></span>
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
      </Fragment>
    </ConfigProvider>
  )
}

export default Board
