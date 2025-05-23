import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';
 
const AcademicPlan = ({ plan }) => {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Academic Plan for {plan.studentId}
      </Typography>
      <Typography variant="body1">Program: {plan.programCode}</Typography>
      <Typography variant="body1" gutterBottom>Enrollment Year: {plan.enrollmentYear}</Typography>
      <Typography variant="h6">Required Courses</Typography>
      <List>
        {plan.requiredCourses.map((course) => (
          <ListItem key={course.courseCode} divider>
            <ListItemText primary={`${course.courseName} (${course.courseCode})`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
 
export default AcademicPlan;