import React, { useEffect, useRef, useState } from "react";
import { register } from "../Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import loginPicture1 from "../images/formPicture.jpg";
import loginPicture2 from "../images/register.jpg";
import Message from "../Components/Message";
import vmsg from "vmsg";

const LoginPage = () => {
  const registeredUser = useSelector((state) => state.registered);

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const [registerCredentials, setRegisterCredentials] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [show, setShow] = useState("");

  const [voiceMedia, setVoiceMedia] = useState({
    isLoading: false,
    isRecording: false,
    recordings: [],
  });

  const recorder = new vmsg.Recorder({
    wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm",
  });

  const record = async () => {
    setVoiceMedia((prev) => {
      return { ...prev, isLoading: true };
    });
    if (voiceMedia.isRecording) {
      const blob = await recorder.stopRecording();

      setVoiceMedia((previous) => {
        return {
          isLoading: false,
          isRecording: false,
          recordings: [...previous.recordings, URL.createObjectURL(blob)],
        };
      });
    } else {
      try {
        await recorder.initAudio();
        await recorder.initWorker();
        recorder.startRecording();
        setVoiceMedia((previous) => {
          return { ...previous, isLoading: false, isRecording: true };
        });
      } catch (e) {
        console.error(e);
        setVoiceMedia((previous) => {
          return { ...previous, isLoading: false };
        });
      }
    }
  };
  const dispatch = useDispatch();

  const loginPage = useRef(null);
  const section = useRef(null);

  const toggleClass = () => {
    loginPage.current.classList.toggle("active");
    section.current.classList.toggle("active");
  };

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const handleRegisterInput = (e) => {
    const { name, value } = e.target;
    setRegisterCredentials((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const handlesRegisterValidation = () => {
    if (
      registerCredentials.name.trim() !== "" &&
      registerCredentials.email.trim() !== "" &&
      registerCredentials.password.trim() !== "" &&
      registerCredentials.passwordConfirm.trim() !== ""
    )
      return true;
    else return false;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (handlesRegisterValidation()) {
      dispatch(register(registerCredentials));
    }
    //else {
    //     setClasses("show showAlert");
    //     setTimeout(() => {
    //       setClasses("");
    //     }, 1500);
    //   }
  };

  useEffect(() => {
    if (
      registeredUser.userInfo &&
      registeredUser.userInfo.status === "success"
    ) {
      toggleClass();
      setShow("notification-show show");
      const showNotification = setTimeout(() => {
        setShow("notification-show hide");
      }, 3000);
      const removeNotification = setTimeout(() => {
        setShow("");
      }, 5000);
      return () => {
        clearTimeout(showNotification);
        clearTimeout(removeNotification);
      };
    }
  }, [registeredUser]);

  return (
    <>
      <React.Fragment>
        <button disabled={voiceMedia.isLoading} onClick={() => record()}>
          {voiceMedia.isRecording ? "Stop" : "Record"}
        </button>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {voiceMedia.recordings.map((url) => (
            <li key={url}>
              <audio src={url} controls />
            </li>
          ))}
        </ul>
      </React.Fragment>
      <section ref={section}>
        <div className="loginPage wrap-container" ref={loginPage}>
          {/* <div className="form form__signInBox">
            <div className="form__imgBox">
              <img src={loginPicture1} alt="Login" />
            </div>
            <div className="form__formBox">
              <Message message="You have registred successfully" show={show} />
              <form>
                <h2>Login</h2>
                <input
                  type="email"
                  placeholder="E-mail"
                  name="email"
                  required
                  value={loginCredentials.email}
                  onChange={handleLoginInput}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={loginCredentials.password}
                  onChange={handleLoginInput}
                />
                <input type="submit" value="Login" />
                <p className="form__signup">
                  dont't have an account?
                  <a href="#register" onClick={toggleClass}>
                    {" "}
                    Register
                  </a>
                </p>
              </form>
            </div>
          </div> */}
          <div className="form form__signUpBox">
            <div className="form__formBox">
              <form onSubmit={handleRegisterSubmit}>
                <h2>Register</h2>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  required
                  value={registerCredentials.name}
                  onChange={handleRegisterInput}
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  name="email"
                  required
                  value={registerCredentials.email}
                  onChange={handleRegisterInput}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={registerCredentials.password}
                  onChange={handleRegisterInput}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="passwordConfirm"
                  required
                  value={registerCredentials.passwordConfirm}
                  onChange={handleRegisterInput}
                />
                <input value="Register" type="submit" />
                <p className="form__signin">
                  allready have an account?
                  <a onClick={toggleClass} href="#login">
                    {" "}
                    Login
                  </a>
                </p>
              </form>
            </div>
            {/* <div className="form__imgBox">
              <img src={loginPicture2} alt="Register" />
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
