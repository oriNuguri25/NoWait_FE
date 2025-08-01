import { useState, useRef, useEffect } from "react";
import jsQR from "jsqr";
import banner from "../../../assets/booth/banner.svg";
import RedBadge from "../../../components/RedBadge";
import naverLogo from "../../../assets/booth/naverLogo.svg";
import kakaoLogo from "../../../assets/booth/kakaoLogo.svg";
import tossLogo from "../../../assets/booth/tossLogo.svg";
import { useGetStorePayment } from "../../../hooks/booth/payment/useGetStorePayment";
import { useCreateStorePayment } from "../../../hooks/booth/payment/useCreateStorePayment";
import { useUpdateStorePayment } from "../../../hooks/booth/payment/useUpdateStorePayment";

const AccountPage = () => {
  const [bank, setBank] = useState("IBK 기업");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const { data: storePayment, isLoading: isFetching } = useGetStorePayment();
  const { mutate: createPayment } = useCreateStorePayment();
  const { mutate: updatePayment } = useUpdateStorePayment();

  const handleSave = () => {
    const payload = {
      tossUrl: urls.toss,
      kakaoPayUrl: urls.kakao,
      naverPayUrl: urls.naver,
      accountNumber: bank + " " + accountName + " " + accountNumber,
    };

    if (!storePayment) {
      // 결제 정보 없음 → 생성
      createPayment(payload, {
        onSuccess: () => alert("결제 정보가 생성되었습니다."),
        onError: () => alert("결제 정보 생성 실패"),
      });
    } else {
      // 이미 있음 → 수정
      updatePayment(payload, {
        onSuccess: () => alert("결제 정보가 수정되었습니다."),
        onError: () => alert("결제 정보 수정 실패"),
      });
    }
  };

  // 각 결제수단별 입력값 관리
  const [urls, setUrls] = useState<{ [key: string]: string }>({
    kakao: "",
    toss: "",
    naver: "",
  });

  type PaymentId = "kakao" | "toss" | "naver";

  const paymentOptions: {
    id: PaymentId;
    name: string;
    logo: string;
    placeholder: string;
  }[] = [
    {
      id: "kakao",
      name: "카카오페이",
      logo: kakaoLogo,
      placeholder: "https://qr.kakaopay.com/",
    },
    {
      id: "toss",
      name: "토스",
      logo: tossLogo,
      placeholder: "supertoss://send",
    },
    {
      id: "naver",
      name: "네이버페이",
      logo: naverLogo,
      placeholder: "https://new-m.pay.naver.com/",
    },
  ];

  const fileInputs: Record<
    PaymentId,
    React.RefObject<HTMLInputElement | null>
  > = {
    kakao: useRef<HTMLInputElement | null>(null),
    toss: useRef<HTMLInputElement | null>(null),
    naver: useRef<HTMLInputElement | null>(null),
  };
  const [loading, setLoading] = useState(false);

  const handleButtonClick = (id: PaymentId) => {
    fileInputs[id].current?.click();
  };

  const handleQrUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: PaymentId
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, img.width, img.height);

        if (code) {
          setUrls((prev) => ({ ...prev, [id]: code.data }));
        } else {
          alert("QR 코드를 인식할 수 없습니다.");
        }
        setLoading(false);
      };
      if (e.target?.result) {
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (storePayment) {
      console.log(storePayment, "결제 정보");

      setUrls({
        kakao: storePayment.response.kakaoPayUrl || "",
        toss: storePayment.response.tossUrl || "",
        naver: storePayment.response.naverPayUrl || "",
      });
      setAccountName(storePayment.response.accountName || "");
      setAccountNumber(storePayment.response.accountNumber || "");
    }
  }, [storePayment]);

  return (
    <div>
      {/* Guide Banner */}
      <div className="my-10">
        <img src={banner} alt="배너" />
      </div>

      {/* QR Code Section */}
      <section>
        <h2 className="flex items-center text-navy-80 text-18-bold gap-[6px]">
          간편 송금 QR코드 <RedBadge label="필수" small={true} />
        </h2>
        <p className="text-14-regular text-black-60 mt-[14px] mb-[30px]">
          카카오페이, 토스, 네이버페이에서 발급한 QR코드를 등록하면 사용자가
          계좌번호 입력 없이 바로 이체할 수 있어요
        </p>

        <div className="space-y-[20px] w-full">
          {paymentOptions.map((option) => (
            <div
              key={option.id}
              className="flex w-full items-center gap-[10px]"
            >
              <div className="flex items-center gap-[8px] w-[130px]">
                <img
                  src={option.logo}
                  alt={option.name}
                  className="w-[38px] h-[38px] rounded-full"
                />
                <span className="text-14-semibold">{option.name}</span>
              </div>
              <div className="flex h-[52px] w-[474px] items-center bg-black-5 rounded-xl border border-[#dddddd] pl-4 pr-[10px] py-4">
                <input
                  type="text"
                  value={urls[option.id]}
                  onChange={(e) =>
                    setUrls((prev) => ({
                      ...prev,
                      [option.id]: e.target.value,
                    }))
                  }
                  placeholder={option.placeholder}
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700"
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputs[option.id]}
                  className="hidden"
                  onChange={(e) => handleQrUpload(e, option.id)}
                />
                <button
                  disabled={loading}
                  className={`text-black-80 text-12-bold rounded-[6px] p-[10px] ${
                    loading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-black-30 hover:bg-gray-300"
                  }`}
                  onClick={() => handleButtonClick(option.id)}
                >
                  {loading ? "인식 중..." : "이미지로 업로드"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Account Section */}
      <section className="my-[60px]">
        <h2 className="text-navy-80 text-18-bold mb-[20px]">입금받을 계좌</h2>
        <div className="flex space-x-[10px]">
          <select
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="w-1/4 border border-[#dddddd] rounded-md p-4 text-black-70 text-14-regular rounded-xl"
          >
            <option>IBK 기업</option>
            <option>신한은행</option>
            <option>국민은행</option>
            <option>하나은행</option>
          </select>
          <input
            type="text"
            placeholder="예금주 이름"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-1/4 border border-[#dddddd] bg-black-5 text-black-90 rounded-xl p-4"
          />
          <input
            type="text"
            placeholder="계좌번호"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-1/2 border border-[#dddddd] bg-black-5 text-black-90 rounded-xl p-4"
          />
        </div>
      </section>

      <button
        onClick={handleSave}
        className="w-full py-4 bg-black-25 text-black-55 rounded-[8px] text-14-semibold"
      >
        저장하기
      </button>
    </div>
  );
};

export default AccountPage;
