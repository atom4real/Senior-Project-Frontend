import apiClient from '@/services/AxiosClient.js'
import Store from '@/store'

export default {
  login(user) {
    return apiClient
      .post('/api/login', {
        username: user.username,

        password: user.password
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        Store.currentUser = response.data.user
        return Promise.resolve(response.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    Store.currentUser = null
  },
  register(user) {
    return apiClient.post('/register', {
      username: user.username,
      password: user.password,
      email: user.email
    })
  },
  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  },
  hasRoles(roles) {
    console.log(Store.currentUser)
    if (Store.currentUser && roles) {
      let containRoles = Store.currentUser.authorities.filter((authority) =>
        roles.includes(authority)
      )
      console.log(Store.currentUser)

      if (containRoles.length > 0) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },
  getContentDetail(id) {
    return apiClient.get('/content/' + id)
  }
}
