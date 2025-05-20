import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutUser } from '../../services/apiAuth.js';
import { useNavigate } from 'react-router-dom';

export  function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {mutate:logout,  isLoading} = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', {replace: true});
    },
    onError: error => {
      console.log(error)
    }
  })
  return {logout, isLoading};
}