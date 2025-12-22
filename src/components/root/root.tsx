import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { checkUserAuth } from '../../services/auth/check-user-auth';
import LayoutWithLocation from '../layout-with-location/layout-with-location';

const Root = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <Router>
      <LayoutWithLocation />
    </Router>
  );
};

export default Root;
