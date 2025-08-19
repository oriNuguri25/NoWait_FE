import loginLogo from "../../assets/login_logo.svg";
import { useState } from "react";
import { usePostLoginMutation } from "../../hooks/usePostAdminLogin.tsx";
import { useNavigate } from "react-router";
import { HalfLabelInput } from "./components/HalfLabelInput.tsx";
import { isAxiosError } from "axios";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const loginMutation = usePostLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(
      { email: id, password: pw },
      {
        onSuccess: (res) => {
          const token = res.data.response.body.accessToken;
          const storeId = res.data.response.body.storeId;

          localStorage.setItem("adminToken", token);
          localStorage.setItem("storeId", storeId);
          navigate("/admin");
        },
        onError: (err) => {
          console.log("인증에러");
          if (isAxiosError(err)) {
            console.log(err, "로그인 에러 객체");

            setError("아이디 또는 비밀번호를 다시 확인해주세요.");
            return;
          } else {
            setError("아이디 또는 비밀번호를 다시 확인해주세요.");
            return;
          }
        },
      }
    );
  };
  console.log(error, "에러메세지");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-white">
      {/* Logo */}
      <div className="mb-10 flex flex-col items-center">
        <img src={loginLogo} alt="노웨잇 로그인 로고" />
        <span></span>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-3"
      >
        <HalfLabelInput
          label="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          autoComplete="username"
        />
        <HalfLabelInput
          label="비밀번호"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoComplete="current-password"
        />
        {error.length > 0 && (
          <div className="w-[330px]">
            <span className="pl-5 self-start mt-[10px] text-primary text-14-regular">
              {error}
            </span>
          </div>
        )}
        {/* Login Button */}
        <button
          type="submit"
          disabled={!id || !pw}
          className={`fixed w-[576px] bottom-[30px] mt-8 h-[52px] rounded-[12px] text-17-semibold cursor-not-allowed transition-all duration-300 ease-in-out ${
            id && pw
              ? "cursor-pointer bg-black-100 text-white-100"
              : "cursor-not-allowed bg-black-25 text-black-55"
          } [@media(max-width:431px)]:w-[325px]`}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
