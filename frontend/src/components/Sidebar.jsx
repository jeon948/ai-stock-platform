const stocks = ["AAPL", "TSLA", "GOOGL", "MSFT"];

const Sidebar = ({ selected, onSelect }) => {
  return (
    <div className="w-64 bg-[#020617] border-r border-gray-800 p-4">
      <h2 className="text-lg font-semibold mb-6 text-gray-300">
        Watchlist
      </h2>

      <div className="space-y-2">
        {stocks.map((stock) => (
          <div
            key={stock}
            onClick={() => onSelect(stock)}
            className={`p-3 rounded-xl cursor-pointer transition flex justify-between items-center ${
              selected === stock
                ? "bg-blue-600 text-white"
                : "bg-gray-900 hover:bg-gray-800 text-gray-300"
            }`}
          >
            <span className="font-medium">{stock}</span>
            <span className="text-xs text-gray-400">US</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;