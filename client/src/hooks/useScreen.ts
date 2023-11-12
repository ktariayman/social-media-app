import { useEffect, useRef, useState } from 'react';

const useFullScreen = () => {
 const fullScreenRef = useRef<any>(null);
 const [isFullScreen, setIsFullScreen] = useState(false);

 const openFullscreen = () => {
  let elem = document.documentElement;
  if (elem.requestFullscreen) {
   elem.requestFullscreen();
  }
 };

 const closeFullscreen = () => {
  if (document.exitFullscreen) {
   document.exitFullscreen();
  }
 };

 const toggleFullScreen = () => {
  setIsFullScreen((prevFullScreen) => !prevFullScreen);
 };

 useEffect(() => {
  if (isFullScreen) {
   openFullscreen();
  } else {
   closeFullscreen();
  }
 }, [isFullScreen]);

 return { fullScreenRef, isFullScreen, toggleFullScreen, openFullscreen, closeFullscreen };
};

export default useFullScreen;
