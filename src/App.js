//ファイル名:App.js

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import EmailConfirmation from "./pages/EmailConfirmation";
import AuthRedirect from "./pages/AuthRedirect";
import AccountDeleted from "./pages/AccountDeleted";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/email-confirmation" element={<EmailConfirmation />} />
            <Route path="/auth/redirect" element={<AuthRedirect />} />
            <Route path="/account-deleted" element={<AccountDeleted />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
