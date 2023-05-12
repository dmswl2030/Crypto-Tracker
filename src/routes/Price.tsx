import styled from "styled-components";
import { PriceData } from "./Coin";
interface PriceProps {
  tickersData: PriceData;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const HighCard = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #d6d6d6;
  background-color: ${(props) => props.theme.bgColor};
`;
const TimdCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;
`;
const ItemCard = styled.div`
  width: 48%;
  height: 70px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #d6d6d6;
  background-color: ${(props) => props.theme.bgColor};
`;
const HighInfo = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 700;
  padding: 10px 0 0 10px;
`;
const HighData = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  text-align: end;
  color: ${(props) => props.theme.accentColor};
`;
const ItemInfo = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 700;
  padding: 10px 0 0 10px;
`;

const ItemData = styled.div`
  width: 100%;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 25px;
  text-align: end;
  font-weight: 500;
  color: ${(props) => props.theme.textColor};
`;

function Price({ tickersData }: PriceProps) {
  const quotes = tickersData.quotes.USD;
  const athDate = new Date(quotes.ath_date);
  const athDateString = athDate.toLocaleDateString("ko-KR");
  const athTimeString = athDate.toLocaleTimeString("ko-KR");

  const formatPercentage = (percentage: number) => {
    const formattedPercentage = `${Math.abs(percentage).toFixed(2)}%`;
    const color = percentage < 0 ? "rgb(20, 215, 20)" : "rgb(240, 66, 66)";
    const sign = percentage < 0 ? "-" : "+";
    return (
      <p style={{ color }}>
        {sign}
        {formattedPercentage}
      </p>
    );
  };

  return (
    <>
      <Container>
        <HighCard>
          <HighInfo>
            {athDateString} {athTimeString}
            <p>최고가 달성</p>
          </HighInfo>

          <HighData>${quotes.ath_price.toFixed(2)}</HighData>
        </HighCard>
        <TimdCard>
          <ItemCard>
            <ItemInfo>1시간 전보다</ItemInfo>
            <ItemData>{formatPercentage(quotes.percent_change_1h)}</ItemData>
          </ItemCard>

          <ItemCard>
            <ItemInfo>6시간 전보다</ItemInfo>
            <ItemData>{formatPercentage(quotes.percent_change_6h)}</ItemData>
          </ItemCard>

          <ItemCard>
            <ItemInfo>12시간 전보다</ItemInfo>
            <ItemData>{formatPercentage(quotes.percent_change_12h)}</ItemData>
          </ItemCard>

          <ItemCard>
            <ItemInfo>24시간 전보다</ItemInfo>
            <ItemData>{formatPercentage(quotes.percent_change_24h)}</ItemData>
          </ItemCard>

          <ItemCard>
            <ItemInfo>7일 전보다</ItemInfo>
            <ItemData>{formatPercentage(quotes.percent_change_7d)}</ItemData>
          </ItemCard>

          <ItemCard>
            <ItemInfo>30일 전보다</ItemInfo>
            <ItemData>{formatPercentage(quotes.percent_change_30d)}</ItemData>
          </ItemCard>
        </TimdCard>
      </Container>
    </>
  );
}
export default Price;
