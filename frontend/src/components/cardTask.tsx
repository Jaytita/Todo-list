import { pointBadge, priorityBadge, projectName } from '@src/utils';
import { Card } from 'antd';

interface CardTaskProps {
  taskId: number;
  title: string;
  point?: number;
  priority: number;
  assignee: string;
}

const CardTask: React.FC<CardTaskProps> = ({ taskId, title, point, priority, assignee }) => {
  return (
    <Card key={taskId} style={{width: "100%"}}>
      <div className="mb-2">
        {title}
      </div>
      <div className="flex justify-between items-center">
        <div className="">
          {projectName}-{taskId}
        </div>
        <div className="flex gap-1">
          {pointBadge(point || 3)}
          {priorityBadge(priority)}
          {assignee}
        </div>
      </div>
    </Card>
  )
}

export default CardTask
