import { isPositiveNumber } from '../src/services/todo.js'
import { describe, test, expect } from 'jest'

describe('isPositiveNumber', () => {
  test('should return false if value is NaN', () => {
    const number = 't'

    const result = isPositiveNumber(number)

    expect(result).toBe(false)
  })
})
