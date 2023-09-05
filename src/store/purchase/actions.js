import request from 'src/api'

export async function getOrderHistory({ commit }, { offset, limit, type }) {
  await request
    .get(`/products?status=all&offset=${offset}&limit=${limit}`)
    .then(({ data }) => {
      commit('setOrderHistory', { data, type })
    })
    .catch(error => {
      console.log(error)
    })
}

export async function getProductInvoice({ commit }, productID) {
  commit('setLoading', true)
  let invoice = {}
  await request
    .get(`/products/${productID}/invoice`)
    .then(response => {
      invoice = response
    })
    .catch(error => {
      console.log(error)
    })
  commit('setLoading', false)
  return invoice
}
