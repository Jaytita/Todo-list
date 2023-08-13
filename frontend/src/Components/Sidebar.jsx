import './sidebar.css'
import {  WbSunny,
    Nightlight,
    EventNote,
    AccessTime,
    MeetingRoom,
  } from '@mui/icons-material';

export default function Sidebar() {
  return (
    <section className="sidebar">
    <ul>
      <li class="active">
        <a href="#">
          <EventNote style={{fill: "white"}}/>
          <p>My tasks</p>
        </a>
      </li>

      <li>
        <a href="#">
          <AccessTime style={{fill: "white"}}/>
          <p>History</p>
        </a>
      </li>
    </ul>
    
    <ul>
      <li>
        <a href="#">
          <MeetingRoom style={{fill: "white"}}/>
          <p>Log out</p>
        </a>
      </li>

    </ul>
  </section>
  )
}
