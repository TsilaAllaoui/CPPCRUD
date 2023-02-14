
import "../css/Login.scss"

function Login({setDatas}) {
  const handle = (event) => {
    event.preventDefault();
    const form = event.target;
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        hostname: form.hostname.value,
        port: form.port.value,
        username: form.username.value,
        password: form.password.value,
      }),
    })
      .then((data) => data.json())
      .then((json) => {
        setDatas(json)
      });
  };

  return (<>
  <div className="headers">
    <p id="login-text">Login</p>
    <p id="desc">C++ CRUD Powered by CGI and MySQL</p>
    <div className="separators">
      <div className="hseparator"></div>
      <p>Signup</p>
      <div className="hseparator"></div>
    </div>
  </div>
  <form onSubmit={handle} className="form">
      <label htmlFor="">Hostname</label>
      <input type="text" name="hostname" defaultValue={"127.0.0.1"} />
      <label htmlFor="">Port</label>
      <input type="number" name="port" defaultValue={"3306"} />
      <label htmlFor="">Username</label>
      <input type="text" name="username" defaultValue={"root"} />
      <label htmlFor="">Password</label>
      <input type="password" name="password" />
      <button>Submit</button>
      <label id="res"></label>
    </form>
  </>
  );
}

export default Login;
