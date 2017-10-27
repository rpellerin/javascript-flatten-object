const toFlatten = {
  popup: {
    1: true,
    2: false,
    obj: { yo: 1, ya: 2 }
  },
  display: {
    1: [1, 3]
  }
}

const expectedResult = {
  'popup.1': true,
  'popup.2': false,
  'popup.obj.yo': 1,
  'popup.obj.ya': 2,
  'display.1': [1, 3]
}

const isObject = value => Object(value) === value

const flattenObject = (obj, parent) => {
  const prefix = parent ? `${parent}.` : ''
  return Object.keys(obj).reduce((acc, key) => {
    if (isObject(obj[key]) && !Array.isArray(obj[key])) {
      const yo = flattenObject(obj[key], prefix + key)
      return { ...acc, ...yo }
    }
    acc[prefix + key] = obj[key]
    return acc
  }, {})
}

describe('Tests', () => {
  it('Returns a flattened object', async () => {
    expect(flattenObject(toFlatten)).toEqual(expectedResult)
  })
})
