import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import styled from 'styled-components';
import { theme } from '../styles';
const { fonts } = theme;

const properties = [
  'acousticness',
  'danceability',
  'energy',
  'instrumentalness',
  'liveness',
  'speechiness',
  'valence',
];

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;

  #chart {
    margin: 0 auto;
    margin-top: -30px;
  }
`;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
);

const FeatureChart = props => {
  const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const createDataset = features => {
      const dataset = {};
      properties.forEach(prop => {
        dataset[prop] = features.length
          ? avg(features.map(feat => feat && feat[prop]))
          : features[prop];
      });
      return dataset;
    };

    const createChart = dataset => {
      const { type } = props;
      const ctx = canvasRef.current;
      if (!ctx) return;

      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      const labels = Object.keys(dataset);
      const data = Object.values(dataset);

      const chartType = type === 'horizontalBar' ? 'bar' : type || 'bar';
      const indexAxis = type === 'horizontalBar' ? 'y' : 'x';

      chartRef.current = new ChartJS(ctx, {
        type: chartType,
        data: {
          labels,
          datasets: [
            {
              label: '',
              data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(255, 159, 64, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(75, 192, 192, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(104, 132, 245, 0.3)',
                'rgba(153, 102, 255, 0.3)',
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(104, 132, 245, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          layout: { padding: 0 },
          indexAxis,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Audio Features',
              color: '#ffffff',
              padding: { top: 30, bottom: 30 },
              font: { size: 18, family: `${fonts.primary}` },
            },
          },
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.3)' },
              ticks: { font: { family: `${fonts.primary}`, size: 12 } },
            },
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.3)' },
              ticks: { font: { family: `${fonts.primary}`, size: 12 } },
            },
          },
        },
      });
    };

    const parseData = () => {
      const { features } = props;
      const dataset = createDataset(features);
      createChart(dataset);
    };

    parseData();
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [props]);

  return (
    <Container>
      <canvas ref={canvasRef} width="400" height="400" />
    </Container>
  );
};

FeatureChart.propTypes = {
  features: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  type: PropTypes.string,
};

export default FeatureChart;
