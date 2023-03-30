import React from "react";
import Login from "../../layouts/Form/Login";
import '../../../index.css';
import { Header } from "../../layouts/Header/Header";
export const Login_pages = () => {
    return (
      <body className='App'>
        <header>
            <Header/>
        </header>
        <main className="content_login">
            <Login/>
        </main>
      </body>
    )
  }