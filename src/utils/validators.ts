
export function validateBookName (name: string) {
  if (name.length === 0 || name.length > 32) throw 'Name must be from 1 to 32 chars'
}
export function validateAuthorName (name: string) {
  if (name.length === 0 || name.length > 32) throw 'Name must be from 1 to 32 chars'
}

export function validateISBN (isbn: string) {
  if (isValidISBN(isbn)) return
  throw 'Unvalid ISBN'
}

export function isValidISBN (isbn: string): boolean {
  if (typeof isbn !== 'string') return false
  isbn = isbn.replace(/[-\s]/g, '')

  if (isbn.length === 10) {
    if (!/^\d{9}[\dX]$/.test(isbn)) {
      return false
    }
    const total = Array.from(isbn).reduce((sum, char, index) => {
      return sum + (char === 'X' ? 10 : parseInt(char) * (index + 1))
    }, 0)
    return total % 11 === 0
  } else if (isbn.length === 13) {
    if (!/^\d{13}$/.test(isbn)) {
      return false
    }
    const total = Array.from(isbn).reduce((sum, char, index) => {
      return sum + (parseInt(char) * (index % 2 === 0 ? 1 : 3))
    }, 0)
    return total % 10 === 0
  }

  return false
}
