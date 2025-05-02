export const updateCache = (cache, query, addedBook) => {
  const uniqByID = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.id
      return seen.has(k) ? false : seen.add(k)
    })
  }

  console.log('entra aca updateCache')
  cache.updateQuery(query, ({ allBooks }) => {
    console.log('entra aca updateQuery')
    const uniqueBooks = uniqByID(allBooks.concat(addedBook))
    console.log(uniqueBooks)
    return {
      allBooks: uniqueBooks,
    }
  })
}