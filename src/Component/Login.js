import { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );

  const usernam = "user@gmail.com";
  const passwor = "pass";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === usernam && password === passwor) {
      localStorage.setItem("authenticated", true);
      navigate("../App");
    } else {
      localStorage.setItem("authenticated", false);
      navigate("../");
    }
  };
  return (
    <div className="form-bg" style={{overflowX:"auto"}}>
      <div className="container">
        <div className="row" style={{overflowX:"auto"}}>
          <div className="col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8">
            <div className="form-container">
              <form className="form-horizontal" onSubmit={handleSubmit}>
                <h3 className="title">Customer Manager</h3>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => setusername(e.target.value)}
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <button className="btn signin">Login</button>
                <span className="signup">
                  or <a href="#">Sign up</a>
                </span>
                <span className="forgot">
                  <a href="">Forgot Password?</a>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
