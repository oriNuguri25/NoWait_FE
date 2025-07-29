import { useLocation } from "react-router-dom";

export const useTransitionSelect = () => {
  const location = useLocation();
  const previousPath = sessionStorage.getItem('path');

  const previousPage = previousPath || '';
  const currentPage = location.pathname;

  sessionStorage.setItem('path', location.pathname);

  if (currentPage === 'passwordPage') {
    return '';
  }
  if (currentPage === 'spaceListPage') {
    if (previousPage === 'passwordPage') return '';
    return 'slide-left';
  }
  if (currentPage === 'jobListPage') {
    if (previousPage === 'spaceListPage') {
      return 'slide-right';
    }
    if (previousPage === 'taskListPage') {
      return 'left';
    }
  }
  if (currentPage === 'taskListPage') {
    return 'right';
  }

  return '';
};