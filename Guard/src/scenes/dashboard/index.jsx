import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dutyStatus, setDutyStatus] = useState('notStarted');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const startDuty = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
  
      const start = new Date();
      setStartTime(start);
      setDutyStatus('started');
  
      const response = await fetch('/user/startDuty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          checkin_time: start.toISOString()
        })
      });
  
      if (response.ok) {
        const data = await response.json(); // Parse JSON only if response is OK
        console.log('Duty started successfully', data);
      } else {
        const errorData = await response.json(); // Handle non-OK responses
        console.error('Failed to start duty:', errorData.message);
      }
  
    } catch (error) {
      console.error('Error in starting duty:', error.message);
    }
  };
  
  


  const endDuty = async () => {
    try {
      const response = await axios.get('/endDuty', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}` // Auth token from localStorage
        }
      });
  
      if (response.status === 200) {
        setDutyStatus('ended');
        console.log('Duty ended successfully', response.data);
      } else {
        console.error('Failed to end duty:', response.data.error);
      }
    } catch (error) {
      console.error('Error in ending duty:', error.message);
    }
  };
  
  

  const calculateElapsedTime = () => {
    // Implement the logic to calculate elapsed time from check-in time
    // Replace this with your actual logic
    return '2 hours'; // Placeholder value
  };


  return (
    
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          {dutyStatus === 'notStarted' && (
            <Button
              onClick={startDuty}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Start Duty
            </Button>
          )}

          {dutyStatus === 'started' && (
            <Button
              onClick={endDuty}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              End Duty
            </Button>
          )}
        </Box>

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="24"
            subtitle="Present"
            progress="0.75"
            increase="+14%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="6"
            subtitle="Absent"
            progress="0.50"
            increase="+21%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="4.6"
            subtitle="Rating"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="134"
            subtitle="Incident Repoted"
            progress="0.80"
            increase="+13%"
            icon={
              <NewReleasesIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;
