const puppeteer = require('puppeteer');
const { validacao } = require('./helpers');

const procurarQuartos = async (checkin, checkout) => {
  const validationError = validacao(checkin, checkout);
  if (validationError.length !== 0) return validationError;

  const url = `https://myreservations.omnibees.com/default.aspx?q=5462&version=MyReservation&sid=eb7041a5-1e6d-4e6d-af26-3e60aa782354#/&diff=false&CheckIn=${checkin}&CheckOut=${checkout}&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-`;
  try {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('div#rooms_results');
    const resultado = await page.evaluate(() => {
      let items = document.querySelectorAll('table.maintable > tbody > tr.roomName > td > div.roomExcerpt');
      let dados = [];

      if (items.length !== 0) {
        items.forEach(function (el) {
          let objeto = null;
          el.querySelectorAll('div.excerpt h5 a').forEach(function (el) {
            objeto = { quarto: el.innerHTML, img: [] };
          });
          el.querySelectorAll('div.excerpt p a').forEach(function (el) {
            objeto.descricao = el.innerHTML;
          });
          el.querySelectorAll('div.sincePrice div.sincePriceContent h6.bestPriceTextColor').forEach(function (el) {
            objeto.preco = el.innerHTML;
          });
          el.querySelectorAll('div.thumb div.bx-wrapper div.bx-viewport div.roomSlider div.slide a.fancybox-thumbs img').forEach(function (el) {
            objeto.img.push(el.getAttribute('src'));
          });
          dados.push(objeto);
        });
        return dados;
      }

      document.querySelectorAll('div.noResults div.wrapLeft div.info-message h2').forEach(function (el) {
        dados.push({ mensagem: el.innerHTML });
      });
      return dados;
    });
    await browser.close();
    return resultado;
  } catch (error) {
    return [{ mensagem: `Ocorreu um erro durante o carregamento da página! Por favor, tente novamente.${error}` }];
  }
};

module.exports = { procurarQuartos };
