import { useEffect } from 'react';

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | CyberShield AI`;
  }, [title]);
};

export default usePageTitle;
