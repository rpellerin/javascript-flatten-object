const objectToFlatten = {
  arr: [5],
  popup: {
    1: true,
    2: false,
    obj: { yo: 1, ya: 2 }
  },
  display: {
    1: [1, [42, 43], { string: 'yolo', tab: [50] }]
  }
}
const expectedObject = {
  'arr[0]': 5,
  'popup.1': true,
  'popup.2': false,
  'popup.obj.yo': 1,
  'popup.obj.ya': 2,
  'display.1[0]': 1,
  'display.1[1][0]': 42,
  'display.1[1][1]': 43,
  'display.1[2].string': 'yolo',
  'display.1[2].tab[0]': 50
}

const arrayToFlatten = [{ a: 1, b: [1, 2] }, 2]
const expectedArray = {
  '[0].a': 1,
  '[0].b[0]': 1,
  '[0].b[1]': 2,
  '[1]': 2
}

/**
 * Returns `true` if `value` is either a plain JS object or an array.
 */
const isObjectOrArray = value => Object(value) === value

/**
 * Flattens an object.
 * Example:
 * {a: [1,42], b: {c: 1}} ==> {'a[0]': 1, 'a[1]': 42, 'b.c': 1}
 */
const flattenObject = (obj, parent) => {
  if (!isObjectOrArray(obj)) return parent ? { [parent]: obj } : obj

  const isArray = Array.isArray(obj)

  return (isArray ? obj : Object.keys(obj)).reduce((acc, property, i) => {
    const childsParent = isArray
      ? `${parent || ''}[${i}]`
      : `${parent ? `${parent}.` : ''}${property}`
    const child = isArray ? property : obj[property]
    return { ...acc, ...flattenObject(child, childsParent) }
  }, {})
}

describe('Tests', () => {
  it('Returns a flattened object', async () => {
    expect(flattenObject(objectToFlatten)).toEqual(expectedObject)
  })
  it('Returns a flattened array', async () => {
    expect(flattenObject(arrayToFlatten)).toEqual(expectedArray)
  })
})
