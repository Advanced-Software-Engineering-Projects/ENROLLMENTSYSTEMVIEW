import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
} from 'chart.js';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Lottie from 'lottie-react';
import LoadingAnimation from '../../assets/Animations/LoadingPage/LoadingAnimation.json'; // Adjust path as needed
import {
  getRegisteredStudentsCount,
  getActiveCoursesCount,
  getPendingApprovalsCount,
  getPendingRequests,
  getEnrollmentData,
  getCompletionRateData,
} from '../../Endpoints/AdminEndpoints';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title
);

// Styled components for industrial look
const IndustrialPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, #2A2E35 0%, #1A2027 100%)',
  border: '1px solid #3A3F47',
  borderRadius: '12px',
  boxShadow: theme.shadows[6],
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const MetricCard = styled(Card)(({ theme }) => ({
  background: '#252B32',
  color: '#FFFFFF',
  borderRadius: '10px',
  border: '1px solid #4A4F55',
  boxShadow: theme.shadows[4],
}));

const localizer = momentLocalizer(moment);

// Custom Toolbar Component
const CustomToolbar = ({ label, onNavigate, onView }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
      <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '5px 10px',
            fontSize: '1rem',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#094c50')}
          onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
          onClick={() => onNavigate('PREV')}
        >
          Back
        </button>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '5px 10px',
            fontSize: '1rem',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#094c50')}
          onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
          onClick={() => onNavigate('TODAY')}
        >
          Today
        </button>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '5px 10px',
            fontSize: '1rem',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#094c50')}
          onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
          onClick={() => onNavigate('NEXT')}
        >
          Next
        </button>
      </Box>
    </Box>
  );
};

