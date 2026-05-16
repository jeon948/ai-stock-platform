import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChartSection from "../components/ChartSection";
import RightPanel from "../components/RightPanel";

const Dashboard = () => {
  const [symbol, setSymbol] = useState("AAPL");

  return (
    <div className="flex h-screen bg-[#020617] text-white">
      <Sidebar selected={symbol} onSelect={setSymbol} />

      <div className="flex-1 flex flex-col">
        <ChartSection symbol={symbol} />
      </div>

      <RightPanel />
    </div>
  );
};

export default Dashboard;