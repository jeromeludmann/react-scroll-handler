export const generateData = (quantity: number): number[] => {
  const items = []

  for (let i = 0; i < quantity; i++) {
    items.push(Math.random())
  }

  return items
}
