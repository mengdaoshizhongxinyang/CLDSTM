import Router from 'vue-router'

const baseOptions = {
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 })
}

export function getEmptyRouter() {
  const options = { ...baseOptions }
  return new Router(options)
}

export function getRouter(routes) {
  const options = { ...baseOptions, routes }
  return new Router(options)
}