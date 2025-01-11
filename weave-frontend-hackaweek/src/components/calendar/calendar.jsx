import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import Modal from "../Modal/Modal";
import AddTask from "../ProjectHome/Addtask";

const Calendar = (props) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [Selected, setSelected] = useState({});

  // useEffect(() => {
  //   let initial_data = JSON.parse(localStorage.getItem('Events') || '[]');
  //   console.log(initial_data);
  //   setCurrentEvents(initial_data);
  // }, []);

  const handleDateClick = (selected) => {
    setSelected(selected);
    setIsShowing(true);
  };

  async function handleAddTask(formdata) {
    let data = JSON.parse(formdata);
    const title = data.title;
    const calendarApi = Selected.view.calendar;
    calendarApi.unselect();
    if (title) {
      let event = {
        id: `${Selected.startStr}-${title}`,
        title,
        start: Selected.startStr,
        end: data.deadline,
        allDay: Selected.allDay,
      };
      calendarApi.addEvent(event);
      setIsShowing(false);
      // localStorage.setItem('Events', JSON.stringify(calendarApi.getEvents()));
      setCurrentEvents(calendarApi.getEvents());
    }
  }

  const handleEventClick = (selected) => {
    const calendarApi = selected.view.calendar;
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
      // localStorage.setItem('Events', Json.stringify(calendarApi.getEvents()));
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor="black"
          p="15px"
          borderRadius="4px"
          color="white"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: "white",
                  margin: "10px 0",
                  color: "black",
                  borderRadius: "5px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: 1,
                title: "Backend",
                start: "2023-05-26",
                end: "2023-05-26",
              },
              {
                id: 2,
                title: "Frontend",
                start: "2023-05-24",
                end: "2023-05-24",
              },
              {
                id: 3,
                title: "Database",
                start: "2023-05-20",
                end: "2023-05-22",
              },
              {
                id: 4,
                title: "Design and UI",
                start: "2023-05-15",
                end: "2023-05-15",
              },
              {
                id: 5,
                title: "File Uploader",
                start: "2023-05-18",
                end: "2023-05-18",
              },
            ]}
          />
        </Box>
      </Box>
      <Modal open={isShowing} close={() => setIsShowing(false)}>
        {" "}
        <AddTask handleAddTask={handleAddTask} project={props.project} />
      </Modal>
    </Box>
  );
};

export default Calendar;
