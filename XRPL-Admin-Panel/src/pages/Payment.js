import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
// import axios from 'axios';
// import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
// import { BASE_URL } from './../constant';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editPaymentFunc, getPayments, deletePaymentFunc } from './../module/action/payment';
import PaymentMoreMenu from 'src/sections/@dashboard/user/PaymentMoreMenu';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'xrpAddress', label: 'XRPL Address', alignRight: false },
  { id: 'paymentId', label: 'Payment ID', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'sendXrp', label: 'Send XRP', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
  //   { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function Payment(props) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const payments = useSelector((e) => e.Payment.payments);
  const paymentLength = useSelector((e) => e.Payment.paymentLength);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (payments.length !== paymentLength) {
      props.getPayments(payments.length, limit);
    } else {
      // console.log('no more data');
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    if (payments.length !== paymentLength) {
      // console.log('page', event.target.value);
      props.getPayments(payments.length, Number(event.target.value) - limit);
      setLimit(Number(event.target.value));
    }
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  // const filteredpayments = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = payments?.length === 0;

  useEffect(() => {
    props.getPayments(payments.length, limit);
  }, []);

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h4" gutterBottom>
            Payments
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Card>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
          <br />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {payments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    // {payments?.map((row) => {
                    const { _id, user, amount, verified, xrp_send, payment_id } = row;
                    const isItemSelected = selected.indexOf(_id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, user[0]?.first_name)}
                          /> */}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt="profile" src={user[0]?.profile_banner} />
                            <Typography variant="subtitle2" noWrap>
                              {user[0]?.first_name + ' ' + user[0]?.last_name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{user[0]?.wallet_address ? user[0]?.wallet_address : '--'}</TableCell>
                        <TableCell align="left">{payment_id}</TableCell>
                        <TableCell align="center">{Number(amount) / 100} $</TableCell>
                        {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}
                        <TableCell align="left">
                          <Label variant="ghost" color={(verified !== 'true' && 'error') || 'success'}>
                            {verified && sentenceCase(verified)}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(xrp_send !== 'true' && 'error') || 'success'}>
                            {xrp_send && sentenceCase(xrp_send)}
                          </Label>
                        </TableCell>
                        <TableCell align="right">
                          <PaymentMoreMenu
                            userId={row?._id}
                            userData={row}
                            editFunction={editPaymentFunc}
                            deleteFunction={deletePaymentFunc}
                            page={payments.length}
                            limit={limit}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={paymentLength}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

const mapStateToProps = (state) => ({
  // mintingLoader: state.wallet.mintingLoader,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPayments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
