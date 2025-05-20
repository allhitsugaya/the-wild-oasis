import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins.js';
import toast from 'react-hot-toast';
import {updateSetting as updateSettingsAPI} from '../../services/apiSettings.js';


export  function useUpdateSettings() {
  const queryClient = useQueryClient();
  const {mutate: updateSettings, isLoading: isUpdating} = useMutation({
    mutationFn: updateSettingsAPI,
    onSuccess: ()=>{
      toast.success('Settings successfully edited!');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
    onError: error => toast.error('Oops :3 you have some error' , error.message),
  })
  return {updateSettings, isUpdating}
}