const AdminDashboard = ({ toggleTheme, mode }) => {
  const [registeredStudents, setRegisteredStudents] = useState(0);
  const [activeCourses, setActiveCourses] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [completionRateData, setCompletionRateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get the current year
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          registeredStudentsRes,
          activeCoursesRes,
          pendingApprovalsRes,
          pendingRequestsRes,
          enrollmentDataRes,
          completionRateDataRes,
        ] = await Promise.all([
          getRegisteredStudentsCount(),
          getActiveCoursesCount(),
          getPendingApprovalsCount(),
          getPendingRequests(),
          getEnrollmentData(),
          getCompletionRateData(),
        ]);

        setRegisteredStudents(registeredStudentsRes.data.count ?? 0);
        setActiveCourses(activeCoursesRes.data.count ?? 0);
        setPendingApprovals(pendingApprovalsRes.data.count ?? 0);
        setPendingRequests(pendingRequestsRes.data ?? []);
        setEnrollmentData(enrollmentDataRes.data ?? []);
        setCompletionRateData(completionRateDataRes.data ?? []);
      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Lottie animationData={LoadingAnimation} style={{ width: 500, height: 300 }} />
      </Box>
    );

  const enrollmentChartData = {
    labels: ['Registered', 'Unregistered'],
    datasets: [
      {
        data: [registeredStudents, 1500 - registeredStudents], // Assume 1500 total capacity
        backgroundColor: ['#094c50', '#FFFFFF'],
        borderWidth: 0,
      },
    ],
  };

  const enrollmentChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#FFFFFF' } },
      title: { display: true, text: 'Student Enrollment', color: '#FFFFFF' },
    },
    cutout: '70%',
  };

  const completionRateLineChartData = {
    labels: completionRateData.map((data) => data.semester),
    datasets: [
      {
        label: 'Completion Rate (%)',
        data: completionRateData.map((data) => data.rate),
        fill: true,
        backgroundColor: 'rgba(9, 76, 80, 0.8)',
        borderColor: '#FFFFFF',
        tension: 0.4,
      },
    ],
  };

  const completionRateLineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: { position: 'top', labels: { color: '#FFFFFF' } },
      title: { display: true, text: 'Course Completion Rate by Semester', color: '#FFFFFF' },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Completion Rate (%)', color: '#FFFFFF' },
        ticks: { color: '#B0BEC5' },
      },
      x: {
        title: { display: true, text: 'Semesters', color: '#FFFFFF' },
        ticks: { color: '#B0BEC5' },
        grid: { color: '#FFFFFF' },
      },
    },
  };

  const calendarEvents = pendingRequests.map((request) => ({
    title: `${request.requestType} - ${request.studentId}`,
    start: new Date(request.date),
    end: new Date(request.date),
    allDay: true,
  }));

  return (
    <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
      <style>
        {`
          .rbc-calendar .rbc-month-view .rbc-day-bg {
            background-color: #252B32 !important;
          }
          .rbc-calendar .rbc-month-view .rbc-today {
            background-color: #094c50 !important;
          }
          .rbc-calendar .rbc-month-view .rbc-off-range-bg {
            background-color: #1A2027 !important;
          }
          .rbc-calendar .rbc-month-view .rbc-event {
            background-color: #094c50 !important;
            color: #FFFFFF !important;
            border-radius: 5px;
          }
          .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event {
            background-color: #094c50 !important;
            color: #FFFFFF !important;
          }
          .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event:hover {
            background-color: #094c50 !important;
          }
          .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event:focus {
            outline: none;
          }
        `}
      </style>
      {/* Welcome Section */}
      <IndustrialPaper sx={{ p: 3, mb: 4, background: 'linear-gradient(180deg, #dedede 0%, #094c50 100%)' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ color: '#000', fontWeight: 'bold', fontSize: '2rem' }}>
            Admin Dashboard 👋
          </Typography>
          <Typography variant="body1" sx={{ color: '#000', mb: 2 }}>
            Manage student records, courses, and approvals efficiently. 🚀
          </Typography>
        </CardContent>
      </IndustrialPaper>

      {/* Metrics Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <MetricCard>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <PeopleIcon sx={{ color: '#B0BEC5', mr: 1 }} />
                <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
                  Registered Students
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
                {registeredStudents}
              </Typography>
            </CardContent>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <LibraryBooksIcon sx={{ color: '#B0BEC5', mr: 1 }} />
                <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
                  Active Courses
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
                {activeCourses}
              </Typography>
            </CardContent>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <AssignmentTurnedInIcon sx={{ color: '#B0BEC5', mr: 1 }} />
                <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
                  Pending Approvals
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
                {pendingApprovals}
              </Typography>
            </CardContent>
          </MetricCard>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <IndustrialPaper sx={{ height: '400px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
                Student Enrollment
              </Typography>
              <Box sx={{ height: '300px' }}>
                <Doughnut data={enrollmentChartData} options={enrollmentChartOptions} />
              </Box>
            </CardContent>
          </IndustrialPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <IndustrialPaper sx={{ height: '400px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
                Course Completion Rate
              </Typography>
              <Box sx={{ height: '300px' }}>
                <Line data={completionRateLineChartData} options={completionRateLineChartOptions} />
              </Box>
            </CardContent>
          </IndustrialPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <IndustrialPaper sx={{ height: '400px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
                Pending Approval Requests
              </Typography>
              <TableContainer>
                <Table sx={{ backgroundColor: 'transparent' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Student ID</TableCell>
                      <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Course Code</TableCell>
                      <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Request Type</TableCell>
                      <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell sx={{ color: '#B0BEC5' }}>{request.studentId}</TableCell>
                        <TableCell sx={{ color: '#B0BEC5' }}>{request.courseCode}</TableCell>
                        <TableCell sx={{ color: '#B0BEC5' }}>{request.requestType}</TableCell>
                        <TableCell sx={{ color: '#B0BEC5' }}>{request.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </IndustrialPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <IndustrialPaper sx={{ height: '400px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
                Administrative Deadlines
              </Typography>
              <Box sx={{ height: '300px' }}>
                <Calendar
                  localizer={localizer}
                  events={calendarEvents}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '100%', backgroundColor: '#252B32', color: '#FFFFFF' }}
                  defaultView="month"
                  views={['month']}
                  components={{
                    toolbar: CustomToolbar,
                  }}
                  eventPropGetter={() => ({
                    style: {
                      backgroundColor: '#094c50',
                      borderRadius: '5px',
                      color: '#FFFFFF',
                    },
                  })}
                />
              </Box>
            </CardContent>
          </IndustrialPaper>
        </Grid>
        <Grid item xs={12} md={12}>
          <IndustrialPaper sx={{ height: '200px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF', textAlign: 'center' }}>
                The University of the South Pacific
              </Typography>
              <Typography variant="body1" sx={{ color: '#B0BEC5', mb: 2, textAlign: 'center' }}>
                Empowering student success through efficient administration. 🌟
              </Typography>
              <Typography variant="body1" sx={{ color: '#B0BEC5', mb: 2, textAlign: 'center' }}>
                Serving the future of students since © 1968
              </Typography>
            </CardContent>
          </IndustrialPaper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminDashboard;
