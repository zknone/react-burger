import { Navigate, useLocation } from 'react-router-dom';
import React, { FC } from 'react';
import Loader from '../loader/loader';
import { useTypedSelector } from '../../utils/typed-hooks';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.ReactElement;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  component,
}) => {
  const isAuthChecked = useTypedSelector(
    (state) => state.profile.isAuthChecked
  );
  const user = useTypedSelector((state) => state.profile.user);

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
