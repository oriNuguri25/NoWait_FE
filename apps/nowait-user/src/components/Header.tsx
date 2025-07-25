import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg?react";
import Menu from "../assets/icon/menu.svg?react";
import Search from "../assets/icon/search.svg?react";
import Cancel from "../assets/icon/cancel.svg?react";
import Portal from "./common/modal/Portal";

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

  return (
    <>
      <div className="flex justify-between items-center py-4">
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
              <div className="max-w-[430px] min-w-[360px] w-full h-full bg-white mx-auto">
                {/* 고정된 헤더 */}
                <div className="flex justify-between items-center pt-4 px-5">
                  <Logo className="w-14.5 h-6" />
                  <button onClick={closeMenu} className="cursor-pointer">
                    <Cancel className="icon-m" />
                  </button>
                </div>

                {/* 슬라이드되는 메뉴 내용 */}
                <motion.div
                  initial={{ y: "-100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col mt-16.5 px-5"
                >
                  {/* 메뉴 항목들 */}
                  <div className="flex w-full">
                    <nav className="flex flex-col gap-5.5 w-full">
                      <motion.button
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        onClick={handleHomeClick}
                        className="block w-full text-left text-title-20-semibold leading-[136%] tracking-[-0.01em] text-black-100"
                      >
                        홈
                      </motion.button>
                      <motion.button
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        onClick={closeMenu}
                        className="block w-full text-left text-title-20-semibold leading-[136%] tracking-[-0.01em] text-black-100"
                      >
                        축제 맵
                      </motion.button>
                      <motion.button
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.45 }}
                        onClick={handleBookmarkClick}
                        className="block w-full text-left text-title-20-semibold leading-[136%] tracking-[-0.01em] text-black-100"
                      >
                        북마크
                      </motion.button>
                    </nav>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>

      {/* 전체 화면 검색 모달 */}
      <Portal>
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-white px-5"
            >
              <div className="max-w-[430px] min-w-[360px] w-full h-full bg-white mx-auto">
                {/* 검색 헤더 */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4 pt-4 mb-10"
                >
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 icon-s text-black-60" />
                    <input
                      type="text"
                      placeholder="주점명, 메뉴, 학과 검색"
                      className="w-full h-12 pl-12 pr-4 bg-black-15 rounded-2xl text-16-regular text-black-60 placeholder:text-16-regular placeholder:text-black-50 focus:outline-none focus:border-primary"
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={closeSearch}
                    className="text-16-medium text-black-70"
                  >
                    닫기
                  </button>
                </motion.div>

                {/* 검색 내용 영역 */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex-1"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex text-16-bold leading-[144%] tracking-[-0.01em] text-black-90">
                      최근 검색
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex text-16-regular text-black-90">
                        스페이시스
                      </div>
                      <div className="flex">
                        <button className="flex">
                          <Cancel className="icon-xs text-black-60" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex text-16-regular text-black-90">
                        스페이시스
                      </div>
                      <div className="flex">
                        <button className="flex">
                          <Cancel className="icon-xs text-black-60" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex text-16-regular text-black-90">
                        스페이시스
                      </div>
                      <div className="flex">
                        <button className="flex">
                          <Cancel className="icon-xs text-black-60" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export default HomeHeader;
