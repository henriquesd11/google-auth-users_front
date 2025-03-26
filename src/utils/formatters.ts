export function formatCpf(value: string): string {
  if (!value) return '';

  const digits = value.replace(/\D/g, '');

  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  return digits.slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function unmaskCpf(value: string): string {
  return value.replace(/\D/g, '');
}

export function formatDate(dateString: string): string {
  if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return ''; // Retorna vazio se a string for inválida ou não estiver no formato esperado
  }

  // Divide a string ISO em ano, mês e dia
  const [year, month, day] = dateString.split('-').map(Number);

  // Verifica se os valores são válidos
  if (isNaN(year) || isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
    return '';
  }

  // Formata com zeros à esquerda
  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');
  const formattedYear = String(year).padStart(4, '0');

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}
