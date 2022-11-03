import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const cities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Quetta',
    'Peshawar'
]

function Home() {
    const [city, setCity] = useState('');

    const handleCityChange = (e: SelectChangeEvent) => {
        setCity(e.target.value);
    };

    return (
        <Box display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <form>
                <FormControl fullWidth>
                    <InputLabel id="city-select-label">City</InputLabel>
                    <Select
                        labelId="city-select-label"
                        id="city-select"
                        label="City"
                        autoWidth
                        sx={{ px: '12px' }}
                        value={city}
                        onChange={handleCityChange}
                    >
                        {cities.map(city => <MenuItem value={city}>{city}</MenuItem>)}
                    </Select>
                </FormControl>
            </form>
        </Box>
    );
}

export default Home;