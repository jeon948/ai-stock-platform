import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChartSection from "../components/ChartSection";
import RightPanel from "../components/RightPanel";

const Dashboard = () => {
  const [symbol, setSymbol] = useState("AAPL");

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      <Sidebar selected={symbol} onSelect={setSymbol} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <ChartSection symbol={symbol} />

        <div className="text-center text-gray-400 text-xs px-6 py-6 border-t border-gray-800">
          Disclaimer: This platform uses real-time or near real-time market
          data for educational purposes only. AI recommendations are
          experimental and should not be considered financial advice.
        </div>
      </div>

      <RightPanel />
    </div>
  );
};

export default Dashboard;