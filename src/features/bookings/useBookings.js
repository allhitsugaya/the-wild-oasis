import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings.js';
import { useSearchParams } from 'react-router-dom';

export  default  function useBookings ()  {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //filter

  const filterValue = searchParams.get('status');
  const filter = !filterValue || filterValue === 'true' || filterValue === 'all'? null : { field: 'status', value: filterValue };
  // const filter = !filterValue || filterValue === 'true' || filterValue === 'all'? null : { field: 'totalPrice', value: 5000, method: 'gte' } ;


 //sorting


 const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
 const [field, direction] = sortByRaw.split('-');
 const sortBy = {field, direction};

//pages pagination
  const page = !searchParams.get('page') ? 1: Number(searchParams.get('page'));

//query
  const  { isLoading, data: {data: bookings, count} = {}, error } = useQuery({
    queryKey: ['booking', filter, sortBy, page],
    queryFn: ()=> getBookings({filter, sortBy, page}),
  });


  //pre-fetching
  const pageCount = Math.ceil(count / page);
  if(page < pageCount)
  queryClient.prefetchQuery({
    queryKey: ['booking', filter, sortBy, page],
    queryFn: ()=> getBookings({filter, sortBy, page: page + 1}),
  })
  if(page > 1)
    queryClient.prefetchQuery({
      queryKey: ['booking', filter, sortBy, page],
      queryFn: ()=> getBookings({filter, sortBy, page: page - 1}),
    })

  return {bookings, isLoading, error, count};

}