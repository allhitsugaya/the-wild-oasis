import React from 'react';
import Stat from './Stat.jsx';
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers.js';

 export default function Stats({bookings, confirmedStays, numDays, cabins}) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0
  )
  const totalCheckIns = confirmedStays.length;

  const occupation =  confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0 ) / (numDays * cabins.length );
  return <>
      <Stat title='bookings' color='blue' icon={<HiOutlineBriefcase/>} value={numBookings} />
      <Stat title='Sales' color='green' icon={<HiOutlineBanknotes/>} value={formatCurrency(sales)} />
      <Stat title='Check Ins' color='indigo' icon={<HiOutlineCalendarDays/>} value={totalCheckIns} />
      <Stat title='Occupansy' color='yellow' icon={<HiOutlineChartBar/>} value={Math.round(occupation * 100) + '%'} />
    </>
}



// function Stats({ bookings, confirmedStays, numDays, cabins }) {
//   // 1.
//   const numBookings = bookings.length;
//
//   // 2.
//   const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
//
//   // 3.
//   const checkins = confirmedStays.length;
//
//   const cabinCount = cabins.length
//   // 4.
//   const occupation =
//     confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
//     (numDays * cabins.length);
//   // num checked in nights / all available nights (num days * num cabins)
//
//   return (
//     <>
//       <Stat
//         title="Bookings"
//         color="blue"
//         icon={<HiOutlineBriefcase />}
//         value={numBookings}
//       />
//       <Stat
//         title="Sales"
//         color="green"
//         icon={<HiOutlineBanknotes />}
//         value={formatCurrency(sales)}
//       />
//       <Stat
//         title="Check ins"
//         color="indigo"
//         icon={<HiOutlineCalendarDays />}
//         value={checkins}
//       />
//       <Stat
//         title="Occupancy rate"
//         color="yellow"
//         icon={<HiOutlineChartBar />}
//         value={Math.round(occupation * 100) + "%"}
//       />
//     </>
//   );
// }
//
// export default Stats;
