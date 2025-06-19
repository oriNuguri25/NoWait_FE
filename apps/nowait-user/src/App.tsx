import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Card } from "@repo/ui/card";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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

        <h1 className="text-4xl font-bold text-white text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Vite + React Monorepo
        </h1>

        <div className="text-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 inline-block border border-white/20">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              count is {count}
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
            title="Turborepo"
            href="https://github.com/vercel/turborepo"
            variant="purple"
          >
            모노레포 도구체인으로 여러 패키지를 효율적으로 관리합니다
          </Card>

          <Card title="React" href="https://react.dev" variant="blue">
            사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리
          </Card>

          <Card
            title="Tailwind CSS"
            href="https://tailwindcss.com"
            variant="green"
          >
            유틸리티 퍼스트 CSS 프레임워크로 빠른 UI 개발
          </Card>

          <Card title="Vite" href="https://vite.dev" variant="pink">
            빠른 빌드 도구로 개발 경험을 향상시킵니다
          </Card>

          <Card
            title="TypeScript"
            href="https://typescriptlang.org"
            variant="default"
          >
            타입 안정성을 제공하는 JavaScript의 상위 집합
          </Card>

          <Card title="Yarn Berry" href="https://yarnpkg.com" variant="purple">
            모던 패키지 매니저로 워크스페이스를 효율적으로 관리
          </Card>
        </div>

        <p className="text-gray-400 text-center mt-12">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
