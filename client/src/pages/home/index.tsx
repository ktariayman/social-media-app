import React from 'react';
import Header from '../../components/header';
import SideBar from '../../components/home/sidebar';
import { useSelector } from 'react-redux';
import RightHome from '../../components/home/right';

function Home() {
  const { user } = useSelector((state: any) => ({ ...state }));
  return (
    <div>
      <Header page='home' />
      <SideBar user={user} />
      <RightHome user={user} />
    </div>
  );
}

export default Home;
