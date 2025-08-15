import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg?react";
import Menu from "../assets/icon/menu.svg?react";
import Search from "../assets/icon/search.svg?react";
import Cancel from "../assets/icon/cancel.svg?react";
import Portal from "./common/modal/Portal";
import SearchModal from "./common/modal/SearchModal";

const HomeHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const handleBookmarkClick = () => {
    closeMenu();
    navigate("/bookmark");
  };

  const handleHomeClick = () => {
    closeMenu();
    navigate("/");
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직
    localStorage.removeItem("accessToken"); // 토큰 제거
    closeMenu();
    // 새로고침하여 로그인 상태 변경을 즉시 반영
    window.location.reload();
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center py-4 px-5 bg-white/80 backdrop-blur-[100px]">
        <Logo className="w-14.5 h-6" />
        <div className="flex flex-row gap-3">
          <button onClick={openSearch} className="cursor-pointer">
            <Search className="icon-m" />
          </button>
          <button onClick={toggleMenu} className="cursor-pointer">
            <Menu className="icon-m" />
          </button>
        </div>
      </div>

      {/* 전체 화면 메뉴 모달 */}
      <Portal>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-50 bg-[#222] flex items-center justify-center"
            >
              <div className="max-w-[430px] min-w-[360px] w-full h-screen bg-white mx-auto flex flex-col">
                {/* 고정된 헤더 */}
                <div className="flex justify-between items-center pt-4 px-5 flex-shrink-0">
                  <Logo className="w-14.5 h-6" />
                  <button onClick={closeMenu} className="cursor-pointer">
                    <Cancel className="icon-m" />
                  </button>
                </div>

                {/* 슬라이드되는 메뉴 내용 */}
                <motion.div
                  initial={{ y: "-30px", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-30px", opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col justify-between flex-1 mt-16.5 px-5 pb-5 overflow-y-auto"
                >
                  {/* 메뉴 항목들 */}
                  <nav className="flex flex-col gap-5.5 w-full">
                    <motion.button
                      initial={{ y: -8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.15,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      onClick={handleHomeClick}
                      className="block w-full text-left text-title-20-semibold text-black-100"
                    >
                      홈
                    </motion.button>
                    <motion.button
                      initial={{ y: -8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.25,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      onClick={closeMenu}
                      className="block w-full text-left text-title-20-semibold text-black-100"
                    >
                      축제 맵
                    </motion.button>
                    <motion.button
                      initial={{ y: -8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.35,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      onClick={handleBookmarkClick}
                      className="block w-full text-left text-title-20-semibold text-black-100"
                    >
                      북마크
                    </motion.button>
                  </nav>

                  {/* 로그아웃 버튼 - 맨 하단에 배치 */}
                  <motion.button
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.45,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    onClick={handleLogout}
                    className="block w-full text-left text-title-20-semibold text-primary"
                  >
                    로그아웃
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>

      {/* 전체 화면 검색 모달 */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
};

export default HomeHeader;
