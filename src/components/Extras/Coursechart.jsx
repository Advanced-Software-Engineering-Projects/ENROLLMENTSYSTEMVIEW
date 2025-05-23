import React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography } from "@mui/material";
 
const Coursechart = ({ courseProgress, gpaData }) => {
  return (
    <Box>
      {/* Course Progress Pie Chart */}
      <Typography variant="h6" gutterBottom>
        Course Completion Progress
      </Typography>
      {/* <PieChart
        series={[
          {
            data: courseProgress,
            arcLabel: (item) => `${item.value}%`,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: 14,
          },
        }}
        width={300}
        height={200}
      /> */}
 
      {/* GPA Trends Bar Chart */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        GPA Trends Over Time
      </Typography>
      {/* <BarChart
        xAxis={[{ scaleType: "band", data: gpaData.labels }]}
        series={[{ data: gpaData.values, label: "GPA" }]}
        width={400}
        height={250}
      /> */}
    </Box>
  );
};
 
export default Coursechart;