import { FastBackwardOutlined, FastForwardOutlined, PauseOutlined, StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";

export const emailValidate = (mail: string) => {
  let emailErrMsg = "";
  if (!mail) {
    emailErrMsg = "Required";
  } else if (mail && !/^\S+@\S+\.\S+$/.test(mail)) {
    emailErrMsg = "Wrong format";
  }
  return emailErrMsg;
}

export const agileProgress = ["To do", "In Progress", "Merge Request", "Ready to Test", "Testing", "Done"];

export const projectName = "MLD";

// Mock data
export type TaskDataProps = {
  "task-id": number;
  "title": string;
  "status": number;
  "point": number;
  "priority": number;
  "assignee": string;
}

export const data: { [key: number]: TaskDataProps[] } = {
  1: [
    {"task-id": 1, "title": "Cupcake", "status": 0, "point": 1, "priority": 1, "assignee": "Ken", },
    {"task-id": 2, "title": "Donut", "status": 1, "point": 2, "priority": 2, "assignee": "Ken", },
    {"task-id": 3, "title": "Eclair", "status": 2, "point": 1.5, "priority": 3, "assignee": "Ken", },
    {"task-id": 4, "title": "Froyo", "status": 3, "point": 3, "priority": 4, "assignee": "Ken", },
    {"task-id": 5, "title": "Gingerbread", "status": 4, "point": 5, "priority": 5, "assignee": "Ken", },
    {"task-id": 6, "title": "Honeycomb", "status": 5, "point": 100, "priority": 0, "assignee": "Ken", },
    {"task-id": 7, "title": "Ice Cream Sandwich", "status": 1, "point": 0.5, "priority": 3, "assignee": "Ken", },
    {"task-id": 8, "title": "Jelly Bean", "status": 1, "point": 1, "priority": 3, "assignee": "Ken", },
    {"task-id": 9, "title": "KitKat", "status": 4, "point": 0.25, "priority": 3, "assignee": "Ken", },
    {"task-id": 10, "title": "Lollipop", "status": 0, "point": 1, "priority": 3, "assignee": "Ken", },
  ],
  2: [
    {"task-id": 11, "title": "Marshmallow", "status": 0, "point": 1, "priority": 3, "assignee": "Ken", },
    {"task-id": 12, "title": "Nougat", "status": 0, "point": 1, "priority": 3, "assignee": "Ken", },
    {"task-id": 13, "title": "Oreo", "status": 0, "point": 1, "priority": 3, "assignee": "Ken", },
    {"task-id": 14, "title": "Pie", "status": 0, "point": 1, "priority": 3, "assignee": "Ken", },
    {"task-id": 15, "title": "Quince Tart", "status": 0, "point": 1, "priority": 3, "assignee": "Ken", },
  ],
}

export const statusBadge = (status: number) => {
  const statusColor: { [key: number]: string } = {
    0: "bg-gray-500",
    1: "bg-blue-500",
    2: "bg-indigo-500",
    3: "bg-orange-500",
    4: "bg-pink-500",
    5: "bg-emerald-600",
  }
  return (
    <div className={`flex justify-center items-center px-2 py-0.5 md:w-28 text-xs text-center rounded-full border-white ${statusColor[status]}`}>
      {agileProgress[status]}
    </div>
  )
}

export const pointBadge = (point: number) => {
  return (
    <div className={`flex justify-center items-center min-w-6 h-6 aspect-square text-xs text-center rounded-full bg-gray-700`}>
      {point}
    </div>
  )
}

export const priorityBadge = (priority: number = 3) => {
  if (priority === 1) {
    return <FastBackwardOutlined style={{ fontSize: '18px', color: '#059669' }} />
  } else if (priority === 2) {
    return <StepBackwardOutlined style={{ fontSize: '18px', color: '#4ade80' }} />
  } else if (priority === 4) {
    return <StepForwardOutlined style={{ fontSize: '18px', color: '#f97316' }} />
  } else if (priority === 5) {
    return <FastForwardOutlined style={{ fontSize: '18px', color: '#ef4444' }} />
  }
  return <PauseOutlined style={{ fontSize: '18px', color: '#eab308' }} />
}