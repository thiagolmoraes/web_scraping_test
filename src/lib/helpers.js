function inverterData(date) {
  try {
    const regex = '^([0-9]{2})([0-9]{2})([0-9]{4})';
    const dataFormatada = date.match(regex);
    return `${dataFormatada[2]}/${dataFormatada[1]}/${dataFormatada[3]}`;
  } catch (error) {
    return { mensagem: 'Data inserida não é válida' };
  }
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function validacao(checkin, checkout) {
  // Verificar se a entrada não é null, undefined ou empty
  if (!checkin || !checkout) return { mensagem: 'Preencha o CheckIn e ou Checkout.' };
  // Permitir apenas a entrada de string
  if (typeof (checkin) === 'string' && typeof (checkout) === 'string') {
    let checkIn = new Date(inverterData(checkin));
    let checkOut = new Date(inverterData(checkout));
    // Data não é válida
    if (!isValidDate(checkIn) || !isValidDate(checkOut)) return { mensagem: 'Data inserida não é válida' };
    // CheckIn não pode ser igual CheckOut ou menor
    if (checkIn.getTime() === checkOut.getTime()) return { mensagem: 'A data de saída (CheckOut) deve ser posterior à de entrada (CheckIn).' };

    // Checkout não pode ser anterior CheckIn
    if (checkOut < checkIn) return { mensagem: 'A data de saída (CheckOut) não pode ser anterior a data de entrada (CheckIn)' };
  } else {
    return { messagem: 'Tipo de entrada de dados não é válido.' };
  }
  return [];
}

module.exports = { validacao };
