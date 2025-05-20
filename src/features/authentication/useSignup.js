import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signup } from '../../services/apiAuth.js';
import toast from 'react-hot-toast';

export function useSignup() {
  const {mutate: signUp , isLoading} = useMutation({
    mutationFn: signup,
    onSuccess: (data)=>{
      console.log(data);
      toast.success('Sign up successfully!Please verify new account from the user`s email address ');
    }
  })
return {signUp, isLoading};
}