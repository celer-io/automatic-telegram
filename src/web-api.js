let latency = 10

let readDirectory = [{
  'name': 'about.md',
  'path': '/about.md',
  'isDir': false,
  'size': 1231,
  'modTime': 1415837672
},
{
  'name': 'bio.md',
  'path': '/bio.md',
  'isDir': false,
  'size': 1889,
  'modTime': 1415931913
},
{
  'name': 'contact.md',
  'path': '/contact.md',
  'isDir': false,
  'size': 517,
  'modTime': 1415837672
},
{
  'name': 'gallery',
  'path': '/gallery',
  'isDir': true,
  'size': 442,
  'modTime': 1416298837
},
{
  'name': 'process',
  'path': '/process',
  'isDir': true,
  'size': 204,
  'modTime': 1416298831
}]

let readPage = {
  'page': {
    'path': '/lorem-ipsum.md',
    'metadata': {
      'description': 'bla bla bla',
      'title': 'Lorem Ipsum'
    },
    'content': '# Hello World'
  }
}

let updatePage = {
  'page': {
    'path': '/super-duper.md',
    'metadata': {
      'description': 'bla bla bla',
      'title': 'Super Duper'
    },
    'content': 'This is awesome'
  }
}

export class WebAPI {
  isRequesting = false
  getPosts () {
    this.isRequesting = true
    return new Promise(resolve => {
      setTimeout(() => {
        let results = readDirectory.filter(item => item.isDir === false)
        resolve(results)
        this.isRequesting = false
      }, latency)
    })
  }

  getPost (name) {
    this.isRequesting = true
    return new Promise(resolve => {
      setTimeout(() => {
        let result = readPage.page
        resolve(result)
        this.isRequesting = false
      }, latency)
    })
  }

  savePost (post) {
    this.isRequesting = true
    return new Promise(resolve => {
      setTimeout(() => {
        // let result = updatePage.page
        resolve({
          'path': '/super-duper.md',
          'metadata': {
            'description': 'bla bla bla',
            'title': 'Super Duper'
          },
          'content': 'This is awesome'
        })
        this.isRequesting = false
      }, latency)
    })
  }

  createPost (post) {
    this.isRequesting = true
    return new Promise(resolve => {
      setTimeout(() => {
        let result = updatePage.page
        resolve(result)
        this.isRequesting = false
      }, latency)
    })
  }
}
