/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/order */
const app = require('../server');
const request = require('supertest')(app);

describe('Buscar Quarto entre as datas 01/03/2021 a 02/03/2021', () => {
  beforeEach(() => {
    jest.setTimeout(30000);
  });

  const expected = [{
    descricao: 'Ideal para relaxar. Os quartos dispõem de diversos serviços para garantir uma estadia confortável e agradável. Todos os apartamentos Stan... ', img: ['/Handlers/ImageLoader.ashx?sz=250x166&imageID=189952.jpg', '/Handlers/ImageLoader.ashx?sz=250x166&imageID=152609.jpg', '/Handlers/ImageLoader.ashx?sz=250x166&imageID=189950.jpg'], preco: 'R$ 703,00', quarto: 'Standard',
  }, {
    descricao: 'Confortavelmente decorado para fazer da sua estadia um momento de prazer e bem-estar. Os quartos da categoria Luxo contam Ar climatizado,... ', img: ['/Handlers/ImageLoader.ashx?sz=250x166&imageID=152620.jpg', '/Handlers/ImageLoader.ashx?sz=250x166&imageID=152621.jpg', '/Handlers/ImageLoader.ashx?sz=250x166&imageID=189959.jpg'], preco: 'R$ 750,50', quarto: 'Luxo',
  }, {
    descricao: 'Exclusividade e requinte. Todos os quartos luxo superior contam com Ar climatizado, TV LCD 32”, SKY, frigobar, telefone, cofre e secador ... ', img: ['/Handlers/ImageLoader.ashx?sz=250x166&imageID=152623.jpg', '/Handlers/ImageLoader.ashx?sz=250x166&imageID=152624.jpg', '/Handlers/ImageLoader.ashx?sz=250x166&imageID=152625.jpg'], preco: 'R$ 845,50', quarto: 'Luxo Superior',
  }, {
    descricao: 'São 6 quartos luxuosos, sofisticados e decorados com requinte, além de localização privilegiada em nosso hotel. Alguns possuem mezanino e... ', img: ['/Handlers/ImageLoader.ashx?sz=250x166&imageID=192355.jpg', '/Handlers/ImageLoader.ashx?sz=250x166&imageID=192356.jpg', '/Handlers/ImageLoader.ashx?sz=250x166&imageID=192357.jpg', '/Handlers/ImageLoader.ashx?sz=250x166&imageID=192358.jpg'], preco: 'R$ 988,00', quarto: 'Master',
  }];

  it('Deve retornar 200 e a informação dos quartos', async () => {
    const res = await request.post('/api/buscar').send({ checkin: '01032021', checkout: '02032021' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expected);
  });
});

describe('Testar validações de entrada de data', () => {
  beforeEach(() => {
    jest.setTimeout(30000);
  });

  it('Deve retornar 200 e disparar um erro que datas não podem ser iguais', async () => {
    const expected = [{ mensagem: 'A data de saída (CheckOut) deve ser posterior à de entrada (CheckIn).' }];
    const res = await request.post('/api/buscar').send({ checkin: '01032021', checkout: '01032021' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expected);
  });

  it('Deve retornar 200 e disparar um erro que o Checkout não pode ser menor que o Checkin', async () => {
    const expected = [{ mensagem: 'A data de saída (CheckOut) não pode ser anterior a data de entrada (CheckIn)' }];
    const res = await request.post('/api/buscar').send({ checkin: '01032021', checkout: '01012021' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expected);
  });

  it('Deve retornar 200 e disparar um erro que o Checkout não pode ser menor que o Checkin', async () => {
    const expected = [{ mensagem: 'A data de saída (CheckOut) não pode ser anterior a data de entrada (CheckIn)' }];
    const res = await request.post('/api/buscar').send({ checkin: '01032021', checkout: '01012021' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expected);
  });

  it('Deve retornar 200 e disparar um erro de data invalida', async () => {
    const expected = [{ mensagem: 'Data inserida não é válida' }];
    const res = await request.post('/api/buscar').send({ checkin: '01xse', checkout: '01012021' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expected);
  });

  it('Deve retornar 200 e disparar um erro para preencher a entrada', async () => {
    const expected = [{ mensagem: 'Preencha o CheckIn e ou Checkout.' }];
    const res = await request.post('/api/buscar').send({ checkin: '', checkout: '01012021' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expected);
  });
});
