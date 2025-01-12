import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";

const CalendarSection = ({ tasks }) => {
  const today = dayjs();
  const eventColors = {
    task: "#ee4fce",
    meeting: "cyan",
    deadline: "#cb00f5",
  };

  const events = tasks.map((task) => ({
    event_type: "task",
    date: new Date(task.deadline),
    project_id: task.projectId || task.project?.projectId,
    description: task.title,
  }));
  // Function to find events for a specific day
  const getEventsForDay = (day) =>
    events.filter((event) => dayjs(event.date).isSame(day, "day"));

  // Custom Day Renderer
  const CustomDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const events = getEventsForDay(day);

    return (
      <Tooltip
        title={
          events.length > 0 ? (
            <div>
              {events.map((event, index) => (
                <div key={index}>
                  <strong>
                    {event.event_type.charAt(0).toUpperCase() +
                      event.event_type.slice(1)}
                  </strong>
                  <br />
                  {event.description}
                </div>
              ))}
            </div>
          ) : null
        }
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -10], // Adjust vertical offset
                },
              },
            ],
          },
        }}
      >
        <span>
          <Badge
            key={day.toString()}
            overlap="circular"
            badgeContent={
              events.length > 0 ? (
                <div style={{ display: "flex", gap: "3px" }}>
                  {events.map((event, index) => (
                    <span
                      key={index}
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: eventColors[event.event_type],
                      }}
                    ></span>
                  ))}
                </div>
              ) : null
            }
          >
            <PickersDay
              {...other}
              outsideCurrentMonth={outsideCurrentMonth}
              day={day}
            />
          </Badge>
        </span>
      </Tooltip>
    );
  };

  return (
    <div
      className="calendar_main"
      style={{ padding: "0.1rem", borderRadius: "20px" }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          showDaysOutsideCurrentMonth
          fixedWeekNumber={4}
          defaultValue={today}
          views={["year", "month", "day"]}
          slots={{ day: CustomDay }}
          sx={{
            backgroundColor: "white", // Set background color to #333
            color: "black", // Change text color to white for contrast
            width: "21rem",
            padding: "0.1rem",
            "& .Mui-selected": {
              backgroundColor: "orange", // Selector circle background
              color: "white", // Selector text color
            },
            "& .MuiPickersDay-today": {
              borderColor: "black", // Today's date circle border color
              border: "1px solid black",
            },
            borderRadius: "20px", // Add border radius
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CalendarSection;
