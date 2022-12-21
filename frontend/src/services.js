import axios from 'axios'


export const getToken = () => {
   const token = localStorage.getItem("Token");
   const data = { headers: { Authorization: `Bearer ${token}` } };
   return data
 }

// axios.defaults.baseURL = "http://localhost:3000";

export const allTours = ()=>{
   return axios.get('/api/v1/tours')
}

export const login =(data)=>{
   return axios.post('/api/v1/users/login',data)
}

export const getMe =()=>{
   return axios.get('/api/v1/users/me')
}

export const payment = ()=>{
   return axios.get("api/v1/bookings/checkout-session/6043dc56da9d5151ac0ef8f3")
}

export const payed = (data,head)=>{
   return axios.post("api/v1/bookings/my-tours",data,head)
}

