import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

// Material-UI
import { makeStyles, ThemeProvider, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import { TableContainer, TableRow, Box } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Add from '@material-ui/icons/Add';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export interface ISalesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    tabla: {
      width: '90%',
      margin: '1rem auto',
      backgroundColor: '#f0f0f0',
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    },
  })
);

export const Sales = (props: ISalesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { salesList, match, loading } = props;

  const classes = useStyle();

  return (
    <div>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid xs={6}>
          <h2 className="titSales">
            <Translate contentKey="testApp.sales.home.title">Sales</Translate>
          </h2>
        </Grid>

        <Grid xs={6}>
          <Button className="btnAdd" variant="contained" component={Link} to={`${match.url}/new`} startIcon={<Add />}>
            <Translate contentKey="testApp.sales.home.createLabel">Create new</Translate>
          </Button>
        </Grid>
      </Grid>

      {salesList && salesList.length > 0 ? (
        <div>
          {salesList.map((sales, i) => (
            <TableContainer key={`entity-${i}`} className="borde">
              <Table className={classes.tabla} style={{borderRadius:"10px"}} size="small">
                <TableHead className="tableHead">
                  <TableRow>
                    <TableCell  className="tableHeadCell idNum bordeSupL" >Id</TableCell>

                    <TableCell className="tableHeadCell descripcion">
                      <Translate contentKey="testApp.sales.description">Description</Translate>
                    </TableCell>

                    <TableCell className="tableHeadCell estado">State</TableCell>
                    <TableCell className="tableHeadCell fecha">Date</TableCell>

                    <TableCell className="tableHeadCell accion bordeSupR">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ backgroundColor: '#ffe' }}>
                  <TableRow>
                    <TableCell className="tableBody idNum bordeInfL">{sales.id}</TableCell>
                    <TableCell className="tableBody descripcion">{sales.description}</TableCell>

                    {sales.state === 'DELIVERED' ? (
                      <TableCell className="tableBody estado" style={{ color: '#64dd17' }}>
                        {' '}
                        {sales.state}
                      </TableCell>
                    ) : null}

                    {sales.state === 'SHIPPED' ? (
                      <TableCell className="tableBody estado" style={{ color: '#2962ff' }}>
                        {' '}
                        {sales.state}{' '}
                      </TableCell>
                    ) : null}

                    {sales.state === 'IN_CHARGE' ? (
                      <TableCell className="tableBody estado" style={{ color: '#ff6f00' }}>
                        {' '}
                        {sales.state}
                      </TableCell>
                    ) : null}

                    <TableCell className="tableBody">
                      {sales.date ? <TextFormat type="date" value={sales.date} format={APP_LOCAL_DATE_FORMAT} /> : null}
                    </TableCell>

                    <TableCell className="tableBody acction bordeInfR">
                      <ButtonGroup variant="text">
                        <Button className="ver" component={Link} to={`${match.url}/${sales.id}`}>
                          <FontAwesomeIcon color="default" icon="eye" />{' '}
                        </Button>
                        <Button className="editar" component={Link} to={`${match.url}/${sales.id}/edit`}>
                          <FontAwesomeIcon  icon="pencil-alt" />{' '}
                        </Button>
                        <Button className="eliminar"  component={Link} to={`${match.url}/${sales.id}/delete`}>
                          <FontAwesomeIcon icon="trash" />{' '}
                        </Button>
                      </ButtonGroup>

                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="alert alert-warning">
            <Translate contentKey="testApp.sales.home.notFound">No Sales found</Translate>
          </div>
        )
      )}
    </div>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesList: sales.entities,
  loading: sales.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
