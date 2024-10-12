
export function getValidationErrorInStringFormat (error: Error) {
  const validationsErrorsMesasge = Object.entries((error as any)?.errors as Object).map(([field, error]) => `'${field}' (${error.reason ?? error.message})`)
  return validationsErrorsMesasge
}
