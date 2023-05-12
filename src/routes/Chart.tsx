import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: string;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const chartTheme = isDark ? "dark" : "light"; // isDarkAtom을 통해 얻은 값에 따라 차트 테마 설정

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data:
                data?.map((price) => ({
                  x: new Date(price.time_close),
                  y: [price.open, price.high, price.low, price.close],
                })) ?? [],
            },
          ]}
          options={{
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
              foreColor: isDark ? "#fff" : "#373d3f", // isDarkAtom을 통해 얻은 값에 따라 차트 텍스트 색상 설정
            },
            grid: {
              show: false,
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#0be881",
                  downward: "#ff3d71",
                },
              },
            },
            tooltip: {
              x: {
                format: "dd MMM yyyy",
              },
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
            theme: {
              mode: chartTheme, // isDarkAtom을 통해 얻은 값에 따라 차트 테마 설정
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
