import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings.js';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import booking from '../../pages/Booking.jsx';

export function useCheckin() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate: checkin, isLoading:isCheckingIn} = useMutation({
    mutationFn: ({ bookingId , breakfast })=> updateBooking(bookingId,
  {
    status: 'checked-in',
      isPaid: true,
    ...breakfast,
  }),
    onSuccess: (data)=>{
      toast.success(`Booking #${data.id} successfully checked in!`);
      queryClient.invalidateQueries({active: true});
      navigate('/');
    },
    onError: error => toast.error(error.message),

  });

  return {checkin, isCheckingIn};
}