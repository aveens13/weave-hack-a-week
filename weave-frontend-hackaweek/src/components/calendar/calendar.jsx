import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { formatDate } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import Modal from '../Modal/Modal';
import AddTask from '../ProjectHome/Addtask';
import './calendar.css';

const Calendar = (props) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [selected, setSelected] = useState({});

  const handleDateClick = (selected) => {
    setSelected(selected);
    setIsShowing(true);
  };

  const handleAddTask = (formdata) => {
    const data = JSON.parse(formdata);
    const title = data.title;
    const calendarApi = selected.view.calendar;

    calendarApi.unselect();
    if (title) {
      const event = {
        id: `${selected.startStr}-${title}`,
        title,
        start: selected.startStr,
        end: data.deadline,
        allDay: selected.allDay,
      };

      calendarApi.addEvent(event);
      setIsShowing(false);

      const updatedEvents = calendarApi.getEvents();
      localStorage.setItem('Events', JSON.stringify(updatedEvents));
      setCurrentEvents(updatedEvents);
    }
  };

  const handleEventClick = (selected) => {
    const calendarApi = selected.view.calendar;

    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'?`
      )
    ) {
      selected.event.remove();

      const updatedEvents = calendarApi.getEvents();
      localStorage.setItem('Events', JSON.stringify(updatedEvents));
      setCurrentEvents(updatedEvents);
    }
  };

  return (
    <Box m='0px'>
      <Box display='flex' justifyContent='space-between'>
        {/* Calendar Sidebar */}
        <Box
          flex='1 1 20%'
          backgroundColor='#111'
          p='15px'
          borderRadius='8px'
          color='#fff'
        >
          <Typography variant='h5'>Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: 'white',
                  margin: '10px 0',
                  color: 'black',
                  borderRadius: '8px',
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Calendar */}
        <Box
          flex='1 1 100%'
          ml='15px'
          sx={{
            borderRadius: '10px', // Apply border-radius to calendar container
            overflow: 'hidden',
          }}
        >
          <FullCalendar
            height='75vh'
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
            }}
            initialView='dayGridMonth'
            editable
            selectable
            selectMirror
            dayMaxEvents
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: 1,
                title: 'Database',
                start: '2025-01-14',
                end: '2025-01-19',
              },
              {
                id: 2,
                title: 'File Uploader',
                start: '2025-01-09',
                end: '2025-01-12',
              },
              {
                id: 3,
                title: 'Frontend',
                start: '2024-12-29',
                end: '2025-01-03',
              },
              {
                id: 4,
                title: 'Backend',
                start: '2025-01-24',
                end: '2025-01-27',
              },
            ]}
            customButtons={{
              prev: {
                text: '<',
                click: () => {},
              },
            }}
            buttonText={{
              today: 'Today',
              month: 'Month',
              week: 'Week',
              day: 'Day',
              list: 'List',
            }}
          />
        </Box>
      </Box>
      <Modal open={isShowing} close={() => setIsShowing(false)}>
        <AddTask handleAddTask={handleAddTask} project={props.project} />
      </Modal>
    </Box>
  );
};

export default Calendar;
