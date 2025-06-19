import { type ReactNode } from "react";

export function Card({
  title,
  children,
  href,
  variant = "default",
}: {
  title: string;
  children: ReactNode;
  href: string;
  variant?: "default" | "purple" | "blue" | "green" | "pink";
}) {
  const variants = {
    default: "from-gray-900 to-gray-800 border-gray-700 hover:border-gray-600",
    purple:
      "from-purple-900 to-indigo-900 border-purple-700 hover:border-purple-600",
    blue: "from-blue-900 to-cyan-900 border-blue-700 hover:border-blue-600",
    green:
      "from-emerald-900 to-teal-900 border-emerald-700 hover:border-emerald-600",
    pink: "from-pink-900 to-rose-900 border-pink-700 hover:border-pink-600",
  };

  return (
    <a
      className={`
        group relative block p-6 rounded-xl border
        bg-gradient-to-br ${variants[variant]}
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:-translate-y-1
        backdrop-blur-sm bg-opacity-50
      `}
      href={`${href}?utm_source=create-turbo&utm_medium=with-tailwind&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
    >
      {/* 배경 글로우 효과 */}
      <div
        className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20
        bg-gradient-to-r ${
          variants[variant].includes("purple")
            ? "from-purple-400 to-pink-400"
            : variants[variant].includes("blue")
            ? "from-blue-400 to-cyan-400"
            : variants[variant].includes("green")
            ? "from-emerald-400 to-teal-400"
            : variants[variant].includes("pink")
            ? "from-pink-400 to-rose-400"
            : "from-gray-400 to-gray-600"
        }
        blur-xl transition-opacity duration-300
      `}
      />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          {title}{" "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 group-hover:text-yellow-400">
            →
          </span>
        </h2>

        <p className="text-gray-300 leading-relaxed text-sm max-w-[30ch]">
          {children}
        </p>

        {/* 하단 장식 라인 */}
        <div
          className={`
          mt-4 h-1 w-12 rounded-full
          bg-gradient-to-r ${
            variants[variant].includes("purple")
              ? "from-purple-400 to-pink-400"
              : variants[variant].includes("blue")
              ? "from-blue-400 to-cyan-400"
              : variants[variant].includes("green")
              ? "from-emerald-400 to-teal-400"
              : variants[variant].includes("pink")
              ? "from-pink-400 to-rose-400"
              : "from-gray-400 to-gray-600"
          }
          group-hover:w-20 transition-all duration-300
        `}
        />
      </div>

      {/* 코너 장식 */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
    </a>
  );
}
