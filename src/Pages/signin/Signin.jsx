import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import HomeScreen from "../../components/HomeScreen";
import ReactLoading from "react-loading";
import useForm from "../../hooks/useForm";
import { useLogin } from "../../services/auth";
import {
  Main,
  SignupContainer,
  SignUpForm,
  ButtonContainer,
  LoadingContainer,
  InputContainer,
} from "./SigninStyles";

export default function Signin() {
  const login = useLogin();
  const { form, handleForm } = useForm({ email: "", password: "" });

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  function submitForm(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill in both email and password fields.");
      return;
    }

    setDisabled(true);
    setLoading(true);
    login({ email: form.email, password: form.password });
  }

  return (
    <Main>
      <HomeScreen />
      <SignupContainer>
        <SignUpForm onSubmit={submitForm}>
          <InputContainer>
            <input
              data-test="email"
              placeholder="e-mail"
              type="email"
              name="email"
              value={form.email}
              onChange={handleForm}
              disabled={disabled}
            />
          </InputContainer>
          <InputContainer>
            <input
              data-test="password"
              placeholder="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleForm}
              disabled={disabled}
            />
          </InputContainer>
          <ButtonContainer>
            <button data-test="login-btn" type="submit" disabled={disabled}>
              {loading && (
                <LoadingContainer>
                  <ReactLoading
                    type="spin"
                    color="#ffffff"
                    height={40}
                    width={40}
                  />
                </LoadingContainer>
              )}
              {loading ? "" : "Log In"}
            </button>
          </ButtonContainer>
          <Link data-test="sign-up-link" to={"/sign-up"}>
            First time? Create an account!
          </Link>
        </SignUpForm>
      </SignupContainer>
    </Main>
  );
}
