import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinAPI, getCabins } from '../../services/apiCabins.js';
import toast from 'react-hot-toast';

export function useDeleteCabin() {
  const queryClient = useQueryClient()
  const {isLoading: isDeleting, mutate: deleteCabin} = useMutation({
    mutationFn: (id) => deleteCabinAPI(id),
    onSuccess: ()=>{
      toast.success('Cabins successfully deleted!');
      queryClient.invalidateQueries({
        queryKey: 'cabins',
        queryFn: getCabins,
      })
    },
    onError: error => toast.error(error)
  })
  return {isDeleting, deleteCabin}
}

