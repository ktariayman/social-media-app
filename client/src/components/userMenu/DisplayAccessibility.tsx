import { useSelector } from 'react-redux';
import { useTheme } from '../../hooks';
import { useFullScreen } from '../../hooks';
type Props = {
  setVisible: (show: number) => void;
}
function DisplayAccessibility({ setVisible }: Props) {
  return (
    <div className='absolute_wrap'>
      <DisplayAccessibilityHeader setVisible={setVisible} />
      <ThemeMode />
      <ScreenMode />
      <KeyboardMode />
    </div>
  );
}
export default DisplayAccessibility;



const ScreenMode = () => {
  const { fullScreenRef, isFullScreen, toggleFullScreen, openFullscreen, closeFullscreen } = useFullScreen()
  return (
    <>
      <div className='mmenu_main'>
        <div className='small_circle' style={{ width: '50px' }} onClick={toggleFullScreen}>
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
        onClick={closeFullscreen}
      >
        <span>Off</span>
        {isFullScreen ? (
          <input type='radio' name='compact' id='compactOff' />
        ) : (
          <input type='radio' name='compact' id='compactOff' checked />
        )}
      </label>
      <label htmlFor='compactOn' className='hover1' onClick={openFullscreen}>
        <span>On</span>
        {isFullScreen ? (
          <input type='radio' name='compact' id='compactOn' checked />
        ) : (
          <input type='radio' name='compact' id='compactOn' />
        )}

      </label>
    </>
  )
};

const ThemeMode = () => {
  const { darkTheme } = useSelector((state: any) => ({ ...state }));
  const { onDark, onLight, onSwitch } = useTheme()
  return (
    <>
      <div className='mmenu_main'>
        <div className='small_circle' style={{ width: '50px' }}
          onClick={onSwitch}
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
            Adjust the appearance of Devbook to reduce glare and give your eyes a break.
          </span>
        </div>
      </div>
      <label
        htmlFor='darkOff'
        className='hover1'
        onClick={onLight}
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
        onClick={onDark}
      >
        <span>On</span>
        {darkTheme ? (
          <input type='radio' name='dark' id='darkOn' checked />
        ) : (
          <input type='radio' name='dark' id='darkOn' />
        )}
      </label></>
  )
};

const KeyboardMode = () => {
  return (
    <div className='mmenu_item hover3'>
      <div className='small_circle'>
        <i className='keyboard_icon'></i>
      </div>
      <span>Keyboard</span>
      <div className='rArrow'>
        <i className='right_icon'></i>
      </div>
    </div>
  )
};

const DisplayAccessibilityHeader = ({ setVisible }: Props) => {
  return (
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
  )
};

