import React from 'react';
import Home from 'containers/includes/Home';
import History from 'containers/pages/History';

const history = () => {
  return (
    <Home title="Lịch Sử Giao Dịch">
      <div className="col-md-12 col-lg-9">
        <History />
      </div>
    </Home>
  );
};

export default history;
