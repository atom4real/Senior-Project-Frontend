import apiClient from '@/services/AxiosClient.js'
import Store from '@/store'
import axios from 'axios';
import router from '@/router'

export default {
  login(formData) {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('token')
    
    console.log(formData)
    axios
      .post('/api/login', formData)
      .then(response => {
        const token = response.data.jwt
        const role = response.data.role
        const name = response.data.name
        const email = response.data.email

        Store.commit('setToken', token)
        Store.commit('setRole', role)
        Store.commit('setName', name)
        Store.commit('setEmail', email)
        console.log(email)

        console.log(response)
        axios.defaults.headers.common['Authorization'] = 'JWT' + token
        localStorage.setItem("token", token)
        localStorage.setItem("role", role)
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        router.push('/')
      })
      .catch(error => {
        alert(`Incorrect password or account doesn't exist.`)
        console.log(error)
      }
      )
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
  },
  useGeolocation() {
    const coords = ref({ latitude: 0, longtitude: 0 })
    const isSupport = 'navigator' in window && 'geolocation' in navigator

    let watcher = null
    onMounted(() => {
      if (isSupport)
        watcher = navigator.geolocation.watchPosition(
          position => (coords.value = position.coords)
        )
    })
    onUnmounted(() => {
      if (watcher) navigator.geolocation.clearWatch(watcher)
    })

    return { coords, isSupport }
  }
}
