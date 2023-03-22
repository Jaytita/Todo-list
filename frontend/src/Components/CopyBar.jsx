import React from 'react'
import './copybar.css'
import {  
    EventNote,
    AccessTime,
    MeetingRoom,
  } from '@mui/icons-material';

export default function CopyBar() {
  return (
    <section id="sidebar">
		<ul class="side-menu top">
			<li class="active">
				<a href="#">
					<EventNote/>
					<span class="text">My tasks</span>
				</a>
			</li>
			<li>
				<a href="#">
					<AccessTime/>
					<span class="text">History</span>
				</a>
			</li>
		</ul>

		<ul class="side-menu">
			<li>
				<a href="#" class="logout">
					<MeetingRoom/>
					<span class="text">Logout</span>
				</a>
			</li>
		</ul>
	</section>
  )
}
