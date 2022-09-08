import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({handleThemeChange, darkMode}: Props) {
    return (
        <AppBar position='static' sx={{mb: 5}}>
            <Toolbar>
                <Typography variant='h6'>Internet store</Typography>
                <Switch checked={darkMode} onClick={handleThemeChange} color="default" />
            </Toolbar>
        </AppBar>
    )
}