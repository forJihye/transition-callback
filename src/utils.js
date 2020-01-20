export const createURL = (projectUid, params) => {
  return `https://api.hashsnap.net/posts/${projectUid}?` + toParams(params)
}

const toParams = (params) => {
  return Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
}

export const getURLSetting = (tagName) => {
  const el = document.getElementsByTagName(tagName)
  const attrs = el[0].attributes
  const projectUid = {}
  const params = {}
  
  for(let i=0; i<attrs.length; i++){
    if(attrs[i].name === 'project-uid'){
      projectUid['projectUid'] = attrs[i].value
    }else{
      params[attrs[i].name] = attrs[i].value
    }
  }
  
  return {...projectUid, params}
}

export const tagToElement = (html) => {
  const parentDiv = document.createElement('div')
  parentDiv.innerHTML = html
  return parentDiv.children[0]
}