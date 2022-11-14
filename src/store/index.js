import { createStore } from 'vuex'

export default createStore({
  state: {
    url: "http://150.230.67.252:1337/api/external-users",
    url_chamados: "http://150.230.67.252:1337/api/chamados?populate=*",
    url_chamados_post: "http://150.230.67.252:1337/api/chamados"

  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
