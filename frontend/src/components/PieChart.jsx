import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";

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
  console.log(data);

  // {
  //   id: "c",
  //   label: "c",
  //   value: 577,
  //   color: "hsl(187, 70%, 50%)",
  // },

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      valueFormat=" =-.2%"
      innerRadius={0.6}
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
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
