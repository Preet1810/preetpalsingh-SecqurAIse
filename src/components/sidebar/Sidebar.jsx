import React, { useState, useEffect } from 'react';
import { styled, useTheme, Box, Drawer, CssBaseline, List, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/Inbox'
import Events from '../events/Events'
import { db } from '../../firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import { useClickedItemId } from '../events/Events';
import { AppContext } from '../AppContext';
import Info from '../Info/Info';
import Image from '../Image/Image';
const drawerWidth=240;

const DrawerHeader=styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {

    const [users, setUsers]=useState([])
    const usersCollectionRef=collection(db, "User")
    const [clickedItemId, setClickedItemId]=useClickedItemId();

    useEffect(() => {
        const getUsers=async () => {
            const data=await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        };
        getUsers()

    }, [])


    const theme=useTheme();
    const [open, setOpen]=React.useState(false);

    const handleDrawerOpen=() => {
        setOpen(true);
    };

    const handleDrawerClose=() => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: '4rem',
                    height: '100vh',
                    backgroundColor: '#00b8f1',
                }}
            >
                <IconButton
                    // color="#cdcdcd"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mx: 'auto', color: '#cdcdcd', fontSize: "large" }}
                >
                    <MenuIcon />
                </IconButton>

                <IconButton
                    aria-label="open drawer"
                    sx={{ mx: 'auto', color: '#cdcdcd', marginTop: '35rem' }}
                >
                    <ExitToAppIcon />
                </IconButton>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                        position: 'absolute',
                        top: 0,
                        left: '4rem',
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction==='ltr'? (
                                <ChevronLeftIcon />
                            ):(
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                            (text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index%2===0? (
                                                <InboxIcon />
                                            ):(
                                                <MailIcon />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        )}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index%2===0? (
                                            <InboxIcon />
                                        ):(
                                            <MailIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={4}>
                            <Info id={clickedItemId} />
                        </Grid>
                        <Grid item xs={4}>
                            <Image user={clickedItemId} />
                        </Grid>
                        <Grid item xs={4}>
                            <AppContext.Provider value={{ clickedItemId, setClickedItemId }}>
                                <Events data={users} />
                            </AppContext.Provider>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>

    );
}