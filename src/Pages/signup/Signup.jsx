import HomeScreen from "../../components/HomeScreen";
import { Link } from "react-router-dom";
import { useState } from "react";
import useForm from "../../hooks/useForm";
import { useSignUp } from "../../services/auth";

import { Main, SignupContainer, SignUpForm } from "./SignupStyles";
export default function Signup() {
  const signUp = useSignUp();
  const { form, handleForm } = useForm({
    email: "",
    password: "",
    name: "",
    imageUrl: "",
  });

  const [disabled, setDisabled] = useState(false);

  function createRegister(e) {
    e.preventDefault();
    setDisabled(true);
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
          <button
            data-test="sign-up-btn"
            type="submit"
            disabled={disabled}
            onClick={() => setDisabled(false)}
          >
            Sign Up
          </button>
          <Link data-test="login-link" to={"/"}>
            Switch back to log in
          </Link>
        </SignUpForm>
      </SignupContainer>
    </Main>
  );
}
