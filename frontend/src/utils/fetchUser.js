export const fetchUser = () =>
  localStorage.getItem('shareme_user')
    ? JSON.parse(localStorage.getItem('shareme_user'))
    : localStorage.clear()
