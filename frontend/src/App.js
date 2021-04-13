import React, { useState } from "react";
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { BookingPage } from "./Pages/BookingPage";
import { HomePage } from "./Pages/HomePage";
import TourPage from './Pages/TourPage'
function App() {
  const [user, setUser] = useState({email:'',password:'',confirmPassword:''});
  // const [session,setSession] = useState({})

  // const stripePromise = loadStripe("pk_test_51ISp1jBft64DlCt3qTMADkmhE2jq5SPMR6StTkjnLZWcyitKGqAGufe67Xgv5dUGDrMW56awXGxXLKK8Apgbc6mv00oW9OUhmP");
 
  const handleInputData = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value.toLowerCase(),
      };
    });
  };

  // const handleSubmit = (e)=>{
  //   e.preventDefault()
  //   login(user).then(res=>{

  //     localStorage.setItem('Token',res.data.token)
  //     console.log(res.data.token,getToken())
  //   }).catch((err) => {

  //     console.log(err.response.data.message);
  //   })
  // }

  // const handlePayment = ()=>{
  //   payment().then(resp=>{

  //     console.log( stripePromise.then(res=>{
  //       console.log(res.data)
  //     }))

  //      const sucess = stripePromise.then(res=>res.redirectToCheckout({
  //         sessionId:resp.data.session.id
  //       }))
  //     console.log(sucess)
  //   }).catch(err=>{
  //     console.log('AXIOS ERROR: ', err.response.data.message)
  //   })
  // }

  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route path="/placeorder" component={BookingPage} />
          <Route path="/login">
            
          </Route>
          <Route path="/" component={HomePage} exact />
          <Route path='/tour/:id' component={TourPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
