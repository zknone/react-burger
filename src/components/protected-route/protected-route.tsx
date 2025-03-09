import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../store';
import React, { FC } from 'react';
import Loader from '../loader/laoder';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.ReactElement;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  component,
}) => {
  const isAuthChecked = useSelector(
    (state: RootState) => state.profile.isAuthChecked
  );
  const user = useSelector((state: RootState) => state.profile.user);

  const location = useLocation();

  if (!isAuthChecked) {
    return <Loader />;
  }

  if (!onlyUnAuth && !user.email) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (onlyUnAuth && user.email) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};
export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({
  component,
}: {
  component: React.ReactElement;
}) => <ProtectedRoute onlyUnAuth={true} component={component} />;
