import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../../api/axiosConfig'; // Adjust the path based on your project structure
import Chart from 'chart.js/auto';

const ResChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/restaurant/res_order_count_by_day/');
        const data = response.data;
  
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: 'Number of Orders',
              data: data.counts,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="App">
      <h1>Chart Page</h1>
      {chartData.labels && (
        <Line data={chartData} />
      )}
    </div>
  );
};

export default ResChart;
