import HomeScreen from "../../components/HomeScreen";
import { Link } from "react-router-dom";
import { useState } from "react";
import useForm from "../../hooks/useForm";
import { useSignUp } from "../../services/auth";
import ReactLoading from "react-loading";

import {
  Main,
  SignupContainer,
  SignUpForm,
  ButtonContainer,
  LoadingContainer,
} from "./SignupStyles";

export default function Signup() {
  const signUp = useSignUp();
  const { form, handleForm } = useForm({
    email: "",
    password: "",
    name: "",
    imageUrl: "",
  });

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  function createRegister(e) {
    e.preventDefault();

    if (!form.email || !form.password || !form.name || !form.imageUrl) {
      alert("Please fill in all required fields.");
      return;
    }

    setDisabled(true);
    setLoading(true);
    signUp(form);
  }

  return (
    <Main>
      <HomeScreen />
      <SignupContainer>
        <SignUpForm onSubmit={createRegister}>
          <input
            data-test="email"
            placeholder="e-mail"
            type="email"
            name="email"
            value={form.email}
            onChange={handleForm}
            disabled={disabled}
          />
          <input
            data-test="password"
            placeholder="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleForm}
            disabled={disabled}
          />
          <input
            data-test="username"
            placeholder="username"
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleForm}
            disabled={disabled}
          />
          <input
            data-test="picture-url"
            placeholder="picture url"
            type="url"
            required
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleForm}
            disabled={disabled}
          />
          <ButtonContainer>
            <button data-test="sign-up-btn" type="submit" disabled={disabled}>
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
              {loading ? "" : "Sign Up"}
            </button>
          </ButtonContainer>
          <Link data-test="login-link" to={"/"}>
            Switch back to log in
          </Link>
        </SignUpForm>
      </SignupContainer>
    </Main>
  );
}
