export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
}

export function formatCurrency(number: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
}
