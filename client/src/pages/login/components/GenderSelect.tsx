import { useMediaQuery } from 'react-responsive';
function GenderSelect({ handleRegisterChange, genderError }: any) {
  const view3 = useMediaQuery({
    query: '(min-width: 1170px)'
  });
  return (
    <div className='reg_grid' style={{ display: 'flex', marginBottom: `${genderError && !view3 ? '70px' : '0'}` }}>
      <label htmlFor='male' style={{ width: '100%' }}>
        Male
        <input type='radio' name='gender' id='male' value='male' onInput={handleRegisterChange} />
      </label>
      <label htmlFor='female' style={{ width: '100%' }}>
        Female
        <input
          type='radio'
          name='gender'
          id='female'
          value='female'
          onInput={handleRegisterChange}
        />
      </label>
      {genderError && (
        <div className={!view3 ? 'input_error' : 'input_error input_error_select_large'}>
          <div className={!view3 ? 'error_arrow_bottom' : 'error_arrow_left'}></div>
          {genderError}
        </div>
      )}
    </div>
  );
}
export default GenderSelect;
