import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { getPrerequisiteGraph } from '../Endpoints/Endpoint';
import * as d3 from 'd3';
 
const PrerequisiteGraph = ({ courseCode }) => {
  const [graphData, setGraphData] = useState(null);
 
  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const res = await getPrerequisiteGraph(courseCode);
        setGraphData(res.data);
      } catch (error) {
        console.error('Error fetching graph:', error);
      }
    };
    if (courseCode) fetchGraph();
  }, [courseCode]);
 
  useEffect(() => {
    if (graphData) {
      drawGraph();
    }
  }, [graphData]);
 
  const drawGraph = () => {
    d3.select('#prereq-graph').selectAll('*').remove(); // Clear previous graph
    const svg = d3.select('#prereq-graph')
      .attr('width', 600)
      .attr('height', 400);
 
    const simulation = d3.forceSimulation(graphData.nodes)
      .force('link', d3.forceLink(graphData.links).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-50))
      .force('center', d3.forceCenter(300, 200));
 
    const link = svg.append('g')
      .selectAll('line')
      .data(graphData.links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6);
 
    const node = svg.append('g')
      .selectAll('circle')
      .data(graphData.nodes)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('fill', '#8F1D36');
 
    const labels = svg.append('g')
      .selectAll('text')
      .data(graphData.nodes)
      .enter()
      .append('text')
      .text(d => d.id)
      .attr('font-size', 10)
      .attr('dx', 12)
      .attr('dy', 4);
 
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
 
      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
 
      labels
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });
  };
 
  return (
    <Box>
      <Typography variant="h6">Prerequisite Graph for {courseCode}</Typography>
      <svg id="prereq-graph"></svg>
    </Box>
  );
};
 
export default PrerequisiteGraph;