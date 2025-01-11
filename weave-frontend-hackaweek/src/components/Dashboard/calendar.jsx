import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";

const CalendarSection = () => {
  const today = dayjs();
  const eventColors = {
    task: "#ee4fce",
    meeting: "cyan",
    deadline: "#cb00f5",
  };

  // Sample data with event descriptions
  const data = [
    { event_type: "task", date: new Date(2025, 0, 6), project_id: "002", description: "Complete project proposal" },
    { event_type: "meeting", date: new Date(2025, 1, 20), project_id: "003", description: "Team sync-up" },
    { event_type: "deadline", date: new Date(2025, 1, 12), project_id: "005", description: "Submit final report" },
    { event_type: "task", date: new Date(2025, 1, 1), project_id: "006", description: "Code review" },
    { event_type: "meeting", date: new Date(2025, 1, 3), project_id: "007", description: "Client meeting" },
    { event_type: "deadline", date: new Date(2025, 1, 5), project_id: "008", description: "Deadline for testing" },
    { event_type: "task", date: new Date(2025, 1, 7), project_id: "009", description: "Fix bug in the system" },
    { event_type: "meeting", date: new Date(2025, 1, 9), project_id: "010", description: "Team retrospective" },
    { event_type: "deadline", date: new Date(2025, 1, 11), project_id: "011", description: "Release version 1.0" },
    { event_type: "task", date: new Date(2025, 1, 13), project_id: "012", description: "Research new features" },
    { event_type: "meeting", date: new Date(2025, 1, 15), project_id: "013", description: "Sprint planning" },
    { event_type: "deadline", date: new Date(2025, 1, 17), project_id: "014", description: "Submit app for review" },
    { event_type: "task", date: new Date(2025, 1, 19), project_id: "015", description: "Prepare presentation" },
    { event_type: "meeting", date: new Date(2025, 1, 19), project_id: "016", description: "Discuss feedback" },
  ];

  // Function to find events for a specific day
  const getEventsForDay = (day) =>
    data.filter((event) => dayjs(event.date).isSame(day, "day"));

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
                  <strong>{event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}</strong>
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
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
          </Badge>
        </span>
      </Tooltip>
    );
  };

  return (
    <div className="calendar_main" style={{padding:"0.1rem",borderRadius:"20px"}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                  showDaysOutsideCurrentMonth
                  fixedWeekNumber={4}
                  defaultValue={today}
                  views={["year", "month", "day"]}
                  slots={{ day: CustomDay }}
                  sx={{
                    backgroundColor: "white",  // Set background color to #333
                    color: "black",           // Change text color to white for contrast
                    width: "21rem",
                    padding: "0.1rem",
                    "& .Mui-selected": {
                        backgroundColor: "orange", // Selector circle background
                        color: "white",            // Selector text color
                      },
                        "& .MuiPickersDay-today": {
                          borderColor: "black", // Today's date circle border color
                          border: "1px solid black",
                        },
                    borderRadius: '20px',      // Add border radius
                  }}
        />

      </LocalizationProvider>
    </div>
  );
};

export default CalendarSection;
