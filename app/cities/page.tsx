"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Air, Opacity, Speed, Visibility, Compress } from "@mui/icons-material";
import { getWeather, getHistory, getForecast, getDailySummary,getLatestAlert,checkAlerts,sendEmailCity } from "@/actions/api";

const cardStyles = {
  marginBottom: 4,
  padding: 2,
  background: "linear-gradient(135deg, #f3f4f6, #e2e8f0)",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: 2,
};

const LargeCard = ({ data }: { data: any }) => (
  <Card sx={cardStyles}>
    <CardContent>
    <Typography variant="h6" sx={{ mb: 2 }}><strong>Daily Updates</strong></Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
            Main: <strong>{data.main}</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
            Description: <strong>{data.description}</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
            Humidity: <strong>{data.humidity}%</strong>
            <IconButton>
              <Opacity />
            </IconButton>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
            Wind Speed: <strong>{data.wind_speed} m/s</strong>
            <IconButton>
              <Air />
            </IconButton>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
            Pressure: <strong>{data.pressure} hPa</strong>
            <IconButton>
              <Compress />
            </IconButton>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
            Visibility: <strong>{data.visibility} m</strong>
            <IconButton>
              <Visibility />
            </IconButton>
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const TemperatureCard = ({
  temp,
  feelsLike,
}: {
  temp: string;
  feelsLike: string;
}) => {
  const formattedTemp = parseFloat(temp).toFixed(2);
  const formattedFeelsLike = parseFloat(feelsLike).toFixed(2);

  return (
    <Card sx={{ ...cardStyles, padding: 3 }}>
      <CardContent>
      <Typography variant="h6" sx={{ mb: 4 }}><strong></strong></Typography>
        <Typography variant="h6">
          Temperature: <strong>{formattedTemp}°C</strong>
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Feels Like: <strong>{formattedFeelsLike}°C</strong>
        </Typography>
      </CardContent>
    </Card>
  );
};

const DailySummaryCard = ({ summary }: { summary: any }) => (
  <Card sx={cardStyles}>
    <CardContent>
    <Typography variant="h6" sx={{ mb: 2 }}><strong>Daily Summary</strong></Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
          City:<strong> {summary.city}</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
          Date:<strong> {summary.date}</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
          Condition:<strong> {summary.dominant_condition}</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
          Max Temp:<strong> {parseFloat(summary.max_temp).toFixed(2)}°C</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
          Min Temp:<strong> {parseFloat(summary.min_temp).toFixed(2)}°C</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
          Avg Temp:<strong> {parseFloat(summary.avg_temp).toFixed(2)}°C</strong>
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AlertCard = ({ alertData }: { alertData: any }) => {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleSendEmail = async () => {
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);

    try {
      await sendEmailCity(city, email);
      console.log("Alert email sent successfully");
      handleModalClose();
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  return (
    <Card sx={{ marginBottom: 4, padding: 2, background: "linear-gradient(135deg, #f3f4f6, #e2e8f0)", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3 }}><strong>Alert</strong></Typography>
        {alertData?.alert_message ? (
          <Typography variant="body1" sx={{ marginTop: "5px" }}>{alertData.alert_message}</Typography>
        ) : (
          <Typography variant="body1" sx={{ marginTop: "5px" }}>No alerts yet</Typography>
        )}
        <Button variant="contained" sx={{ marginTop: "10px", backgroundColor: "black", color: "white" }} onClick={handleModalOpen}>
          Check Alerts
        </Button>

        <Modal open={openModal} onClose={handleModalClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>Send Alert Notification</Typography>
            
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailError ? "Invalid email format" : ""}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select City</InputLabel>
              <Select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                label="Select City"
              >
                <MenuItem value="Delhi">Delhi</MenuItem>
                <MenuItem value="Mumbai">Mumbai</MenuItem>
                <MenuItem value="Kolkata">Kolkata</MenuItem>
                <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                <MenuItem value="Chennai">Chennai</MenuItem>
                <MenuItem value="Bengaluru">Bengaluru</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" sx={{ marginTop: "20px", backgroundColor: "black", color: "white" }} onClick={handleSendEmail}>
              Send Email
            </Button>
          </Box>
        </Modal>
      </CardContent>
    </Card>
  );
};

export default function CitiesPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [dailySummary, setDailySummary] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alertData, setAlertData] = useState<any | null>(null);

  const cities = ["Delhi", "Mumbai", "Kolkata", "Hyderabad", "Chennai", "Bengaluru"];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const fetchCityData = async (city: string) => {
      setLoading(true);
      try {
        const weatherData = await getWeather();
        const historyData = await getHistory(city);
        const forecastData = await getForecast(city);
        const alerts = await checkAlerts();
        const summary = await getDailySummary(city.charAt(0).toUpperCase() + city.slice(1));
        const alertData = await getLatestAlert(city.charAt(0).toUpperCase() + city.slice(1)); 
        console.log("getLatestAlert response:", alertData);

        setWeatherData(weatherData.weather || []);
        setHistoryData(historyData.list || []);
        setForecastData(forecastData.list || []);
        setDailySummary(summary || null);
        setAlertData(alertData || null);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
      setLoading(false);
    };

    fetchCityData(cities[activeTab]);

    const intervalId = setInterval(() => {
      fetchCityData(cities[activeTab]);
    }, 300000); 

    return () => clearInterval(intervalId);
  }, [activeTab]);

  const convertKelvinToCelsius = (kelvin: number) => (kelvin - 273.15).toFixed(2);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", typography: "body1", padding: 2, backgroundColor: "#f7f8fa", minHeight: "100vh" }}>
      <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        {cities.map((city) => (
          <Tab key={city} label={city} />
        ))}
      </Tabs>

      {cities.map((city, index) =>
        activeTab === index && weatherData?.length > 0 ? (
          <Box key={city} sx={{ padding: 2 }}>
            <LargeCard data={weatherData[index]} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TemperatureCard temp={weatherData[index]?.temp_celsius || 0} feelsLike={weatherData[index]?.feels_like || 0} />
              </Grid>
              <Grid item xs={12} md={6}>
              <AlertCard alertData={alertData} />
              </Grid>
              <Grid item xs={12}>
                {dailySummary && <DailySummaryCard summary={dailySummary} />}
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={cardStyles}>
                  <CardContent>
                    <Typography variant="h6"><strong>History</strong></Typography>
                    <Typography variant="body1">
                      Latest Temperature:{" "}
                      <strong>
                        {historyData?.length > 0
                          ? `${convertKelvinToCelsius(historyData[historyData.length - 1]?.main?.temp)}°C`
                          : "No data available"}
                      </strong>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                {forecastData?.length > 0 && (
                  <Card sx={cardStyles}>
                    <CardContent>
                    <Typography variant="h6"><strong>Forecast</strong></Typography>
                      <Typography variant="body1">
                        Upcoming Temperature:{" "}
                        <strong>
                          {forecastData?.length > 0
                            ? `${convertKelvinToCelsius(forecastData[0]?.main?.temp)}°C`
                            : "No forecast available"}
                        </strong>
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Grid>

              
            </Grid>
          </Box>
        ) : null
      )}
    </Box>
  );
}
