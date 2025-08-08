import loginLogo from "../../assets/login_logo.svg";
import { useState } from "react";
import { usePostLoginMutation } from "../../hooks/usePostAdminLogin.tsx";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [isIdFocused, setIsIdFocused] = useState(false);
  const [isPwFocused, setIsPwFocused] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const loginMutation = usePostLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(id);
    console.log(pw);

    loginMutation.mutate(
      { email: id, password: pw },
      {
        onSuccess: (res) => {
          const token = res.data.response.body.accessToken;

          console.log(token, "내  토큰");

          localStorage.setItem("adminToken", token);
          navigate("/admin");
        },
        onError: (err) => {
          console.error("❌ 로그인 실패:", err);
          alert("로그인 실패. 아이디/비밀번호를 확인해주세요.");
        },
      }
    );
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-white">
      {/* Logo */}
      <div className="mb-10 flex flex-col items-center">
        <img src={loginLogo} alt="노웨잇 로그인 로고" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-3"
      >
        <div className="relative">
          <input
            type="text"
            placeholder={isIdFocused ? "" : "아이디"}
            onFocus={() => setIsIdFocused(true)}
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="peer w-[330px] h-[60px] px-4 border-[3px] border-[var(--black-35)] rounded-[12px] text-16-medium font-[500px] 
          focus:outline-none focus:ring-0 focus:border-[var(--primary)] focus:border-[3px] focus:placeholder-shown:none py-auto
          "
          />
          <label
            htmlFor="username"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black-40 text-14-regular transition-all duration-200
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
            peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-13-regular peer-focus:text-primary
            peer-valid:top-2 peer-valid:-translate-y-0 peer-valid:text-13-regular
          "
          >
            {isIdFocused ? "아이디" : ""}
          </label>
        </div>
        <div className="relative">
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onFocus={() => setIsPwFocused(true)}
            required
            placeholder={isPwFocused ? "" : "비밀번호"}
            className="peer w-[330px] h-[60px] px-4 border-[3px] border-[var(--black-35)] rounded-[12px] text-16-medium font-[500px] 
            focus:outline-none focus:ring-0 focus:border-[var(--primary)] focus:border-[3px] focus:placeholder-shown:none py-auto"
          />
          <label
            htmlFor="username"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black-40 text-[16px] transition-all duration-200
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
            peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-[14px] peer-focus:text-primary
            peer-valid:top-2 peer-valid:-translate-y-0 peer-valid:text-[14px]
          "
          >
            {isPwFocused ? "비밀번호" : ""}
          </label>
        </div>
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
