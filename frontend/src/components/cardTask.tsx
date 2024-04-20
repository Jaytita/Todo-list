import { pointBadge, priorityBadge, projectName } from '@src/utils';
import { Card } from 'antd';
import { Fragment, MouseEventHandler } from 'react';

interface CardTaskProps {
  taskId: number;
  title: string;
  point?: number;
  priority: number;
  assignee: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const CardTask: React.FC<CardTaskProps> = ({ taskId, title, point, priority, assignee, onClick }) => {
  return (
    <Fragment>
      <Card style={{ width: "100%", cursor: "pointer" }} onClick={onClick}>
        <div className="mb-2">
          {title}
        </div>
        <div className="flex justify-between items-center">
          <div className="">
            {projectName}-{taskId}
          </div>
          <div className="flex justify-between items-center gap-1">
            {pointBadge(point || 3)}
            {priorityBadge(priority)}
            {assignee}
          </div>
        </div>
      </Card>
    </Fragment>
  )
}

export default CardTask
