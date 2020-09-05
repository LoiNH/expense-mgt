import React from 'react';
import Home from 'containers/includes/Home';
import Report from 'containers/pages/Report';

const report = () => {
  return (
    <Home title="Báo Cáo Thu Chi">
      <div className="col-md-12 col-lg-9">
        <Report />
      </div>
    </Home>
  );
};

export default report;
