import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings.js';
import Spinner from '../../ui/Spinner.jsx';
import { useUpdateSettings } from './useUpdateSettings.js';
import settings from '../../pages/Settings.jsx';

function UpdateSettingsForm() {
  const {isLoading, error, settings: {
    minBookingLength, maxBookingLength ,maxGuestPerBooking, breakfastPrice
  } = {}} = useSettings();

  const {isUpdating, updateSettings} = useUpdateSettings();

  if(isLoading) return <Spinner />;

  function handleUpdate(e, field){
    const {value} = e.target;
    if(!value) return ;
    updateSettings({[field]: value});
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' disabled={isUpdating} defaultValue={minBookingLength} onBlur={(e)=> handleUpdate(e, 'minBookingLength')}  />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights'  disabled={isUpdating} defaultValue={maxBookingLength} onBlur={(e)=> handleUpdate(e, 'maxBookingLength')} />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests'  disabled={isUpdating} defaultValue={maxGuestPerBooking} onBlur={(e)=> handleUpdate(e, 'maxGuestPerBooking')} />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' disabled={isUpdating} defaultValue={breakfastPrice} onBlur={(e)=> handleUpdate(e, 'breakfastPrice')} />
      </FormRow>

    </Form>
  );
}

export default UpdateSettingsForm;
