const dummy = (blogs) => {
  blogs // Get rid of unused param error
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach(a => likes += a.likes)
  return likes
}

const favoriteBlog = (blogs) => {
  let fav = { likes: -1 }
  blogs.forEach(a => {
    if (a.likes > fav.likes) fav = a
  })
  return fav
}

const mostBlogs = (blogs) => {
  let stats = new Map()
  blogs.forEach(a => {
    if (stats.has(a.author)) stats.set(a.author, stats.get(a.author)+1)
    else stats.set(a.author, 1)
  })

  let authorWithMost = { blogs: -1 }
  for (let [key, value] of stats.entries()) {
    if (value > authorWithMost.blogs) {
      authorWithMost = { author: key, blogs: value }
    }
  }

  return authorWithMost
}

const mostLikes = (blogs) => {
  let stats = new Map()
  blogs.forEach(a => {
    if (stats.has(a.author)) stats.set(a.author, stats.get(a.author)+a.likes)
    else stats.set(a.author, a.likes)
  })

  let authorWithMost = { likes: -1 }
  for (let [key, value] of stats.entries()) {
    if (value > authorWithMost.likes) {
      authorWithMost = { author: key, likes: value }
    }
  }

  return authorWithMost
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}