import React, { useState, useEffect } from "react";
import HeatMap from "@uiw/react-heat-map";

// Function to generate dummy data
export const generateDummyData = () => {
  const data = [];
  const startDate = new Date(2024, 0, 1); // January 1, 2024
  const endDate = new Date(2024, 11, 31); // December 31, 2024

  while (startDate <= endDate) {
    const dateString = startDate.toISOString().split("T")[0];
    data.push({
      date: dateString,
      count: Math.floor(Math.random() * 5), // Random contributions (0-4)
    });
    startDate.setDate(startDate.getDate() + 1); // Move to the next day
  }

  return data;
};

const Heatmap = () => {
  // State for heatmap data and rounded corners range
  const [heatmapData, setHeatmapData] = useState([]);
  const [range, setRange] = useState(5);

  // Generate dummy data on component mount
  useEffect(() => {
    setHeatmapData(generateDummyData());
  }, []);

  return (
    <div className="heatmap">
      <h1>Activity Heatmap</h1>
      <HeatMap
        value={heatmapData}
        width={1000}
        rectSize={15} // Adjust size of each block
        legendCellSize={15} // Legend block size
        space={2} // Space between blocks
        startDate={new Date("2024-01-01")} // Starting date
        endDate={new Date("2024-12-31")} // Ending date
        panelColors={{
          0: "#fff", // Lowest activity
          1: "#FFE0B2",
          2: "#FFC080",
          3: "#FFA040",
          4: "#FF9F00", // Highest activity
        }}
        legendRender={(props) => {
          const { key, ...rest } = props; // Extract key from props
          return <rect {...rest} y={props.y + 10} rx={range} key={key} />;
        }}
        
        rectProps={{
          rx: range, // Rounded corners for blocks
        }}
      />
    </div>
  );
};

export default Heatmap;
