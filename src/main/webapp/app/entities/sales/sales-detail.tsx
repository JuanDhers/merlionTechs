import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

// Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DoneIcon from '@material-ui/icons/Done';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import EditIcon from '@material-ui/icons/Edit';
import { Container, Grid } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

export interface ISalesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SalesDetail = (props: ISalesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { salesEntity } = props;
  return (
    <>
      <Grid container justify="center">
        <Grid item xs={12} sm={5} justify="center">
          <Card>
            {salesEntity.state === 'DELIVERED' ? (
              <CardHeader
                avatar={
                  <Avatar style={{ backgroundColor: '#64dd17', color: '#fff' }}>
                    <DoneIcon />
                  </Avatar>
                }
                title={`Id: ${salesEntity.id}`}
                subheader={<span style={{ color: '#fff' }}>{salesEntity.state}</span>}
                style={{ backgroundColor: '#2a6a9e', color: '#fff' }}
              />
            ) : null}

            {salesEntity.state === 'SHIPPED' ? (
              <CardHeader
                avatar={
                  <Avatar style={{ backgroundColor: '#2962ff', color: '#fff' }}>
                    <LocalShippingIcon />
                  </Avatar>
                }
                title={`Id: ${salesEntity.id}`}
                subheader={<span style={{ color: '#fff' }}>{salesEntity.state}</span>}
                style={{ backgroundColor: '#2a6a9e', color: '#fff' }}
              />
            ) : null}

            {salesEntity.state === 'IN_CHARGE' ? (
              <CardHeader
                avatar={
                  <Avatar style={{ backgroundColor: '#ff6f00', color: '#fff' }}>
                    <NewReleasesIcon />
                  </Avatar>
                }
                title={`Id: ${salesEntity.id}`}
                subheader={<span style={{ color: '#fff' }}>{salesEntity.state}</span>}
                style={{ backgroundColor: '#2a6a9e', color: '#fff' }}
              />
            ) : null}

            <CardContent>
              <h3>{salesEntity.description}</h3>

              <span id="state">
                <Translate contentKey="testApp.sales.state">State</Translate>
              </span>
              <h6>{salesEntity.state}</h6>

              <span id="date">
                <Translate contentKey="testApp.sales.date">Date</Translate>
              </span>
              <h6>{salesEntity.date}</h6>
            </CardContent>
            <CardActions>
              <Button component={Link} to={`/sales/${salesEntity.id}/edit`} color="primary" fullWidth variant="outlined">
                <EditIcon/>{' '}
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.edit">Edit</Translate>
                </span>
              </Button>
            </CardActions>

            <CardActions>
              <Button component={Link} to="/sales" color="primary" fullWidth variant="contained">
                <FontAwesomeIcon icon="arrow-left" />{' '}
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesEntity: sales.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesDetail);
