const { procurarQuartos } = require('../lib/scraping');

const buscar = async (req, res) => {
  const { checkin, checkout } = req.body;
  const procurar = await procurarQuartos(checkin, checkout);
  return res.status(200).send(procurar);
};

module.exports = { buscar };
