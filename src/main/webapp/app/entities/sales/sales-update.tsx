import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

// Material UI
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

// import { getEntity, updateEntity, createEntity, reset } from './sales.reducer'
// import { ISales } from 'app/shared/model/sales.model'
// import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils'
// import { mapIdList } from 'app/shared/util/entity-utils'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button2 from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { valuesIn } from 'lodash';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// import Grid, { GridSpacing } from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker,} from '@material-ui/pickers';

import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker,} from '@material-ui/pickers';

export interface ISalesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const useStyles = makeStyles(theme => ({
  titleStyle: {
    marginBottom: '1rem',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SalesUpdate = (props: ISalesUpdateProps) => {
  const classes = useStyles();
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { salesEntity, loading, updating } = props;

  //
  const [description, setDescription] = useState('');
  const [state, setState] = useState('');
  const [date, setDate] = useState('');
  //

  const handleClose = () => {
    props.history.push('/sales');
  };

  // inicio
  const onChangeDesc = e => {
    setDescription(e.target.value);
  };

  const onChangeState = e => {
    setState(e.target.value);
  };

  const onChangeDate = e => {
    setDate(e.target.value);
  };
  // fin

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      if (description) {
        values = { ...values, description: description };
      } else {
        values = { ...values, description: salesEntity.description };
      }

      if (state) {
        values = { ...values, state: state };
      } else {
        values = { ...values, state: salesEntity.state };
      }

      if (date) {
        values = { ...values, date: date };
      } else {
        values = { ...values, date: salesEntity.date };
      }

      console.log(values, 'values');
      const entity = {
        ...salesEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
        setDescription('');
        setState('');
        setDate('');
      } else {
        props.updateEntity(entity);
        setDescription('');
        setState('');
        setDate('');
      }
    }
  };

  return (
    <>
      <Paper>
        <Typography variant="h4" className={classes.titleStyle}>
          Crear o Editar Sales
        </Typography>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>

                <AvForm model={isNew ? {} : salesEntity} onSubmit={saveEntity}>
                <form className={classes.form} noValidate >
                {!isNew ? (
                  <Grid item xs={12} style={{marginBottom:"1rem"}}>

                  <TextField fullWidth disabled id="sales-id" label="ID" variant="outlined" value={salesEntity.id} />
                </Grid>
                ) : null}

                
                  <Grid container spacing={2}>
                 

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        multiline
                        id="sales-description"
                        label="Descripción"
                        value={description ? description : salesEntity.description}
                        onChange={e => {
                          onChangeDesc(e);
                        }}
                        onClick={() => description === '' && setDescription(salesEntity.description)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-age-native-simple">State</InputLabel>
                      <Select
                      native
                      label="State"
                        value={state ? state : salesEntity.state}
                        onChange={e => {
                          onChangeState(e);
                        }}
                        inputProps={{
                          name: 'state',
                          id: 'sales-state',
                        }}
                        onClick={() => state === '' && setState(salesEntity.state)}
                      >
                        <option aria-label="None" value="" />
                        <option value="IN_CHARGE">IN_CHARGE </option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>

                      </Select>
                    </FormControl>
                  </Grid>
    

              <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      id="sales-date"
                      label="Date"
                      type="date"
                      defaultValue="2017-05-24"
                      value={date ? date : salesEntity.date}
                      onChange={e => {
                        onChangeDate(e);
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  
                  
              

              <Grid container spacing={3}>
                  <Grid item>
                    <Link to="/sales" style={{ textDecoration: 'none' }}>
                      <Button2 variant="contained" color="primary" startIcon={<ArrowBackIcon />}>
                        Volver
                      </Button2>
                    </Link>
                  </Grid>
  

                  <Grid item>
                    <Button2
                      id="save-entity"
                      type="submit"
                      disabled={updating}
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                    >
                      Guardar
                    </Button2>
                  </Grid>
                </Grid>
                </Grid>
                </form>
                </AvForm>
                </div>
                  </Container>
            
{/* 
            <Grid style={{ width: '80%', margin: '0 auto', height: '500px', border: '1px solid #00f' }}>
              <AvForm model={isNew ? {} : salesEntity} onSubmit={saveEntity}>
                {!isNew ? (
                  <Grid xs={12}>
                    <TextField fullWidth disabled id="sales-id" label="ID" multiline variant="filled" value={salesEntity.id} />
                  </Grid>
                ) : null}
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    id="sales-description"
                    label="Descripción"
                    multiline
                    variant="outlined"
                    value={description ? description : salesEntity.description}
                    onChange={e => {
                      onChangeDesc(e);
                    }}
                    onClick={() => description === '' && setDescription(salesEntity.description)}
                  />
                </Grid>

                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel htmlFor="State">State</InputLabel>
                      <NativeSelect
                        value={state ? state : salesEntity.state}
                        onChange={e => {
                          onChangeState(e);
                        }}
                        inputProps={{
                          name: 'state',
                          id: 'sales-state',
                        }}
                        onClick={() => state === '' && setState(salesEntity.state)}
                      >
                        <option value="IN_CHARGE">IN_CHARGE </option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>

                      </NativeSelect>
                    </FormControl>

                  </Grid><Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      id="sales-date"
                      label="Date"
                      type="date"
                      defaultValue="2017-05-24"
                      value={date ? date : salesEntity.date}
                      onChange={e => {
                        onChangeDate(e);
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  




                </Grid>


                <Grid container spacing={3}>
                  <Grid item>
                    <Link to="/sales" style={{ textDecoration: 'none' }}>
                      <Button2 variant="contained" color="primary" startIcon={<ArrowBackIcon />}>
                        Volver
                      </Button2>
                    </Link>
                  </Grid>

                  <Grid item>
                    <Button2
                      id="save-entity"
                      type="submit"
                      disabled={updating}
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                    >
                      Guardar
                    </Button2>
                  </Grid>
                </Grid>
              </AvForm>
            </Grid> */}
          </>
        )}
      </Paper>
    </>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  salesEntity: storeState.sales.entity,
  loading: storeState.sales.loading,
  updating: storeState.sales.updating,
  updateSuccess: storeState.sales.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesUpdate);
