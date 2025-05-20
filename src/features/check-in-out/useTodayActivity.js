import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings.js';

function useTodayActivity(){
  const {isLoading, data:stays} = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['today-activity']
  })
  return {stays, isLoading};
}

export default useTodayActivity;