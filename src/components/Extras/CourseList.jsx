import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Button,
  Divider,
  Chip,
  Paper,
  Grid,
} from '@mui/material';
 
const CourseList = ({ courses, lockedCourses, onEnroll }) => {
  return (
   <Grid container spacing={2}>
    <Grid size={{ xs: 12 }}>
      {courses.length === 0 ? (
        <Typography variant="body1" color="textSecondary" align="center">
          No courses available.
        </Typography>
      ) : (
 
          <List>
            {courses.map((course) => {
              const isLocked = lockedCourses.has(course.courseCode);
              return (
                <ListItem
                  key={course.courseCode}
                  divider
                  sx={{ py: 2, '&:hover': { backgroundColor: '#f5f5f5' } }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                        {course.courseName} ({course.courseCode})
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" color="textSecondary">
                          {course.credits} Credits
                        </Typography>
                        <Chip
                          label={isLocked ? 'Locked' : 'Available'}
                          size="small"
                          color={isLocked ? 'error' : 'success'}
                          variant="outlined"
                        />
                      </Box>
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => onEnroll(course)} // Pass full course object to parent
                    disabled={isLocked}
                    sx={{ minWidth: 100, textTransform: 'none', fontWeight: 'bold' }}
                  >
                    Enroll
                  </Button>
                </ListItem>
              );
            })}
          </List>
       
      )}
      </Grid>
    </Grid>
  );
};
 
export default CourseList;