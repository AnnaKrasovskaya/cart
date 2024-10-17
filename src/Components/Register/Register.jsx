import { useForm } from "react-hook-form";
import "../Auth/Auth.scss";
import "../../Form.scss";
import { Link, useNavigate } from "react-router-dom";
import FormWarning from "../FormWarning/FormWarning";
import { useState } from "react";

export default function ({ setUsers, users }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [registrationStatus, setRegistrationStatus] = useState("");

  const onSubmit = (data) => {
    const currentUsers = [...users];
    const isUserExists = currentUsers.find((user) => user.login === data.login);
    if (isUserExists) {
      setRegistrationStatus("Провал! Пользователь уже существует");
    } else {
      currentUsers.push({
        login: data.login,
        password: data.password,
      });
      setUsers(currentUsers);
      setRegistrationStatus("Успешная регистрация!");
      navigate("/auth");
    }
  };

  return (
    <section className="auth">
      <h2>
        Регистрация аккаунта. Если есть аккаунт{" "}
        <Link to={"/auth"}>Войдите</Link>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input {...register("login", { required: true })} placeholder="Логин" />
        {errors.login && (
          <FormWarning text={"Поле Логин не должно быть пустым!"} />
        )}

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Пароль"
        />
        {errors.password && (
          <FormWarning text={"Поле пароль обязательно к заполнению!"} />
        )}
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Поле повторного пароля обязательно к заполнению!",
            validate: (value, formValues) => {
              return formValues.password === value || "Пароли не совпадают";
            },
          })}
          placeholder="Повторите пароль"
        />
        {errors.confirmPassword && (
          <FormWarning text={errors.confirmPassword.message} />
        )}

        <button className="btn">Регистрация</button>
        {registrationStatus === "Провал! Пользователь уже существует" && (
          <FormWarning text={registrationStatus} />
        )}
        {registrationStatus === "Успешная регистрация!" && (
          <>
            <FormWarning text={registrationStatus} type="success" />{" "}
            <Link to={"/auth"}>Войдите прямо сейчас</Link>
          </>
        )}
      </form>
    </section>
  );
}
