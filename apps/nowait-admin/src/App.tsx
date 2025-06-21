import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Card } from "@repo/ui/card";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center mb-8">
          <a href="https://vite.dev" target="_blank" className="mr-4">
            <img
              src={viteLogo}
              className="h-24 w-24 hover:drop-shadow-[0_0_2em_#646cffaa] transition-all duration-300"
              alt="Vite logo"
            />
          </a>
          <a href="https://react.dev" target="_blank" className="ml-4">
            <img
              src={reactLogo}
              className="h-24 w-24 hover:drop-shadow-[0_0_2em_#61dafbaa] transition-all duration-300 animate-spin-slow"
              alt="React logo"
            />
          </a>
        </div>

        <h1 className="text-4xl font-bold text-white text-center mb-8 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        <div className="text-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 inline-block border border-white/20">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              관리자 카운트: {count}
            </button>
            <p className="text-gray-300 mt-4">
              Edit{" "}
              <code className="bg-gray-800 px-2 py-1 rounded text-yellow-400">
                src/App.tsx
              </code>{" "}
              and save to test HMR
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card
            title="사용자 관리"
            href="https://github.com/vercel/turborepo"
            variant="blue"
          >
            시스템 사용자들을 관리하고 권한을 설정합니다
          </Card>

          <Card title="데이터 분석" href="https://react.dev" variant="green">
            실시간 데이터 분석과 통계를 확인합니다
          </Card>

          <Card
            title="시스템 설정"
            href="https://tailwindcss.com"
            variant="purple"
          >
            애플리케이션의 전반적인 설정을 관리합니다
          </Card>

          <Card title="보안 관리" href="https://vite.dev" variant="pink">
            보안 정책과 로그를 모니터링합니다
          </Card>

          <Card
            title="백업 관리"
            href="https://typescriptlang.org"
            variant="default"
          >
            데이터 백업과 복구 작업을 관리합니다
          </Card>

          <Card title="알림 센터" href="https://yarnpkg.com" variant="blue">
            시스템 알림과 메시지를 확인합니다
          </Card>
        </div>

        <p className="text-gray-400 text-center mt-12">
          관리자 대시보드에서 시스템을 효율적으로 관리하세요
        </p>
      </div>
    </div>
  );
}

export default App;
