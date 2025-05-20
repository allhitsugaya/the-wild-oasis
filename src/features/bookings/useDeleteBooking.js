import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingAPI, getBookings } from '../../services/apiBookings.js';
import toast from 'react-hot-toast';

export function useDeleteBooking() {
  const queryClient = useQueryClient()
  const {isLoading: isDeletingBooking, mutate: deleteBooking} = useMutation({
    mutationFn: (id) => deleteBookingAPI(id),
    onSuccess: ()=>{
      toast.success('Booking successfully deleted!');
      queryClient.invalidateQueries({
        queryKey: ['booking'],
        queryFn: getBookings,
      })
    },
    onError: error => toast.error(error.message || "Could not delete booking")
  })
  return {isDeletingBooking, deleteBooking}
}

