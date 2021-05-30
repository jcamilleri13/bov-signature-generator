const MAX_INT = 2147483647

const WIDTH = 50
const HEIGHT = 100

const COLOURS = [
  'rgb(132, 11, 85)',
  'rgb(247, 179, 43)',
  'rgb(25, 114, 120)',
  'rgb(253, 111, 92)',
  'rgb(29, 228, 166)'
]

function hash (string: string) {
  if (!string) return 0

  let hash = 0

  if (string.length === 0) return hash

  for (let i = 0; i < string.length; i++) {
      const char = string.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
  }

  return hash
}

interface GenerateDotsParams {
  string: string,
  width: number,
  height: number,
  scale: number
}

function generateDot ({ string, width, height, scale }: GenerateDotsParams) {
  const r = string.length * scale

  const x = width - (r * 2)
  const y = height - (r * 2)

  const hashX = hash(string)
  const hashY = hash(string.split('').reverse().toString())

  const cx = (Math.abs(hashX) / MAX_INT * x) + r
  const cy = (Math.abs(hashY) / MAX_INT * y) + r

  return { r, cx, cy }
}

function generateDots (name) {
  const [first = '', last = ''] = name.split(' ')

  const fillIndexA = first.length % COLOURS.length

  let fillIndexB = last.length % COLOURS.length
  if (fillIndexB === fillIndexA) {
    fillIndexB = fillIndexB === COLOURS.length - 1
      ? 0
      : fillIndexB + 1
  }

  const circleA = {
    fill: COLOURS[fillIndexA],
    ...generateDot({
      string: first,
      width: WIDTH,
      height: HEIGHT,
      scale: 2
    })
  }

  const circleB = {
    fill: COLOURS[fillIndexB],
    ...generateDot({
      string: last,
      width: WIDTH,
      height: HEIGHT,
      scale: 2.5
    })
  }

  return { circleA, circleB }
}

export { generateDots }
