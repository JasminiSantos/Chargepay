export function formatToMoney(value) {
  const valueAsANumber = Number(value);

  return valueAsANumber.toLocaleString('pt-br', {
    style: 'currency', currency: 'BRL'
  });
}

export function formatToMoneyDecimal(value) {
  const valueAsANumber = Number(value);

  return valueAsANumber.toLocaleString('pt-br', {
    style: 'decimal', currency: 'BRL'
  });
}