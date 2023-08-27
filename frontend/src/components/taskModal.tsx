import { DownOutlined } from '@ant-design/icons';
import { RootState } from '@redux/store/reducers';
import { pointBadge, priorityBadge, projectName, statusBadge } from '@src/utils';
import { Divider, Dropdown, Modal, Space } from 'antd';
import { useSelector } from 'react-redux';

interface TaskModalProps {
  clickedCard: object;
  // onClick?: MouseEventHandler<HTMLDivElement>;
  onCancel?: () => void;
  items: object;
}

const TaskModal: React.FC<TaskModalProps> = ({ clickedCard, onCancel, items }) => {
  const isCardModalOpen = useSelector((state: RootState) => state.globalState.isCardModalOpen);
  return (
    <Modal centered title={clickedCard?.["title"]} footer={false} open={isCardModalOpen} onCancel={onCancel}>
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
            defaultActiveFirstOption
            style={{ width: 145 }} //"fit-content" }}
            onChange={handleChangeTaskStatus}
            options={items}
          /> */}
        </div>
        <div className="flex justify-between items-center gap-2">
          {pointBadge(clickedCard?.["point"] || 3)}
          {priorityBadge(clickedCard?.["priority"])}
          {clickedCard?.["assignee"]}
        </div>
      </div>
    </Modal>
  )
}

export default TaskModal
