import { useNavigate } from "react-router-dom";
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/SearchSharp';
import Image from '../resource/food-bg.webp';

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
    const navigate = useNavigate();

    const marginBetween = 0.5;

    

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/restaurants/${city}_${area}`);
    }

    return (
        <Box>
            <Box display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                sx={{
                    backgroundImage: `url(${Image})`,
                    backgroundSize: 'cover'
                }}
            >
                <Stack direction='column' >
                    <Box ml={1} mb={3}>
                        <Typography component="div" sx={{ typography: { md: 'h4', sm: 'h5', xs: 'h6' } }} >
                            Food Review Database
                        </Typography>
                        <Typography component="div" variant='subtitle1' >
                            Make your next meal decision informed
                        </Typography>
                    </Box>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Box display='flex' >
                        <FormControl>
                            <InputLabel id="city-select-label">City</InputLabel>
                            <Select
                                labelId="city-select-label"
                                id="city-select"
                                label="City"
                                autoWidth
                                value={city}
                                sx={{ width: 150, mx: marginBetween }}
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
                            sx={{ width: 200, mx: marginBetween }}
                            renderInput={(params) => <TextField {...params} label="Area" />}
                        />
                        <Button variant='contained'
                            type='submit'
                            disableElevation
                            sx={{ mx: marginBetween }}
                            disabled={!city || !area}
                        >
                            <SearchIcon fontSize='large' />
                        </Button>
                    </Box>

                </form>
                </Stack>
            </Box>
        </Box>
    );
}

export default Home;