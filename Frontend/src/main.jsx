
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import { AuthProvider } from './Authcontext/Authcontext'

import "../public/css/tailwind.css";
import { PlusProvider } from "./context/plus";
import { InvoiceShowProvider } from "./context/invoiceshow";
import { QuotationProvider } from "./context/quotation";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
        <AuthProvider>
        <InvoiceShowProvider>
          <QuotationProvider>
          <PlusProvider>
          
          <App />
          
          </PlusProvider>
          </QuotationProvider>
          </InvoiceShowProvider>
          </AuthProvider>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
