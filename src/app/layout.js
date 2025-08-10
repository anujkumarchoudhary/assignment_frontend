"use client"
import "./globals.css";
import Heading from "@/components/Heading";
import { Provider, } from "react-redux";
import store from "@/redux/store";
import InitUser from "@/components/InitUser";
import { ToastContainer, toast } from 'react-toastify';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Heading />
          <InitUser />
          {children}
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
