import { useForm } from "react-hook-form";
import { useState } from "react";
import "./Auth.scss";
import "../../Form.scss";
import { Link, useNavigate } from "react-router-dom";
import FormWarning from "../FormWarning/FormWarning";
export default function ({ setAuthed, users }) {
  const [authState, setAuthState] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const isUserExists = users.find((user) => user.login === data.login);
    if (isUserExists) {
      setAuthed(true);
      navigate("/");
    } else {
      setAuthState("Провал! Пароль или пользователь не подходят!");
    }
  };
  return (
    <section className="auth">
      <h2>
        Для работы с сайтом необходима Авторизация. Войдите или{" "}
        <Link to="/register"> Зарегистрируйтесь</Link>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input {...register("login", { required: true })} placeholder="Логин" />
        {errors.login && <FormWarning text="Поле обязательно к заполнению" />}

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Пароль"
        />
        {errors.password && (
          <FormWarning text="Поле обязательно к заполнению" />
        )}
        {authState === "Провал! Пароль или пользователь не подходят!" && (
          <FormWarning text={authState} />
        )}
        <button className="btn">Авторизация</button>
      </form>
    </section>
  );
}
