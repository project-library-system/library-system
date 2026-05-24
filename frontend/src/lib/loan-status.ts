export const loanStatusLabel: Record<string, string> = {
  PENDING: 'Pendente',
  APPROVED: 'Aprovado',
  REJECTED: 'Recusado',
  RETURNED: 'Devolvido',
  OVERDUE: 'Atrasado',
};

export const loanStatusColor: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-800',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  RETURNED: 'bg-gray-100 text-gray-800',
  OVERDUE: 'bg-orange-100 text-orange-800',
};
