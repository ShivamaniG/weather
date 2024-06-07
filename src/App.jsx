import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import './App.css';

const App = () => {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const changeHandler = event => {
    setCity(event.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found.');
        }
        return response.json();
      })
      .then(data => {
        const kelvin = data.main.temp;
        const celcius = kelvin - 273.15;
        let weatherDescription = data.weather[0].description.toLowerCase();

        let weatherCondition;
        if (weatherDescription.includes('clear') || weatherDescription.includes('sun')) {
          weatherCondition = 'Sunny';
        } else if (weatherDescription.includes('cloud') || weatherDescription.includes('overcast')) {
          weatherCondition = 'Cloudy';
        } else if (weatherDescription.includes('rain')) {
          weatherCondition = 'Rainy';
        } else if (weatherDescription.includes('snow')) {
          weatherCondition = 'Snowy';
        } else if (weatherDescription.includes('wind')) {
          weatherCondition = 'Windy';
        } else {
          weatherCondition = 'Unknown'; 
        }

        setResult(`Weather in ${city}: ${weatherCondition}, Temperature: ${Math.round(celcius)}°C`);
        setError("");
        
        document.getElementById('result').className = `weather-${weatherCondition.toLowerCase()}`;
      })
      .catch(error => {
        setResult("");
        setError(error.message);
      });
    setCity("");
  };

  return (
    <div>
      <center>
        <Card className="card">
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              Weather App
            </Typography>
            <form onSubmit={submitHandler}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={city}
                onChange={changeHandler}
                error={Boolean(error)}
                helperText={error}
              /><br /><br />
              <Button type="submit" variant="contained" color="primary">
                Get Weather
              </Button>
            </form><br /> <br />
            <div id="result">
              <Typography variant="h5" component="div">
                {result}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </center>
    </div>
  );
}

export default App;
