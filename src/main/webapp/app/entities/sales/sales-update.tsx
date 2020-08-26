import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Label } from 'reactstrap';
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
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
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
import { width } from '@fortawesome/free-solid-svg-icons/faSort';

// import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker,} from '@material-ui/pickers';

export interface ISalesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2, 0, 5, 0),
    padding: '2em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '-2px 3px 13px 0px rgba(176,176,176,1)',
    WebkitBoxShadow: '-2px 3px 13px 0px rgba(176,176,176,1) rgba(176,176,176,1);',
    MozBoxShadow: ' -2px 3px 13px 0px rgba(176,176,176,1)',
  },

  paper1: {
    margin: theme.spacing(0),
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: '100px',
    height: '100px',
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

  const [description, setDescription] = useState('');
  const [state, setState] = useState('');
  const [date, setDate] = useState('');

  const handleClose = () => {
    props.history.push('/sales');
  };

  const onChangeDescription = (e) => {
   setDescription(e.target.value);
  };

  const onChangeState = (e) => {
    setState(e.target.value);
  };

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

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

      const entity = {
        ...salesEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <Paper className={classes.paper1}>
      {isNew ? <h2>Crear Nuevo</h2> : <h2>Editar Venta</h2>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid container xs={12} md={6} className={classes.paper}>
          <Avatar className={classes.avatar} src="https://www.merliontechs.com/wp-content/uploads/2020/04/LOGO-OK-PNG.png"></Avatar>

          <Typography component="h1" variant="h5">
            Merlion Techs
          </Typography>

          <AvForm model={isNew ? {} : salesEntity} onSubmit={saveEntity}>
            <form className={classes.form} noValidate>
              {!isNew ? (
                <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                  <TextField size="small" fullWidth disabled id="sales-id" label="ID" variant="outlined" value={salesEntity.id} />
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
                      onChangeDescription(e);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-age-native-simple">State</InputLabel>
                    <Select
                      native
                      label="State"
                      value={state ? state : salesEntity.state}
                      onChange={e => {
                        onChangeState(e);
                      }}
                      inputProps={{ name: 'state', id: 'sales-state' }}
                      onClick={() => state === '' && setState(salesEntity.state)}
                    >
                      <option aria-label="None" value="" />
                      <option value="IN_CHARGE">IN_CHARGE </option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    size="small"
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

                <Grid item xs={12}>
                  <Link to="/sales" style={{ textDecoration: 'none' }}>
                    <Button fullWidth variant="outlined" color="primary" startIcon={<ArrowBackIcon />}>
                      Volver
                    </Button>
                  </Link>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    id="save-entity"
                    type="submit"
                    disabled={updating}
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </AvForm>
        </Grid>
      )}
    </Paper>
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
