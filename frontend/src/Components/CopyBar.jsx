import { React, useState } from 'react'
import './copybar.css'
import {  
    EventNote,
    AccessTime,
    MeetingRoom,
    Close,
  } from '@mui/icons-material';

export default function CopyBar() {
  const [activeTab, setActiveTab] = useState(0);
  const menuItems = [
    {
      label: 'My tasks',
      icon: <EventNote />,
    },
    {
      label: 'History',
      icon: <AccessTime />,
    },
  ];

  const handleTabChange = (index) => {
    setActiveTab(index);
  }

  return (
    <section className="sidebar">
      <ul className="side-menu top">
        {/* Show 'My tasks' and 'History' tabs */}
        {menuItems.map((item, index) => (
          <li className={activeTab === index ? 'active' : ''} key={index}>
            <a href="#" onClick={() => handleTabChange(index)}>
              {item.icon}
              <span className="text">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <ul className="side-menu">
        <li>
          <a href="#" className="logout">
            <MeetingRoom/>
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </section>
  )
};