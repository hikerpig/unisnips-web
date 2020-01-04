type ListPredicate<T> = (item: T, index: number) => boolean

export function findIndex<T>(list: T[], predicate: ListPredicate<T>) {
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (predicate(item, i)) {
      return i
    }
  }
  return -1
}

export function findPosAndItem<T>(list: T[], predicate: ListPredicate<T>) {
  const pos = findIndex(list, predicate)
  let item
  if (pos > -1) {
    item = list[pos]
  }
  return {
    item,
    pos,
  }
}
