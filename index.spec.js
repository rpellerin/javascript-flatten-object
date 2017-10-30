const toFlatten = {
  popup: {
    1: true,
    2: false,
    obj: { yo: 1, ya: 2 }
  },
  display: {
    1: [1, [42, 43], { string: 'yolo', tab: [50] }]
  }
}

const expectedResult = {
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

/**
 * Returns true for objects and arrays
 */
const isObjectOrArray = value => Object(value) === value

const flattenObject = (obj, parent) => {
  if (!isObjectOrArray(obj)) return parent ? { [parent]: obj } : obj

  const isArray = Array.isArray(obj)
  const prefix = parent ? `${parent}.` : ''

  return (isArray ? obj : Object.keys(obj)).reduce((acc, property, i) => {
    const childsParent = isArray ? `${parent}[${i}]` : `${prefix}${property}`
    const child = isArray ? property : obj[property]
    return { ...acc, ...flattenObject(child, childsParent) }
  }, {})
}

describe('Tests', () => {
  it('Returns a flattened object', async () => {
    expect(flattenObject(toFlatten)).toEqual(expectedResult)
  })
})
