import React from "react";
import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import "../css/BarChart.css";

function BarChart({ transactions, account }) {
  const [accountTransactions, setAccountTransactions] = useState([]);
  const accountId = account._id;

  useEffect(() => {
    const addChartData = () => {
      const categories = transactions
        .filter((item) => item.account_id === accountId)
        .reduce((acc, item) => {
          const itemIndex = acc.findIndex((i) => i.category === item.category);

          if (itemIndex !== -1) {
            acc[itemIndex].value += item.amount;
          } else {
            acc.push({
              category: item.category,
              value: item.amount,
            });
          }

          return acc;
        }, []);

      setAccountTransactions(categories);
    };
    addChartData();
  }, [accountId, transactions]);

  let data = accountTransactions;

  return (
    <div className="bar-container">
      <div className="bar-title">Cost Per Category</div>
      <div className="bar-chart">
        <ResponsiveBar
          data={data}
          indexBy="category"
          margin={{ top: 50, right: 60, bottom: 50, left: 80 }}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          valueFormat=" >-$"
          colors={{ scheme: "pastel1" }}
          colorBy="indexValue"
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Category",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Cost",
            legendPosition: "middle",
            legendOffset: -50,
          }}
          enableGridX={true}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[]}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={function (e) {
            return (
              e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            );
          }}
        />
      </div>
    </div>
  );
}

export default BarChart;
