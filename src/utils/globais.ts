export function statusRegistro(
  status: string,
  competencia?: Date
) {
  if (!competencia) {
    const competencia = new Date();
  } else {
    competencia = new Date(competencia)
  }

  return status === 'true' ? {
    inicio_vigencia: { lte: competencia },
    OR: [
      { fim_vigencia: { gte: competencia } },
      { fim_vigencia: null },
    ],
  } : status === 'false' ? {
    OR: [
      { inicio_vigencia: { gt: competencia } },
      { fim_vigencia: { lt: competencia } },
    ]
  } : {};
}