import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";
import "../css/PieChart.css";

const PieChart = ({ transactions, account }) => {
  const [accountTransactions, setAccountTransactions] = useState([]);
  const accountId = account.account_id;

  useEffect(() => {
    let total = 0;
    const addChartData = () => {
      const categories = transactions
        .filter((item) => item.account_id === accountId)
        .reduce((acc, item) => {
          const itemIndex = acc.findIndex((i) => i.label === item.category[0]);

          if (item.amount > 0) total += item.amount;

          if (itemIndex !== -1) {
            if (item.amount >= 0) {
              acc[itemIndex].sum += item.amount;
            }
          } else if (item.amount >= 0) {
            acc.push({
              id: item.category[0],
              label: item.category[0],
              sum: item.amount,
            });
          }

          return acc;
        }, []);

      categories.map((item) => {
        return (item.value = item.sum / total);
      });

      setAccountTransactions(categories);
    };
    addChartData();
  }, [accountId, transactions]);

  let data = accountTransactions;

  // {
  //   id: "c",
  //   label: "c",
  //   value: 577,
  //   color: "hsl(187, 70%, 50%)",
  // },

  return (
    <div className="pie-container">
      <div className="pie-title">Percentage Cost by Category</div>
      <div className="pie-chart">
        <ResponsivePie
          data={data}
          margin={{ top: 10, right: 120, bottom: 20, left: 0 }}
          valueFormat=" =-.2%"
          innerRadius={0.7}
          padAngle={2}
          activeOuterRadiusOffset={8}
          colors={{ scheme: "nivo" }}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", "1"]],
          }}
          enableArcLinkLabels={false}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          tooltip={({ datum: { id, value, color, data } }) => (
            <div
              style={{
                padding: 12,
                color,
                background: "white",
                borderRadius: "5px",
                borderStyle: "solid",
              }}
            >
              <span>{id}</span>
              <br />
              <span style={{ color: "black", fontWeight: "bold" }}>
                ${data.sum}
              </span>
            </div>
          )}
          // tooltip={function (e) {
          //   var t = e.datum;
          //   return (0, a.jsxs)(s, {
          //     style: { color: t.color },
          //     children: [
          //       (0, a.jsx)(d, { children: "id" }),
          //       (0, a.jsx)(c, { children: t.id }),
          //       (0, a.jsx)(d, { children: "value" }),
          //       (0, a.jsx)(c, { children: t.value }),
          //       (0, a.jsx)(d, { children: "formattedValue" }),
          //       (0, a.jsx)(c, { children: t.formattedValue }),
          //       (0, a.jsx)(d, { children: "color" }),
          //       (0, a.jsx)(c, { children: t.color }),
          //     ],
          //   });
          // }}
          legends={[
            {
              anchor: "right",
              direction: "column",
              justify: false,
              translateX: 80,
              translateY: 0,
              itemWidth: 80,
              itemHeight: 20,
              itemsSpacing: 5,
              symbolSize: 15,
              itemDirection: "left-to-right",
            },
          ]}
        />
        <div className="total-overlay">
          <span>
            $
            {data.reduce((acc, value) => {
              acc += value.sum;
              return parseFloat(acc.toFixed(2));
            }, 0)}
          </span>
          <span className="overlay-desc">Total Expenses</span>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
