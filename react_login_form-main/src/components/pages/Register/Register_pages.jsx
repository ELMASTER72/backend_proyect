import React from "react";
import Register from "../../layouts/Form2/Register";
import '../../../index.css';
import { Header } from "../../layouts/Header/Header";
export const Register_pages = () => {
    return (
      <body className='App'>
        <header>
            <Header/>
        </header>
        <main className="content_register">
            <Register/>
        </main>
      </body>
    )
  }