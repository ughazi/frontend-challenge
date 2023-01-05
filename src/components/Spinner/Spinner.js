import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import { constants } from '../../constants';

const { SPINNER_LOADING_LABEL } = constants;

export const Spinner = () => {
  return <TailSpin height="80" width="80" color="black" ariaLabel={SPINNER_LOADING_LABEL} radius="1" wrapperStyle={{}} wrapperClass="" visible={true} />;
};
