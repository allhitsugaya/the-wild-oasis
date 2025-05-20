import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginAuth } from '../../services/apiAuth.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const{mutate: login, isLoading:isLogging}  =  useMutation({
    mutationFn: ({email, password}) =>  loginAuth({email, password}),
    onSuccess: (user)=>{
      console.log(user);
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard', {replace: true});
      toast.success('Login successfully');
    },
    onError: (err)=>{
      console.log('error', err.message);
      toast.error(err.message);
    }
  });
  return {login, isLogging}
}