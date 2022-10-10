// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authorizeUser } from './module/action/auth';

// ----------------------------------------------------------------------

const App = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    props.authorizeUser(navigate);
  }, []);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      authorizeUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
