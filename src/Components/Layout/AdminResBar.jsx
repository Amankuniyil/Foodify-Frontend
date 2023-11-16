import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../../api/axiosConfig';

const AdminResBar = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('restaurant/orders-per-restaurant/2023/11/16/');
        const data = response.data;

        setChartData({
          labels: data.orders_per_restaurant.map(restaurant => restaurant.restaurant_name),
          datasets: [
            {
              label: 'Number of Orders',
              data: data.orders_per_restaurant.map(restaurant => restaurant.orders_on_day),
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
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
      <h1>Orders per Restaurant Chart</h1>
      {chartData.labels && (
        <Bar
          data={chartData}
          options={{
            scales: {
              x: { stacked: true },
              y: { stacked: true },
            },
          }}
        />
      )}
    </div>
  );
};

export default AdminResBar;
