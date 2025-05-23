import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins.js';
import toast from 'react-hot-toast';

export  function useEditCabin() {
  const queryClient = useQueryClient();
  const {mutate: editCabin, isLoading: isEditing} = useMutation({
    mutationFn: ({newCabinData , id})=>  createEditCabin(newCabinData, id),
    onSuccess: ()=>{
      toast.success('Cabins successfully edited!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: error => toast.error('Oops :3 you have some error' , error.message),
  })
  return {editCabin, isEditing}
}