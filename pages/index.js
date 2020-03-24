import React, { useEffect } from 'react';
import Router from 'next/router';

export default () => {
  useEffect(() => {
    Router.push('/login');
  });
  return <>Redirecting...</>;
};
