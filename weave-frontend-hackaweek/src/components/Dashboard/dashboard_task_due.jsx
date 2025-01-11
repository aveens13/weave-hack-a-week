import React, { useState } from "react";
import { Layout, Dropdown, Button, Space, Menu, Avatar } from "antd";
import "./dashboard_task_due.css";

const DashboardTaskDue = ({ tasks }) => {
  const items = [
    {
      key: "1",
      value: "Today",
      label: <a target="_blank">Today</a>,
      onClick: () => setSelectedFilter("Today"),
    },
    {
      key: "2",
      value: "This Week",
      label: <a target="_blank">This Week</a>,
      onClick: () => setSelectedFilter("This Week"),
    },
    {
      key: "3",
      value: "This Month",
      label: <a target="_blank">This Month</a>,
      onClick: () => setSelectedFilter("This Month"),
    },
    {
      key: "4",
      value: "This Year",
      label: <a target="_blank">This Year</a>,
      onClick: () => setSelectedFilter("This Year"),
    },
    {
      key: "5",
      value: "All",
      label: <a target="_blank">All</a>,
      onClick: () => setSelectedFilter("All"),
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState("All");

  const filterTasks = (filterType) => {
    const today = new Date();

    return tasks.filter((task) => {
      const dueDate = new Date(task.deadline);
      console.log("Task Date:", dueDate.toDateString()); // Debug

      // Exclude tasks whose deadlines have passed
      if (dueDate < today.setHours(0, 0, 0, 0)) {
        return false;
      }

      switch (filterType) {
        case "Today":
          return dueDate.toDateString() === new Date().toDateString();
        case "This Week":
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return dueDate >= startOfWeek && dueDate <= endOfWeek;
        case "This Month":
          return (
            dueDate.getMonth() === today.getMonth() &&
            dueDate.getFullYear() === today.getFullYear()
          );
        case "This Year":
          return dueDate.getFullYear() === today.getFullYear();
        default:
          return true;
      }
    });
  };

  const handleFilterChange = (value) => {
    console.log(value);
    setSelectedFilter(value);
  };

  const filteredData = filterTasks(selectedFilter);

  function formatDueDate(dueDate) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (dueDate.toDateString() === today.toDateString()) {
      return `Today ${dueDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })}`;
    } else if (dueDate.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow ${dueDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })}`;
    } else {
      const options = { day: "numeric", month: "short", year: "numeric" }; // Day, short month, and year
      return `${dueDate
        .toLocaleDateString("en-US", options)
        .replace(/,/g, "")}, ${dueDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })}`;
    }
  }

  return (
    <div className="dashboard_task_due_main">
      <div className="task_due_header_main_main">
        <div className="task_due_header_main">
          <div className="task_due_header_1">
            <label style={{ color: "black" }}>Tasks Due</label>
          </div>

          <div className="task_due_header_2">
            <Space wrap>
              <Dropdown
                className="dropdown"
                menu={{ items }}
                placement="bottom"
                onChange={(e) => handleFilterChange(e.value)}
              >
                <Button>
                  {selectedFilter === "Today" ? "Today" : selectedFilter}
                </Button>
              </Dropdown>
            </Space>
          </div>
        </div>
      </div>

      <div className="task_due_content_main_main">
        {filteredData.length === 0 ? (
          <p>No Tasks Due!!</p>
        ) : (
          filteredData.map((d, index) => (
            <div className="task_due_content_main" key={d.taskId}>
              <div className="task_due_content_upper">
                {/* Left Content */}
                <div className="task_due_content_upper_left">
                  <div className="task_due_content_title" id={`title-${index}`}>
                    <span>{d.title}</span>
                  </div>
                  <div className="task_due_content_project">
                    <span>{d.project.projectTitle}</span>
                  </div>
                </div>

                {/* Right Content */}
                <div className="task_due_content_upper_right custom-checkbox">
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      onChange={(e) =>
                        (document.getElementById(
                          `title-${index}`
                        ).style.textDecoration = e.target.checked
                          ? "line-through"
                          : "none")
                      }
                    />
                    <label htmlFor={`checkbox-${index}`}>
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="divider-div content-div">
                <hr className="divider" />
              </div>
              <div className="task_due_content_lower">
                <div className="task_due_content_deadline">
                  <span>{formatDueDate(new Date(d.deadline))}</span>
                </div>
                <div className="task_due_content_assigned">
                  {/* Add logic to display assigned people */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardTaskDue;
