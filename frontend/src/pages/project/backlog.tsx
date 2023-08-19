import { PlusOutlined } from '@ant-design/icons';
import Navbar from '@components/navbar';
import { setIsCardModalOpen } from '@redux/reducers/globalReducer';
import { RootState } from '@redux/store/reducers';
import { TaskDataProps, data, pointBadge, priorityBadge, projectName, statusBadge } from '@src/utils';
import type { CollapseProps } from 'antd';
import { Collapse, ConfigProvider, Modal, theme } from 'antd';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface BacklogProps {
  isDarkMode: boolean;
}

const Backlog: React.FC<BacklogProps> = ({ isDarkMode }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const dispatch = useDispatch();
  const isCardModalOpen = useSelector((state: RootState) => state.globalState.isCardModalOpen);

  const [clickedCard, setClickedCard] = useState<TaskDataProps | null>(null);

  const allSprint = Object.keys(data).length;
  const items: CollapseProps['items'] = Array.from({ length: allSprint }, (_, index) => ({
    key: (index + 1).toString(),
    label: `${projectName} Sprint ${index + 1}`,
    children:
      <>
        {data[index+1].map((task: TaskDataProps, idx: number) => {
          return (
            <div className={`flex justify-between items-center p-3 w-full h-full border-[1px] border-solid border-zinc-700 rounded-sm duration-100 hover:bg-zinc-800 hover:cursor-pointer`} key={`backlog-collapse-box-${index}-key-${idx}`} onClick={() => handleCardTaskOpen(task)}>
              <div className="flex md:gap-4 sm:gap-2">
                <p className="">{projectName}-{task["task-id"]}</p>
                <p className="">{task["title"]}</p>
              </div>
              <div className="flex gap-4">
                {statusBadge(task["status"])}
                {pointBadge(task["point"])}
                {priorityBadge(task["priority"])}
                <p className="">{task["assignee"]}</p>
              </div>
            </div>
          )
        })}
        
        <div className="flex items-center p-3 w-full h-full rounded-sm duration-100 hover:bg-zinc-800 hover:cursor-pointer">
          <PlusOutlined />
          <p className="ml-2">Create new</p>
        </div>
      </>
  }))
  
  const handleCardTaskOpen = (task: TaskDataProps) => {
    setClickedCard(task)
    dispatch(setIsCardModalOpen(true))
  }
  
  return(
    <ConfigProvider theme={{
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    }}>
      <Fragment>
        <Navbar/>
        <div className="flex flex-col gap-4 md:p-8 w-full min-h-screen bg-zinc-800">
          <p>Backlog</p>
          <Collapse items={items} defaultActiveKey={['1']} />
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

export default Backlog
