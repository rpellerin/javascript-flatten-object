/**
 * Returns `true` if `value` is either a plain JS object or an array.
 */
const isObject = obj => obj === Object(obj)

/**
 * Flattens an object.
 */
const flattenObject = object =>
  Object.keys(object).reduce((acc, prop) => {
    let value = object[prop]
    acc[prop] = Array.isArray(value)
      ? flattenArray(value)
      : isObject(value) ? flattenObject(value) : value
    return acc
  }, {})

const flattenArray = array =>
  array.reduce(
    (acc, entry) => [
      ...acc,
      ...(Array.isArray(entry)
        ? flattenArray(entry)
        : isObject(entry) ? [flattenObject(entry)] : [entry])
    ],
    []
  )

describe('Basic tests', () => {
  it('Returns a flattened array', async () => {
    expect(flattenArray([[[]]])).toEqual([])
    expect(flattenArray([[[true]]])).toEqual([true])
    expect(flattenArray([[[1, 2], 3]])).toEqual([1, 2, 3])
  })
})

describe('Advanced tests', () => {
  it('Returns a flattened array containing objects', async () => {
    expect(flattenArray([[1, 2, [3]], 4, [[true]], { a: 'hello' }])).toEqual([
      1,
      2,
      3,
      4,
      true,
      { a: 'hello' }
    ])
    expect(
      flattenArray([[[{ a: [[{ b: [[true], true] }]], c: [[true]] }]]])
    ).toEqual([{ a: [{ b: [true, true] }], c: [true] }])
  })
})
