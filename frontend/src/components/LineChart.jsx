import '../css/LineChart.css';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "2017", react: 32, angular: 37, vue: 60 },
  { name: "2018", react: 42, angular: 42, vue: 54 },
  { name: "2019", react: 51, angular: 41, vue: 54 },
  { name: "2020", react: 60, angular: 37, vue: 28 },
  { name: "2021", react: 51, angular: 31, vue: 27 },
  { name: "2022", react: 95, angular: 44, vue: 49 },
];




const LineGraph = () => {

  return (
    <div className='lineChart-container'>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="react" stroke="#2196F3" strokeWidth={3} />
      </LineChart>
    </div>
  )
}

export default LineGraph