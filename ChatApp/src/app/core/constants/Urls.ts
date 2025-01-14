
const SERVER_URL='http://localhost:8080'

const USER_LOGIN='/auth/login'
const USER_SIGNUP='/auth/signup'
const VERIFY_OTP='/auth/login/verify'

const GET_USERS='/users/'
const GET_CONTACTS='/users/contacts/'
const SEND_MESSAGE='/users/message/'
const GET_MESSAGE='/users/message/'
const GET_PROFILE='/users/self'
const GET_USERS_BY_ID='/users/id'

const UPDATE_PROFILE_IMAGE='/users/self/profile/'
const UPDATE_PROFILE_DETAIL='/users/self/detail'

export
{
  USER_LOGIN,
  USER_SIGNUP,
  SERVER_URL,
  VERIFY_OTP,
  GET_USERS,
  GET_CONTACTS,
  SEND_MESSAGE,
  GET_MESSAGE,
  GET_PROFILE,
  GET_USERS_BY_ID,
  UPDATE_PROFILE_IMAGE,
  UPDATE_PROFILE_DETAIL
}
