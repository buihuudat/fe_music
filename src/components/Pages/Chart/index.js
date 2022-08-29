import React from 'react';
import Chart from '../../Chart';
import './index.sass';

const ChartPage = ({ pop, kpop, vpop, user }) => {
  return (
    <div className="chart-page">
      <div className="chart-page-chart">
        <Chart chart={pop} user={user} />
      </div>
      <div className="chart-page-chart">
        <Chart chart={kpop} user={user} />
      </div>
      <div className="chart-page-chart">
        <Chart chart={vpop} user={user} />
      </div>
    </div>
  );
};

export default ChartPage;