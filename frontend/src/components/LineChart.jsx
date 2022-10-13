import "../css/LineChart.css";
import {
  CartesianGrid,
  Tooltip,
  XAxis,
  AreaChart,
  Area,
} from "recharts";

const LineGraph = ({ transactions, account }) => {
  const accountId = account.account_id;
  //fillData gives an array of objects that contain the total cost of transactions per date
  // objects inside of the array are are in ascending order
  const fillData = () => {
    const data = [];
    //loop through transactions backwards because transaction dates are in descending order
    //we want reverse this so dates inside data array are in ascending order
    for (let i = transactions.length - 1; i >= 0; i--) {
      let foundDupe = false;
      let curTransaction = transactions[i];
      const obj = {};
      //compare Id's to match what the user selected
      if (curTransaction.account_id === accountId) {
        //loop through data array to check if the curTransaction date already exists
        data.forEach((dataTransaction) => {
          if (dataTransaction.date === curTransaction.date) {
            dataTransaction.amount += curTransaction.amount;
            foundDupe = true;
          }
        });
        //push a new object into data array with date and amount key value pairs, if no duplicate was found
        if (!foundDupe) {
          obj.date = curTransaction.date;
          obj.amount = curTransaction.amount;
          data.push(obj);
        }
      }
    }
    //console.log(data)
    return data;
  };

  return (
    <div className="lineChart">
      <div className="lineChart-title">Cost of Transactions by Date</div>
      <AreaChart width={730} height={400} data={fillData()}>
        <defs>
          <linearGradient id="amount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#72efff" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#72efff" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" stroke="gray" />
        <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
        <Tooltip itemStyle={{ color: "#36c9fe" }} />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#72efff"
          fillOpacity={1}
          fill="url(#amount)"
          dot={{ stroke: "#36c9fe", strokeWidth: 2 }}
        />
      </AreaChart>
    </div>
  );
};

export default LineGraph;
