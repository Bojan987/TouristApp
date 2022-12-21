import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import axios from 'axios'

import logo from '../images/ikonica.jpg'
import { getMe, login } from "../services";


export const Header = () => {

  // const [kolac,setKolac] = useState(null)

  // useEffect(()=>{
    
  //   console.log(kolac)
  // },[kolac])

  // const handleClick = ()=>{

  //   login({
  //     "email": "test7@hotmail.com",
  //    "password": "pass1234"
  //  }).then(res=>{setKolac(document.cookie)
  // console.log(res.data)}
  //  ).catch(error=>{console.log(error.response.data.message)})
  // }

  // const getUser = ()=>{
  //   getMe().then(res=>{console.log(res)}).catch(error=>{console.log(error.response.data.message)})
  // }
  return (
    <nav>
      <div className="user-nav">
        <div className='user-nav__container'>
          <Link className="user-nav__link" activeClassName='active' to="/">
            <image src={logo} className='logo'/>
          </Link>
        </div>
        <div className='user-nav__container'>
          <Link className="user-nav__link__btn" activeClassName='active' to="/">
            <i className="fas fa-user-plus "></i> Join Us
          </Link>
        </div>
      </div>
    </nav>
  );
};
{
  /*
   */
}
