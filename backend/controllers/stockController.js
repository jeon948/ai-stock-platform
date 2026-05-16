import { getStockData } from "../services/stockService.js";

export const fetchStock = async (req, res) => {
  const { symbol } = req.params;

  const data = await getStockData(symbol);

  res.json(data);
};