import React, { useState } from 'react';

import {
    Paper,
    Typography,
    Checkbox,
    TextField,
    FormControlLabel,
    FormLabel,
    FormGroup,
    FormControl,
    Box,
    Button,
    MenuItem,
    Select,
    OutlinedInput,
} from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';

import useStyles from './styles';
import { updateFilter, applyFilters } from '../../actions/filters';
import { BALANCE_LOW, BALANCE_UPPER, CITIES, MORTAGE, NUM_OF_CREDIT_CARDS } from '../../constants/filtersTypes';


const Filters = () => {

    const filters = useSelector((state) => state.posts.filters);
    const cities = useSelector((state) => state.posts.cities);
    const classes = useStyles();
    const dispatch = useDispatch();

    // maxCities - to incremently load the cities in the 'City select dropdown'
    const [maxCities, setMaxCities] = useState(50);

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) { setMaxCities(prevMaxCities => prevMaxCities + 50) }
    }

    return (
        <Paper className={classes.paper}>

            <Typography className={classes.filterTitle} variant="h6">{'Filters'}</Typography>

            <TextField
                className={classes.balance}
                value={filters[BALANCE_LOW]}
                label="Balance Low"
                variant="outlined"
                onChange={(e) => {
                    dispatch(updateFilter({
                        filterName: BALANCE_LOW,
                        filterValue: e.target.value,
                    }))
                }
                } />
            <TextField
                className={classes.balance}
                value={filters[BALANCE_UPPER]}
                label="Balance High"
                variant="outlined"
                onChange={(e) => {
                    dispatch(updateFilter({
                        filterName: BALANCE_UPPER,
                        filterValue: e.target.value,
                    }))
                }
                } />

            <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                <FormLabel component="legend">City(Multiple Options)</FormLabel>
                <Select
                    multiple
                    className={classes.select}
                    displayEmpty
                    value={filters.cities}
                    onChange={(e) => {
                        dispatch(updateFilter({
                            filterName: CITIES,
                            filterValue: e.target.value,
                        }))
                    }}
                    onScroll={handleScroll}
                    onClose={() => setMaxCities(50)}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em>{''}</em>;
                        }
                        return selected.join(', ');
                    }}
                    MenuProps={''}
                    inputProps={{ 'aria-label': 'Without label' }}
                >

                    <MenuItem disabled value="">
                        <em>City</em>
                    </MenuItem>

                    {cities.slice(0, maxCities).map((city) => (
                        <MenuItem
                            key={city}
                            value={city}
                        >
                            {city}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>

            <Box sx={{ display: 'flex' }}>
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters[MORTAGE]}
                                    onChange={(e) => {
                                        dispatch(updateFilter({
                                            filterName: MORTAGE,
                                            filterValue: e.target.checked,
                                        }))
                                    }}
                                    name="Yes" />
                            }
                            label="Mortage"
                        />
                    </FormGroup>
                </FormControl>
            </Box>

            <TextField
                id="outlined-basic"
                label="Number of Credit Cards"
                variant="outlined"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                value={filters[NUM_OF_CREDIT_CARDS]}
                onChange={(e) => {
                    if (parseInt(e.target.value) < 2) {
                        e.target.value = '';
                    } else {
                        dispatch(updateFilter({
                            filterName: NUM_OF_CREDIT_CARDS,
                            filterValue: e.target.value,
                        }))
                    }

                }}
            />

            <Button
                className={classes.buttonSubmit}
                onClick={(e) => {
                    dispatch(applyFilters())
                }}
                variant="contained"
                color="primary"
                size="large"
                type="button"
                fullWidth>
                Apply Filters
            </Button>

        </Paper>
    )
}

export default Filters;