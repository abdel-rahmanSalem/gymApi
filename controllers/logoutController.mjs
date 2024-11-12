import sql from "mssql";
import { getPool } from "../configs/dbConfig.mjs";

const handleLogout = async (req, res) => {
  const { token } = req.body;
  if (!token)
    return res.status(400).json({ error: "Refresh Token is required." });

  try {
    const pool = await getPool();

    const result = await pool
      .request()
      .input("token", sql.VarChar(250), token)
      .query("DELETE FROM RefreshTokens WHERE token = @token");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Refresh Token not found." });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error}` });
  }
};

export default handleLogout;
