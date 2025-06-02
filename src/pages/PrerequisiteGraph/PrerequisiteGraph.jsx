import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import { Box, Paper, Typography } from '@mui/material';
import 'reactflow/dist/style.css'; // Import ReactFlow styles

// Mock prerequisite graph data
const mockPrerequisiteGraphData = [
  {
    courseId: 1,
    courseCode: 'CS111',
    courseName: 'Introduction to Computer Science',
    isMet: true,
    parentCourseId: null,
  },
  {
    courseId: 2,
    courseCode: 'CS112',
    courseName: 'Data Structures and Algorithms',
    isMet: false,
    parentCourseId: 1,
  },
  {
    courseId: 3,
    courseCode: 'CS214',
    courseName: 'Design and Analysis of Algorithm',
    isMet: false,
    parentCourseId: 2,
  },
];

// Mock API function
const getPrerequisiteGraph = async () =>
  new Promise((resolve) => setTimeout(() => resolve(mockPrerequisiteGraphData), 500));

const PrerequisiteGraph = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const graphData = await getPrerequisiteGraph();
        const nodes = graphData.map((item, index) => ({
          id: item.courseId.toString(),
          data: {
            label: (
              <div style={{ color: item.isMet ? 'green' : 'red' }}>
                {item.courseCode} - {item.courseName} {item.isMet ? '(Met)' : '(Not Met)'}
              </div>
            ),
          },
          position: { x: 250, y: index * 100 },
        }));

        const edges = graphData
          .filter((item) => item.parentCourseId)
          .map((item) => ({
            id: `e${item.courseId}-${item.parentCourseId}`,
            source: item.parentCourseId.toString(),
            target: item.courseId.toString(),
            type: 'smoothstep',
          }));

        setElements([...nodes, ...edges]);
      } catch (error) {
        console.error('Error fetching prerequisite graph:', error);
      }
    };
    fetchGraph();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Prerequisite Graph
        </Typography>
        <Box sx={{ height: 400 }}>
          <ReactFlow elements={elements}>
            <Background />
            <Controls />
          </ReactFlow>
        </Box>
      </Paper>
    </Box>
  );
};

export default PrerequisiteGraph;