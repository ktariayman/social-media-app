import React from 'react';
import { Dots, Feeling, Photo } from '../../svg';

function AddToYourPost({ setShowPrev, setPicker }: any) {
  return (
    <div className='addtoyourpost'>
      <div className='addto_text'>Add to your post</div>
      <div className='addto_icons'>
        <div
          className='post_header_right hover1'
          onClick={() => {
            setShowPrev(true);
          }}
        >
          <Photo color='#45bd62' />
        </div>

        <div className='post_header_right hover1' onClick={() => {
          setPicker((prev: any) => !prev);
        }}>
          <Feeling color='#f7b928' />
        </div>

        <div className='post_header_right hover1'>
          <Dots color='#65676b' />
        </div>
      </div>
    </div>
  );
}

export default AddToYourPost;
