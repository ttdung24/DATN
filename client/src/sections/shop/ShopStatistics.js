import '../../styles/sections/shop/ShopInfomation.scss';
import '../../styles/sections/shop/ShopStatistics.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_LINK } from '../../default-value';
import ShopNav from './ShopNav';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import CustomAxisTick from './CustomAxisTick';
import moment from 'moment';

const ShopStatistics = () => {
  const [dataStatistic, setDataStatistic] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const shop = useSelector((state) => state.shop);
  const fetchData = async () => {
    console.log(start, end);
    try {
      const res = await axios.get(
        `${API_LINK}/order/shop/statistic/${shop.shop._id}`,
        {
          params: { start, end },
        }
      );
      setDataStatistic(res.data.finalStatistics.map(item => {
        return {
          ...item,
          _id: moment(item._id).format('DD-MM-YYYY').toString()
        }
      }));
    } catch (error) {
      console.log('Lỗi ở fetchData', error);
    }
  };
  console.log(dataStatistic);
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className='shopinfo'>
      <div className='container shopinfo__box'>
        <div className='shopinfo__content'>
          <h3>THỐNG KÊ</h3>
          <div className='date-picker'>
            <DatePicker onChange={setStart} value={start} />
            <DatePicker onChange={setEnd} value={end} className={'ms-4'} />
            <div className='btn-filter ms-4' onClick={(e) => fetchData()}>
              Tìm kiếm
            </div>
          </div>
          <div className='chart'>
            <LineChart
              width={1000}
              height={400}
              data={dataStatistic}
              margin={{ left: 20, right: 30 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='_id'
                tick={<CustomAxisTick />}
                padding={{ left: 30, right: 30 }}
              />
              <YAxis />
              <Tooltip  />
              <Legend />
              <Line
                type='monotone'
                dataKey='totalSales'
                name='Total Sales'
                stroke='#82ca9d'
                activeDot={{ r: 8 }}
              />
            </LineChart>
            <div className='chartName'>Tổng thu</div>
          </div>
          <div className='chart'>
            <LineChart
              width={1000}
              height={400}
              data={dataStatistic}
              margin={{ left: 20, right: 30 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='_id'
                tick={<CustomAxisTick />}
                padding={{ left: 30, right: 30 }}
              />
              <YAxis />
              <Tooltip  />
              <Legend />
              <Line
                type='monotone'
                dataKey='totalQuantity'
                name='Total Quantity Sales'
                stroke='#8884d8'
                activeDot={{ r: 8 }}
              />
            </LineChart>
            <div className='chartName'>Tổng số lượng bán</div>
          </div>
        </div>
      </div>
      <ShopNav />
    </div>
  );
};

export default ShopStatistics;
