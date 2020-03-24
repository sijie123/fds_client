export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (username, password) => ({
  type: AUTHENTICATE,
  username: username,
  password: password
});

export const logout = () => ({ 
  type: LOGOUT
});

export const signup = (username, password) => {
  const data = {
    username: username,
    password: password
  };

  return dispatch => {
    console.log(username);
    console.log(password);
    return fetch('http://54.169.81.205:3001/customer/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(res => console.log(res.json()))
      .then(() => dispatch(authenticate(username, password)));
  }
}