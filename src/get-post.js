import {ajax} from './ajax'
import {createURL, tagToElement} from './utils'
import {checkImage} from './check-image'
import {setTransition} from './set-transition'

const POST_COLUMNS_LENGTH = 3

const postWrapper = document.getElementById('post-wrapper')
const postColumn = tagToElement(`<div class="post-column" style="width: ${100/POST_COLUMNS_LENGTH}%"></div>`)
const postColumns = Array.from({length: POST_COLUMNS_LENGTH}, () => postColumn.cloneNode())
// postColumns.forEach(column => postWrapper.appendChild(column))

export const getPosts = (projectUid, params, postRender) => {
  ajax(createURL(projectUid, params), {}, ({items}) => {
    const posts = items
    const checkedPosts = (posts, {checkedPosts = []} = {}, f) => {
      let count = 0
    
      posts.forEach(post => {
        checkImage(post.url, ev => {
          if(ev.type === 'load') checkedPosts.push(post) 
          count++
    
          if(posts.length === count) f(posts.filter(post => checkedPosts.indexOf(post) !== -1))
        })
      })
    }
    
    const renderPosts = (confirmed, postRender) => {
      const posts = confirmed
      const postHTML = posts.map(postRender)
      postHTML.map(post => tagToElement(post)).forEach((post, index) => {
        postColumns[index%POST_COLUMNS_LENGTH].appendChild(post)
        setTransition(post, 'fade', 'in', 800)
      })
    }

    checkedPosts(posts, {}, confirmed => {
      renderPosts(confirmed, postRender)
    })
  })
}


