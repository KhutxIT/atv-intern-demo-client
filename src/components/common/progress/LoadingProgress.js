import React from 'react';
import { CircularProgress } from '@mui/material';
import './loadingprogress.scss';

export default function LoadingProgress() {
  return (
    <div className="loading-progress">
      <CircularProgress />
    </div>
  );
}
