import React, { useRef, useState } from 'react';
import { Header, CreateStory } from '../../components';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
function Storie({ setVisible, visible }: any) {
  const { user } = useSelector((state: any) => ({ ...state }));

  return (
    <>
      <Header storyVisible={true} />
      <CreateStory user={user} />
    </>
  );
}

export default Storie;
