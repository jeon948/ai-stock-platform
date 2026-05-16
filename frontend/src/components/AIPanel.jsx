const AIPanel = ({ ai }) => {
  if (!ai) return null;

  const color =
    ai.action === "BUY"
      ? "text-green-400"
      : ai.action === "SELL"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <div className="bg-gray-800 p-4 rounded-xl mt-6">
      <h2 className="text-lg font-bold mb-2">🤖 AI Recommendation</h2>

      <p className={`text-2xl font-bold ${color}`}>
        {ai.action}
      </p>

      <p className="text-sm text-gray-400">
        Confidence: {ai.confidence}%
      </p>

      <ul className="mt-2 text-sm text-gray-300">
        {ai.reason.map((r, i) => (
          <li key={i}>• {r}</li>
        ))}
      </ul>
    </div>
  );
};

export default AIPanel;