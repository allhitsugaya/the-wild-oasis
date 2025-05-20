import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBookings from '../bookings/useBookings.js';
import Spinner from '../../ui/Spinner.jsx';
import { useBooking } from '../bookings/useBooking.js';
import { useEffect, useState } from 'react';
import Checkbox from '../../ui/Checkbox.jsx';
import { formatCurrency } from '../../utils/helpers.js';
import { useCheckin } from './useCheckin.js';
import { useSettings } from '../settings/useSettings.js';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const {booking, isLoading} = useBooking();
  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking])
  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();

  const {isCheckingIn, checkin} = useCheckin()
  const { settings , isLoading: isLoadingSettings } = useSettings()
if(isLoading || isLoadingSettings) return <Spinner/>;



  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    if(!confirmPaid) return ;

if(addBreakfast) {
  checkin({bookingId, breakfast: {hasBreakfast: true,
    extrasPrice: optionalBreakfastPrice,
      totalPrice: totalPrice + optionalBreakfastPrice,
    }});
}
else{
  checkin({ bookingId, breakfast:{} })
}


  }
  const optionalBreakfastPrice = settings.breakfastPrice = numNights * numGuests

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && <Box>
        <Checkbox checked={addBreakfast} onChange={() => {
          setAddBreakfast((prev) => !prev);
          setConfirmPaid(false);
        }} id="breakfast">
          Want to add breakfast for {optionalBreakfastPrice}?
        </Checkbox>
      </Box>}


      <Box>
        <Checkbox
        checked={confirmPaid}
        onChange={() => setConfirmPaid((confirm) => !confirm)}
        disabled={confirmPaid || isCheckingIn}
        id='confirm'
        >
          I confirm that  {guests.fullName} has paid
        the total amount of {!addBreakfast ? formatCurrency(totalPrice): `${formatCurrency(totalPrice + optionalBreakfastPrice)} +(${formatCurrency(optionalBreakfastPrice)} + ${formatCurrency(totalPrice)}) )`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button  disabled={!confirmPaid || isCheckingIn} variation="primary" size='large' onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary"  size='large' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
