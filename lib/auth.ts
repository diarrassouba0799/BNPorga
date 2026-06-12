export const MOCK_CREDENTIALS = {
  identifiant: '5578017810',
  password: '455851',
  code2fa: '468687',
  codeVirement: '345870',
  codeSecurite: '785426',
}

export function verifierCredentials(identifiant: string, password: string): boolean {
  return (
    identifiant === MOCK_CREDENTIALS.identifiant &&
    password === MOCK_CREDENTIALS.password
  )
}

export function verifier2FA(code: string): boolean {
  return code === MOCK_CREDENTIALS.code2fa
}

export function verifierCodeVirement(code: string): boolean {
  return code === MOCK_CREDENTIALS.codeVirement
}

export function verifierCodeSecurite(code: string): boolean {
  return code === MOCK_CREDENTIALS.codeSecurite
}