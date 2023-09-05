export function setPaymentLoading(state, value) {
  state.showPaymentLoading = value
}

export function setCardInfo(state, cardInfo) {
  state.cardDetails = { ...cardInfo }
}

export function setCustomerSubscription(state, value) {
  state.customerSubscription = value
}

export function setPaymentError(state, value) {
  state.paymentError = value
}

export function setCardDetailsSkeletonStatus(state, status) {
  state.showCardDetailsSkeleton = status
}

export function setPlanDetailsSkeletonStatus(state, status) {
  state.showPlanDetailsSkeleton = status
}

export function setCardDetailsButtonLoadingStatus(state, status) {
  state.showCardDetailsButtonLoading = status
}

export function setplanList(state, value) {
  state.planList = value
}

export function setCurrentPlan(state, planInfo) {
  state.planInfo = { ...planInfo }
}

export function setErrorInGettingPlan(state, value) {
  state.errorMessageIngettingPlan = value
}

export function setErrorInGettingCardInfo(state, value) {
  state.errorMessageIngettingCardInfo = value
}
