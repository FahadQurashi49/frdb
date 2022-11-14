import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

import cityArea from '../resource/area.json';

const cities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Quetta',
    'Peshawar'
]

function Home() {

    const [city, setCity] = useState('');
    const cityAreaMap = new Map(cityArea as []);
    const [areas, setAreas] = useState([] as string[]);
    const [area, setArea] = useState('' as (string | null));

    

    const handleCityChange = (e: SelectChangeEvent) => {
        const selectedCity: string = e.target.value;
        const currentAreas = cityAreaMap.get(selectedCity) as string[];
        setAreas(currentAreas);
        setArea(null);
        setCity(selectedCity);
    };

    const handleAreaChange = (e: any, newValue: string | null) => {
        setArea(newValue);
    }
    return (
        <Box display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <form>
                <Box display='flex' >
                    <FormControl>
                        <InputLabel id="city-select-label">City</InputLabel>
                        <Select
                            labelId="city-select-label"
                            id="city-select"
                            label="City"
                            autoWidth
                            value={city}
                            sx={{ width: 150 }}
                            onChange={handleCityChange}
                        >
                            {cities.map(city => <MenuItem key={city} value={city}>{city}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Autocomplete
                        disablePortal
                        id="area-combo-box"
                        disabled={!city}
                        options={areas}
                        value={area}
                        onChange={handleAreaChange}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} label="Area" />}
                    />
                    <Button variant='contained'>SUBMIT</Button>
                </Box>
                
            </form>
        </Box>
    );
}

export default Home;