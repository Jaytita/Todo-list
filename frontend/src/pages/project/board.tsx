import { DownOutlined } from '@ant-design/icons';
import CardTask from '@components/cardTask';
import Navbar from '@components/navbar';
import { setIsCardModalOpen } from '@redux/reducers/globalReducer';
import { RootState } from '@redux/store/reducers';
import { TaskDataProps, agileProgress, currentSprint, data, pointBadge, priorityBadge, projectName, statusBadge } from '@src/utils';
import { Card, Col, ConfigProvider, Divider, Dropdown, Modal, Row, Space, theme } from 'antd';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface BoardProps {
  isDarkMode: boolean;
}

const Board: React.FC<BoardProps> = ({ isDarkMode }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const dispatch = useDispatch();
  const isCardModalOpen = useSelector((state: RootState) => state.globalState.isCardModalOpen);
  const [clickedCard, setClickedCard] = useState<TaskDataProps | null>(null);
  
  const handleCardTaskOpen = (task: TaskDataProps) => {
    setClickedCard(task)
    dispatch(setIsCardModalOpen(true))
  }

  const handleCardTaskClose = () => {
    setClickedCard(null)
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
      data[currentSprint][clickedCard["task-id"]-1]["status"] = index;
    }
    dispatch(setIsCardModalOpen(false));
  }

  const items = [
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
          <span className="px-4 py-2 text-lg">{projectName} / <strong className="hover:underline hover:cursor-pointer">Sprint {currentSprint}</strong></span>
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

        <Modal centered title={clickedCard?.["title"]} footer={false} open={isCardModalOpen} onCancel={handleCardTaskClose}>
          <div className="mb-4">
            {clickedCard?.["detail"]}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              {projectName}-{clickedCard?.["task-id"]}
              <Divider type="vertical"/>
              <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {statusBadge(clickedCard?.["status"] || 0)}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
              {/* <Select
                defaultValue={1}
                style={{ width: 145 }} //"fit-content" }}
                onChange={handleChangeTaskStatus}
                options={[]}
              /> */}
            </div>
            <div className="flex justify-between items-center gap-2">
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
