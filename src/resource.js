import Vue from 'vue'
import VueResource from 'vue-resource'

// const API_BASE = 'http://localhost:3000'
const API_BASE = 'http://192.168.43.214:3000'
// const API_BASE = 'http://192.168.191.1:3000'

Vue.use(VueResource);

Vue.http.options = {
  root: API_BASE
};

Vue.http.interceptors.push((request, next) => {
  var timeout;
  // 這裡改用 _timeout ，就不會觸發原本的
  if (request._timeout) {
    timeout = setTimeout(() => {
      //自定义响应体 status:408,statustext:"请求超时"，并返回给下下边的next
      next(request.respondWith(request.body, {
        status: 408,
        statusText: '请求超时'
      }));
    }, request._timeout);
  }
  next((response) => {
    clearTimeout(timeout);
    // console.log(response.status) //如果超时输出408
    return response;
  })
})

Vue.http.interceptors.push((request, next) => {
  if (localStorage.token) {
    request.headers.set('x-access-token', localStorage.token)
  } else {
    request.headers.set('x-access-token', 'AaronTsang')
  }
  next(response => {
      console.log(response.status)
      return response
    })
})

const actions = {
  login: {
    method: 'GET',
    url: 'User/Login?'
  },
  reg: {
    method: 'POST',
    url: 'User/reg'
  },
  getIndexBook: {
    method: 'GET',
    url: 'Books/getIndexBook'
  },
  getAllBookItems: {
    method: 'GET',
    url: 'BookItem/getBookItem'
  },
  addBookItem: {
    method  : 'POST',
    url     : 'BookItem/addBookItem'
  },
  editBookItem: {
    method  : 'PUT',
    url     : 'BookItem/editBookItem'
  },
  delBookItem: {
    method: 'DELETE',
    url: 'BookItem/delBookItem'
  },
  addBook: {
    method: 'POST',
    url: 'Books/addBook'
  },
  editBook: {
    method: 'PUT',
    url: 'Books/editBookInfo'
  },
  delBook: {
    method: 'DELETE',
    url: 'Books/delBook'
  },
  uploadBookPic: {
    method: 'POST',
    url: 'Books/bookPic/uploading'
  },
  getBookPic: {
    method: 'GET',
    url: 'Books/getBookPic'
  },
  getUnsureBooks: {
    method: 'GET',
    url:  'Books/getBooks'
  },
  toPublic: {
    method: 'POST',
    url: 'toBlock/create'
  },
  getPublicedBooks: {
    method: 'GET',
    url: 'Books/getPublicedBooks'
  },
  onePublicedBook: {
    method: 'GET',
    url: 'Books/onePublicedBook'
  },
  cancelPublic: {
    method: 'GET',
    url: 'toBlock/cancel'
  },
  checkBdHash: {
    method: 'GET',
    url: 'toBlock/check'
  }
}
const resource = Vue.resource('', {}, actions)

export default resource
