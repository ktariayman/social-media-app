import { useMediaQuery } from 'react-responsive';
type Props = {
  bDay: number;
  bMonth: number;
  bYear: number,
  days: number[];
  months: number[];
  years: number[];
  dateError: string;
  handleRegisterChange: any
}
function DateOfBirthSelect({
  bDay,
  bMonth,
  bYear,
  days,
  months,
  years,
  dateError,
  handleRegisterChange
}: Props) {
  const view1 = useMediaQuery({
    query: '(min-width: 539px)'
  });
  const view2 = useMediaQuery({
    query: '(min-width: 850px)'
  });
  const view3 = useMediaQuery({
    query: '(min-width: 1170px)'
  });
  return (
    <div className='reg_grid' style={{ marginBottom: `${dateError && !view3 ? '90px' : '0'}` }}>
      <select name='bDay' value={bDay} onChange={handleRegisterChange}>
        {days.map((day: number, i: number) => (
          <option value={day} key={i}>
            {day}
          </option>
        ))}
      </select>
      <select name='bMonth' value={bMonth} onChange={handleRegisterChange}>
        {months.map((month: number, i: number) => (
          <option value={month} key={i}>
            {month}
          </option>
        ))}
      </select>
      <select name='bYear' value={bYear} onChange={handleRegisterChange}>
        {years.map((year: number, i: number) => (
          <option value={year} key={i}>
            {year}
          </option>
        ))}
      </select>
      {
        dateError && (
          <div className={!view3 ? 'input_error' : 'input_error input_error_select_large'}>
            <div className={!view3 ? 'error_arrow_bottom' : 'error_arrow_left'}></div>
            {dateError}
          </div>
        )
      }
    </div >
  );
}

export default DateOfBirthSelect;
