import { useNavigate } from 'react-router-dom';
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/SearchSharp';
import { grey } from '@mui/material/colors';

import cityArea from '../resource/area.json';



const cities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Quetta',
    'Peshawar'
]

function RestaurantSearch() {
    const navigate = useNavigate();
    const [city, setCity] = useState('');
    const cityAreaMap = new Map(cityArea as []);
    const [areas, setAreas] = useState([] as string[]);
    const [area, setArea] = useState('' as (string | null));

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
        <Box >
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Box display='flex' alignItems='center'>
                    <FormControl>
                        <InputLabel size='small' id="city-select-label">City</InputLabel>
                        <Select
                            labelId="city-select-label"
                            id="city-select-search"
                            label='City'
                            autoWidth
                            value={city}
                            sx={{ width: 150, mx: marginBetween, bgcolor: 'primary.contrastText' }}
                            onChange={handleCityChange}
                            displayEmpty
                            size='small'
                        >
                            {cities.map(city => <MenuItem key={city} value={city}>{city}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Autocomplete
                        disablePortal
                        id="area-combo-box-search"
                        disabled={!city}
                        options={areas}
                        value={area}
                        onChange={handleAreaChange}
                        size='small'
                        sx={{ width: 200, mx: marginBetween, bgcolor: 'primary.contrastText' }}
                        renderInput={(params) => <TextField {...params} label='Area' />}
                    />
                    <Button variant='text'
                        type='submit'
                        disableElevation
                        sx={{ mx: marginBetween, color: 'primary.contrastText', ':disabled': {color: grey[300]} }}
                        disabled={!city || !area}
                    >
                        <SearchIcon fontSize='large' />
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default RestaurantSearch;