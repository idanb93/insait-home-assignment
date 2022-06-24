import React from 'react';

import { 
    Paper, Typography, Checkbox,
    FormControlLabel,
    FormLabel,
    FormGroup,
    FormControl,
    Box,
    Slider,
    Button,
    MenuItem,
    Select,
    OutlinedInput
 } from '@material-ui/core';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { filterPosts } from '../../actions/posts';

import useStyles from './styles';


const Filters = () => {

    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        yes: false,
        no: false,
    });

    const { yes, no } = state;
    const error = [yes, no].filter((v) => v).length !== 2;

    const [value, setValue] = React.useState([20000, 40000]);

    const classes = useStyles();

    const [filters, setFilters] = useState({ balance: '', city: 'City', haveMortgage: '', numCreditCards: '' });

    const [cities, setCities] = useState([]);

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setCities(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      const handleChangePrice = (event, value) => {
        setValue(value);
      };


    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(filterPosts(filters));
    }

    const [checked, setChecked] = React.useState(true);

    const handleChange2 = (event) => {
      setChecked(event.target.checked);
    };

    return (
        <Paper className={classes.paper}>

            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography className={classes.filterTitle} variant="h6">{'Filters'}</Typography>

                <FormLabel className={classes.balance} component="legend">Balance(20,000 - 40,000)</FormLabel>
                <Slider
                    className={classes.balanceSlider}
                    value={value}
                    onChange={handleChangePrice}
                    valueLabelDisplay='on'
                    min={20000}
                    max={40000}
                    classes={{
                        thumb: classes.thumb,
                        rail: classes.rail,
                        track: classes.track,
                    }}
                />

                <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                <FormLabel component="legend">City(Multiple Options)</FormLabel>
                    <Select
                        multiple
                        className={classes.select}
                        displayEmpty
                        value={cities}
                        onChange={handleChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>{filters.city}</em>;
                            }
                            return selected.join(', ');
                        }}
                        MenuProps={''}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem disabled value="">
                            <em>City</em>
                        </MenuItem>

                        {posts.map((post) => (
                            <MenuItem
                                key={post.city}
                                value={post.city}
                            >
                                {post.city}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex' }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={checked} onChange={handleChange2} name="Yes" />
                                }
                                label="Mortage"
                            />
                        </FormGroup>
                    </FormControl>
                </Box>

                <FormLabel className={classes.creditCards} component="legend">Number of Credit Cards(2 - 10)</FormLabel>
                <Slider
                    size="medium"
                    defaultValue={2}
                    min={2}
                    max={10}
                    aria-label="medium"
                    valueLabelDisplay="auto"
                    onChange={(e) => { setFilters({ ...filters, numCreditCards: e.target.value }) }}
                />

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Apply Filters</Button>
            </form>

        </Paper>
    )
}

export default Filters;