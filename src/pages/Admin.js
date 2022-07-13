import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import { SidebarDataFirst, SidebarDataSecond } from "../components/SidebarData";
import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Container,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

function Admin() {
  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
  }));
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  if (sessionStorage.getItem("type") === "admin") {
    return (
      <>
        <Router>
          <div className={classes.root}>
            <CssBaseline />
            <div>
              <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                  [classes.appBarShift]: open,
                })}
              >
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap>
                    Admin
                  </Typography>
                </Toolbar>
              </AppBar>
            </div>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </div>
              <Divider />
              <List>
                {SidebarDataFirst.map((item, index) => (
                  <ListItem button key={index}>
                    <Link
                      to={item.path}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <ListItemText primary={item.title} />
                    </Link>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {SidebarDataSecond.map((item, index) => (
                  <ListItem button key={index}>
                    <Link
                      to={item.path}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <ListItemText primary={item.title} />
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Drawer>
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <Container maxWidth="lg" className={classes.container}>
                <Switch>
                  {SidebarDataFirst.map((item, index) => (
                    <Route path={item.path} component={item.component}></Route>
                  ))}
                  {SidebarDataSecond.map((item, index) => (
                    <Route path={item.path} component={item.component}></Route>
                  ))}
                  <Route component={SidebarDataFirst[0].component}></Route>
                </Switch>
              </Container>
            </main>
          </div>
        </Router>
      </>
    );
  } else {
    return (
      <div>
        <Redirect to="/User"></Redirect>
      </div>
    );
  }
}

export default Admin;
