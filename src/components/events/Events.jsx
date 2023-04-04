import React, { useState, useContext } from 'react';
import { List, ListItem, ListItemText, Typography, Divider, IconButton, Menu, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AppContext } from '../AppContext';

export const useClickedItemId=() => {
    const [clickedItemId, setClickedItemId]=useState(null);
    return [clickedItemId, setClickedItemId];
};

export default function PinnedSubheaderList({ data }) {
    const [filteredData, setFilteredData]=useState(data);
    const { clickedItemId, setClickedItemId }=useContext(AppContext);
    const handleClick=(itemId) => {
        setClickedItemId(itemId);
    };
    // console.log(clickedItemId)

    //filter
    const handleFilter=(event) => {
        const { name, value }=event.target;
        let filteredData=data; // make a copy of the filteredData array
        filteredData=[...filteredData];

        if (name==="location") {
            filteredData=filteredData.filter((item) => item.Location===value);
        }

        if (name==="gender") {
            filteredData=filteredData.filter((item) => item.Gender===value);
        }

        setFilteredData(filteredData);
    };
    // console.log(filteredData)
    //Menu
    const [anchorEl, setAnchorEl]=useState(null);

    const open=Boolean(anchorEl);

    const handleMenuClick=(event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose=() => {
        setAnchorEl(null);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <h1>Events</h1>
                <IconButton
                    id="basic-button"
                    aria-controls={open? 'basic-menu':undefined}
                    aria-haspopup="true"
                    aria-expanded={open? 'true':undefined}
                    onClick={handleMenuClick}
                >
                    <TuneIcon sx={{ fontSize: "2.5rem" }} />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {/* <MenuItem></MenuItem> */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Location</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={location}
                            label="location"
                            name="location"
                            onChange={handleFilter}
                        >
                            <MenuItem value='Chennai'>Chennai</MenuItem>
                            <MenuItem value='Hyderabad'>Hyderabad</MenuItem>
                            <MenuItem value='Banglore'>Banglore</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={gender}
                            label="gender"
                            name="gender"
                            onChange={handleFilter}
                        >
                            <MenuItem value='Male'>Male</MenuItem>
                            <MenuItem value='Female'>Female</MenuItem>
                        </Select>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateRangePicker']}>
                                <DateRangePicker
                                    // localeText={{ start: 'Check-in', end: 'Check-out' }}
                                    name="dateRange"
                                    onChange={(newValue) => handleFilter({ target: { name: "dateRange", value: newValue } })}
                                    startText="Check-in"
                                    endText="Check-out"
                                    // value={dateRange}
                                    renderInput={(startProps, endProps) => (
                                        <>
                                            <TextField {...startProps} />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...endProps} />
                                        </>
                                    )}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>

                </Menu>
            </div>
            <div>
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 540,
                        '& ul': { padding: 0 },
                    }}
                    subheader={<li />}
                >

                    {data.map((user) => (
                        <li key={`section-${user.ID}`}>
                            <ul>

                                <ListItem
                                    key={`item-${user.ID}`}
                                    sx={{ margin: '0.5rem', backgroundColor: clickedItemId? clickedItemId.ID===user.ID? '#7f7f7f':'#d9d9d9':'#d9d9d9', cursor: 'pointer' }}
                                    onClick={() => handleClick(user)}
                                >
                                    <ListItemText
                                        primary={`${user.ID}:${user.Location}`}
                                        sx={{ marginBottom: '0.5' }}
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Person Detected
                                                </Typography>
                                            </>
                                        }
                                    />
                                    <ListItemText
                                        primary={`${user.Date} ${user.Time}`}
                                    />
                                </ListItem>
                                <Divider />
                            </ul>
                        </li>
                    ))}
                </List>
            </div>
        </div>
    );
}