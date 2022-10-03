import { ShoppingCart } from "@mui/icons-material";
import { alpha, AppBar, Avatar, Badge, Box, Button, Checkbox, Fade, FormControl, FormControlLabel, FormGroup, IconButton, InputBase, List, ListItem, Menu, MenuItem, Radio, RadioGroup, styled, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from "react";
import StoreIcon from '@mui/icons-material/Store';
import ProductSearch from "../../features/catalog/ProductSearch";
import RadioButtonGroup from "../components/RadioButtonGroup";
import { setProductParams } from "../../features/catalog/catalogSlice";
import CheckboxButtons from "../components/CheckboxButtons";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const midLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'}
]

const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'}
]

const navStyles = {
    color: 'inherit', 
    typography: 'h6',
    textDecoration: 'none',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - Hight to low'},
    {value: 'price', label: 'Price  Low to high'},
  ]

 

export default function Header({handleThemeChange, darkMode}: Props) {
    const {basket} = useAppSelector(state => state.basket)
    const {brands, types, productParams} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0); 

    const [filterDropDown, setFilterDropDown] = React.useState<null | HTMLElement>(null);
    const openFilter = Boolean(filterDropDown);
    const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
        setFilterDropDown(event.currentTarget);
    };
    const handleFilterClose = () => {
        setFilterDropDown(null);
    };


    const [typeDropDown, setTypeDropDown] = React.useState<null | HTMLElement>(null);
    const openType = Boolean(typeDropDown);
    const handleTypeClick = (event: React.MouseEvent<HTMLElement>) => {
        setTypeDropDown(event.currentTarget);
    };
    const handleTypeClose = () => {
        setTypeDropDown(null);
    };

    const [brandDropDown, setBrandDropDown] = React.useState<null | HTMLElement>(null);
    const [brandIsOpen, setBrandIsOpen] = useState(false);
    const handleBrandClick = (event: React.MouseEvent<HTMLElement>) => {
        setBrandDropDown(event.currentTarget);
        setBrandIsOpen(true);
    };
    const handleBrandClose = () => {
        setBrandIsOpen(false);
    };

    return (
        <AppBar position='static' sx={{mb: 5}}>
            <Toolbar sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box display='flex' alignItems='center'>
                    <IconButton>
                        <StoreIcon style={{color: 'white'}}/>
                    </IconButton>
                    <Typography variant='h6'>
                        CODESHOP
                    </Typography>
                    <Switch checked={darkMode} onClick={handleThemeChange} color="default"/>
                    <Button
                        id="filter-button"
                        aria-controls={openFilter ? 'filter-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openFilter ? 'true' : undefined}
                        onClick={handleFilterClick}
                        style={{color: 'white', fontSize: '19px'}}
                        variant='contained'
                        sx={{color: 'text.primary', backgroundColor: '#92a8d1'}}
                    >
                        Filters
                    </Button>
                    <Menu
                        id="filter-menu"
                        MenuListProps={{
                          'aria-labelledby': 'filter-button',
                        }}
                        anchorEl={filterDropDown}
                        open={openFilter}
                        onClose={handleFilterClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem >
                            <RadioButtonGroup 
                                selectedValue={productParams.orderBy}
                                options={sortOptions}
                                onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
                            />
                        </MenuItem>
                    </Menu>
                </Box>

                <List sx={{display: 'flex'}}  >
                    {midLinks.map(({title, path}) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={title}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                    <ListItem
                        sx={navStyles}
                    >
                        <Button 
                            id='brands-button' 
                            aria-controls={brandIsOpen ? 'brands-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={brandIsOpen ? 'true' : undefined}
                            onClick={handleBrandClick}
                            style={{color: 'white', fontSize: '19px'}}
                        >
                            BRANDS
                        </Button>
                    </ListItem>
                    <Menu
                        id="brands-menu"
                        MenuListProps={{
                          'aria-labelledby': 'brands-button',
                        }}
                        anchorEl={brandDropDown}
                        open={brandIsOpen}
                        onClose={handleBrandClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem >
                            <CheckboxButtons
                                items={brands}
                                checked={productParams.brands}
                                onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}
                            />
                        </MenuItem>
                    </Menu>
                    <ListItem
                        sx={navStyles}
                        
                    >
                        <Button 
                            id='types-button' aria-controls={openType ? 'types-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openType ? 'true' : undefined}
                            onClick={handleTypeClick}
                            style={{color: 'white', fontSize: '19px'}}
                        >
                            TYPES
                        </Button>
                    </ListItem>
                    <Menu
                        id="types-menu"
                        MenuListProps={{
                          'aria-labelledby': 'types-button',
                        }}
                        anchorEl={typeDropDown}
                        open={openType}
                        onClose={handleTypeClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem >
                        <CheckboxButtons
                                items={types}
                                checked={productParams.types}
                                onChange={(items: string[]) => dispatch(setProductParams({types: items}))}
                            />
                        </MenuItem>
                    </Menu>
                </List>

                <Box display='flex' alignItems='center'>
                  <ProductSearch/>
                  {/* <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search> */}
                  <IconButton component={Link} to='/basket' size='large' sx={{color:'inherit'}}>
                      <Badge badgeContent={itemCount} color="secondary">
                          <ShoppingCart/>
                      </Badge>
                  </IconButton>
                  <IconButton>
                    <Avatar/>
                  </IconButton>
                  {/* <List sx={{display: 'flex'}}>
                      {rightLinks.map(({title, path}) => (
                          <ListItem
                              component={NavLink}
                              to={path}
                              key={path}
                              sx={navStyles}
                          >
                              {title.toUpperCase()}
                          </ListItem>
                      ))}
                  </List> */}
                </Box>
            </Toolbar>
        </AppBar>
    )
}