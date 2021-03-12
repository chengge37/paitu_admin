const getters = {
  user_data: state => state.user.user_data,
  is_login_in: state => state.user.user_data!=null && state.user.user_data!=undefined && state.user.user_data!= false,
  no_login_notice_time: state => state.user.no_login_notice_time,
  sidebar: state => state.app.sidebar,
}
export default getters
