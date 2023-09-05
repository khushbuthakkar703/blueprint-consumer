export function setOrderHistory(state, { data, type }) {
  if (type === 'loadMore') {
    data.data.forEach(item => {
      state.orderHistory.push(item)
    })
  } else {
    state.orderHistory = data.data
  }
  state.orderHistoryCount = data.meta.count
}
