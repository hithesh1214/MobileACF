import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Stepper,
  Step,
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  StepLabel,
  StepContent,
  Button,
  TextField,
  Fab,
  Popover,
} from "@material-ui/core";
import Axios from "axios";
import AddLocationIcon from "@material-ui/icons/AddLocation";

function ACFMaster() {
  const [SBUlist, setSBUlist] = useState([]);
  const [SBUid, setSBUid] = useState("");
  const [RBUid, setRBUid] = useState("");
  const [RBUlist, setRBUlist] = useState([]);
  const [ABUid, setABUid] = useState("");
  const [ABUlist, setABUlist] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  //Services vars
  const [Servicelist, setServicelist] = useState([]);
  const [Vechilelist, setVechilelist] = useState([]);

  // User details
  var [User, setUser] = useState({
    ShopName: "",
    OwnerName: "",
    ContactNo: "",
    ShopAddress: "",
    Pincode: "",
    Emailid: "",
    Username: "",
    Password: "",
    Latitude: "",
    Longitude: "",
  });
  var [Pricesheet, setPricesheet] = useState({});
  // const lenOfSerVicelist = Servicelist.length;
  const addUser = () => {
    Axios.post("http://localhost:3001/addUser", {
      User: User,
      Pricesheet: Pricesheet,
      SBUid: SBUid,
      RBUid: RBUid,
      ABUid: ABUid,
    }).then((response) => {
      // console.log(response);
    });
  };

  const updatePricesheet = (e) => {
    setPricesheet({
      ...Pricesheet,
      [e.target.name]: e.target.value,
    });
  };

  const updateField = (e) => {
    setUser({
      ...User,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    console.log(User);
    // console.log(Servicelist);
    // console.log(Pricesheet);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const selectLoc = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRegister = () => {
    addUser();
  };

  function getSteps() {
    return [
      "Enter ACF details",
      "ACF Price Sheet",
      "ACF Recommendations",
      "ACF Credentials",
    ];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div className={classes.steps}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item lg={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Shop Name"
                    name="ShopName"
                    value={User.ShopName}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Owner Name"
                    name="OwnerName"
                    value={User.OwnerName}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Shop Address"
                    name="ShopAddress"
                    multiline
                    maxRows={3}
                    value={User.ShopAddress}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Contact No."
                    name="ContactNo"
                    value={User.ContactNo}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Pin code"
                    name="Pincode"
                    value={User.Pincode}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item lg={4}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Latitude"
                    name="Latitude"
                    value={User.Latitude}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item lg={4}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Longitude"
                    name="Longitude"
                    value={User.Longitude}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>

                <Grid item lg={2}>
                  <Fab
                    color="primary"
                    aria-label="add"
                    size="medium"
                    onClick={selectLoc}
                  >
                    <AddLocationIcon />
                  </Fab>
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <Typography className={classes.typography}>
                      The content of the Popover.
                    </Typography>
                  </Popover>
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Email id"
                    name="Emailid"
                    value={User.Emailid}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
              </Grid>
            </Paper>
          </div>
        );
      case 1:
        return (
          <div className={classes.steps}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Type of Service\Type of Vechile</TableCell>
                    {Object.entries(Vechilelist).map((v) => (
                      <TableCell>{v[1].Vechilename}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(Servicelist).map((s) => (
                    <TableRow>
                      <TableCell>{s[1].Servicename}</TableCell>
                      {Object.entries(Vechilelist).map((v) => (
                        <TableCell>
                          <TextField
                            variant="filled"
                            value={
                              Pricesheet[s[1].Servicename + v[1].Vechilename]
                            }
                            name={s[1].Servicename + v[1].Vechilename}
                            onChange={updatePricesheet}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );
      case 2:
        return (
          <div>
            <Paper>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField name="Dealer name"></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField name="Dealer Contact No."></TextField>
                </Grid>
              </Grid>
            </Paper>
          </div>
        );
      case 3:
        return (
          <div className={classes.steps}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Username"
                    name="Username"
                    value={User.Username}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Password"
                    name="Password"
                    value={User.Password}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
              </Grid>
            </Paper>
          </div>
        );
      default:
        return "Unknown step";
    }
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/getSBU").then((response) => {
      // console.log(response.data);
      setSBUlist(response.data);
    });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:3001/getService").then((response) => {
      //   console.log(response.data);
      setServicelist(response.data);
    });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:3001/getVechile").then((response) => {
      //   console.log(response.data);
      setVechilelist(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.post("http://localhost:3001/getRBU", {
      SBUid: SBUid,
    }).then((response) => {
      //   console.log(response.data);
      setRBUlist(response.data);
    });
  }, [SBUid]);

  useEffect(() => {
    Axios.post("http://localhost:3001/getABU", {
      RBUid: RBUid,
    }).then((response) => {
      setABUlist(response.data);
    });
  }, [RBUid]);

  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(3, 0),
    },
    select: {
      margin: theme.spacing(1),
      width: theme.spacing(20),
    },
    input: {
      margin: theme.spacing(1),
      width: "100%",
    },

    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    steps: {
      width: theme.spacing(100),
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4">ACF Registration</Typography>
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* <Typography variant="h5">
              Select from which SBU you want to select RBU
            </Typography> */}
            <FormControl className={classes.select}>
              <InputLabel>SBU Name</InputLabel>
              <Select
                autoWidth="true"
                value={SBUid}
                onChange={(e) => {
                  setSBUid(e.target.value);
                }}
              >
                {SBUlist.map((row) => (
                  <MenuItem value={row.SBUid}>{row.SBUname}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* <Typography variant="h5">
              Select from which RBU you want to select ABU
            </Typography> */}
            <FormControl className={classes.select}>
              <InputLabel>RBU Name</InputLabel>
              <Select
                autoWidth="true"
                value={RBUid}
                onChange={(e) => {
                  setRBUid(e.target.value);
                }}
              >
                {Object.entries(RBUlist).map((row) => (
                  <MenuItem value={row[1].RBUid}>{row[1].RBUname}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* <Typography variant="h5">
              Select to which ABU you want to add
            </Typography> */}
            <FormControl className={classes.select}>
              <InputLabel>ABU Name</InputLabel>
              <Select
                autoWidth="true"
                value={ABUid}
                onChange={(e) => {
                  setABUid(e.target.value);
                }}
              >
                {Object.entries(ABUlist).map((row) => (
                  <MenuItem value={row[1].ABUid}>{row[1].ABUname}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleRegister} className={classes.button}>
              Register
            </Button>
          </Paper>
        )}
      </Paper>
    </div>
  );
}

export default ACFMaster;
