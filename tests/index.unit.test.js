import { isPositiveNumber } from '../src/services/todo.js'
import { describe, test, expect } from '@jest/globals'

describe('isPositiveNumber', () => {
  test('should return false if value is NaN', () => {
    const number = 't'

    const result = isPositiveNumber(number)

    expect(result).toBe(false)
  })
  test('should return true if value is NaN', () => {
    const number = 5

    const result = isPositiveNumber(number)

    expect(result).toBe(true)
  })
  test('should return false if value is NaN', () => {
    const number = ''

    const result = isPositiveNumber(number)

    expect(result).toBe(false)
  })
})
