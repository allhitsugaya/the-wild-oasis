import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth.js';

export function useUser(){
   const {isLoading, data: user} =  useQuery({
     queryKey:[ 'user'],
     queryFn: getCurrentUser,
   });
   return {user, isLoading, isAuthenticated: user?.role=== 'authenticated'};
}