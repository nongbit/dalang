export function getDefaultActive(items, defaultIndex = null) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].hasAttribute('active')) return i
  }

  return defaultIndex
}