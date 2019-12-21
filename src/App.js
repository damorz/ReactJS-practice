import React from "react";
import logo from "./logo.svg";
import "./App.css";
import moment from "moment";
import Input from "./Input";
import axios from "axios";

const subject = ["Angular", "React", "Golang"];
const targetDate = moment("12/21/2019 23:00:00");

function App() {
  const [name, setName] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [sub, setSub] = React.useState("");
  const [ischecked, setIschecked] = React.useState(false);
  const [timer, setTime] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isloading,setIsloading] = React.useState(false);

  const cancel = () => {
    setMessage("Cancel complete");
    setName("");
    setSub("");
    setMail("");
  };

  const handleSubmit = () => {
    setIsloading(true);

    axios.get("http://www.mocky.io/v2/5dfde561310000ed1ac96e39?mocky-delay=4000ms&fbclid=IwAR1Z3N9uw864v3gx3LHORdytr0T88ZjwbVspnfg1oAVmMClI9eWVnLTsV9A")
    .then(response => {
      const {data} = response;
      setMessage(data.response);
      setIsloading(false);
    });


    
  };

  const updateTimer = () => {
    const diffHours = targetDate.diff(moment(), "hours");
    const diffmins = targetDate.diff(moment(), "minutes") % 60;
    const diffsecs = targetDate.diff(moment(), "seconds") % 60;
    setTime(
      diffHours + " hours " + diffmins + " minutes " + diffsecs + " second "
    );
    console.log(diffHours);
    console.log(diffmins);
    console.log(diffsecs);
  };

  React.useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  console.log("State: ", { name, mail, sub, ischecked });
  return (
    <div className="App">
      <div className="title"> Season Change Workshop Registration form</div>
      <p>Form end in : {timer}</p>

      <Input
        label="Name"
        value={name}
        placeholder = "Your name"
        onChangeFromComponent={value => setName(value)}
      />

      <Input
        label="Email"
        value={mail}
        placeholder = "Your Email"
        onChangeFromComponent={value => setMail(value)}
      />

      <div className="field">
        <label className="label">Subject</label>
        <div className="control">
          <div className="select">
            <select value={sub} onChange={event => setSub(event.target.value)}>
              {subject.map(subject => (
                <option key={subject}> {subject} </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              type="checkbox"
              value={ischecked}
              onChange={event => setIschecked(event.target.checked)}
            />
            I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className={`button is-link ${isloading && "is-loading"}`} onClick={handleSubmit} disabled={isloading}>
            Submit
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light" onClick={cancel}>Cancel</button>
        </div>
      </div>
      <p className="submitsuccess" > {message}</p>
    </div>
  );
}

function button() {}

export default App;
