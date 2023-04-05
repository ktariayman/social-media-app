import React, { useRef } from 'react';
import Header from '../../components/header';
import SideBar from '../../components/home/sidebar';
import { useSelector } from 'react-redux';
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories';
import './style.css';
function Home() {
  const middle = useRef(null);
  const { user } = useSelector((state: any) => ({ ...state }));
  return (
    <div className='home'>
      <Header page='home' />
      <SideBar user={user} />
      <RightHome user={user} />
      <div className='home_middle' ref={middle}>
        <Stories />
      </div>
    </div>
  );
}

export default Home;
