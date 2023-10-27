import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
type Props = {
  setVisible: (show: number) => void;
}
function DisplayAccessibility({ setVisible }: Props) {
  const dispatch = useDispatch();
  const { darkTheme } = useSelector((state: any) => ({ ...state }));
  const fullScreenRef = useRef<any>(null)
  const [full, setFull] = useState(false)
  useEffect(() => {
    if (full) {
      openFullscreen()
    }
    else {
      closeFullscreen()
    }
  }, [full])

  function openFullscreen() {
    let elem = document.documentElement
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
  return (
    <div className='absolute_wrap'>
      <div className='absolute_wrap_header'>
        <div
          className='circle hover1'
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className='arrow_back_icon'></i>
        </div>
        Display & Accessibility
      </div>
      <div className='mmenu_main'>
        <div className='small_circle' style={{ width: '50px' }}
          onClick={() => {
            Cookies.set('darkTheme', darkTheme ? "true" : "false");
            dispatch({ type: darkTheme ? 'LIGHT' : "DARK" });
          }}
        >
          {darkTheme ?
            <img
              src={'https://th.bing.com/th/id/OIP.OKd2_1-lmLL-EPlqfLS_NQHaHa?pid=ImgDet&w=161&h=161&c=7'}
              width={20}

            />
            :
            <i className='dark_filled_icon'></i>

          }
        </div>
        <div className='mmenu_col'>
          <span className='mmenu_span1'>{darkTheme ? 'Dark Mode' : 'Light Mode'}</span>
          <span className='mmenu_span2'>
            Adjust the appearance of Facebook to reduce glare and give your eyes a break.
          </span>
        </div>
      </div>
      <label
        htmlFor='darkOff'
        className='hover1'
        onClick={() => {
          Cookies.set('darkTheme', 'false');
          dispatch({ type: 'LIGHT' });
        }}
      >
        <span>Off</span>
        {darkTheme ? (
          <input type='radio' name='dark' id='darkOff' />
        ) : (
          <input type='radio' name='dark' id='darkOff' checked />
        )}
      </label>
      <label
        htmlFor='darkOn'
        className='hover1'
        onClick={() => {
          Cookies.set('darkTheme', 'true');

          dispatch({ type: 'DARK' });
        }}
      >
        <span>On</span>
        {darkTheme ? (
          <input type='radio' name='dark' id='darkOn' checked />
        ) : (
          <input type='radio' name='dark' id='darkOn' />
        )}
      </label>
      <div className='mmenu_main'>
        <div className='small_circle' style={{ width: '50px' }} onClick={() => { setFull(!full) }}>
          <i className='compact_icon'></i>
        </div>
        <div className='mmenu_col' ref={fullScreenRef}>
          <span className='mmenu_span1'>Compact mode</span>
          <span className='mmenu_span2'>
            Make your font size smaller so more content can fit on the screen.
          </span>
        </div>
      </div>
      <label htmlFor='compactOff' className='hover1'
      >
        <span>Off</span>
        <input type='radio' name='compact' id='compactOff' />
      </label>
      <label htmlFor='compactOn' className='hover1'
      >
        <span>On</span>
        <input type='radio' name='compact' id='compactOff' />
      </label>
      <div className='mmenu_item hover3'>
        <div className='small_circle'>
          <i className='keyboard_icon'></i>
        </div>
        <span>Keyboard</span>
        <div className='rArrow'>
          <i className='right_icon'></i>
        </div>
      </div>
    </div>
  );
}
export default DisplayAccessibility;
