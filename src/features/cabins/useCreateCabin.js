import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins.js';
import toast from 'react-hot-toast';


export const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const {mutate : createCabin, isLoading} = useMutation({
    mutationFn:  newCabin => createEditCabin(newCabin),
    onSuccess: ()=>{
      toast.success('Cabins successfully created!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: error => toast.error('Oops :3 you have some error' , error.message),
  })

  return {createCabin, isLoading}
}
