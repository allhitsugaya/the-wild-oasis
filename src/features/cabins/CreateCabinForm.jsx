import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {  createEditCabin } from '../../services/apiCabins.js';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow.jsx';
import React from 'react';
import { useCreateCabin } from './useCreateCabin.js';
import { useEditCabin } from './useEditCabin.js';


function CreateCabinForm({cabinToEdit = {}, onClose}) {
  const {id: editID, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editID);
  const {register, formState, getValues, reset, handleSubmit} =  useForm({
    defaultValues: isEditSession ? editValues : {},
  })
const {errors} = formState;
  console.log(errors);
  const {isLoading, createCabin} = useCreateCabin();
 const {isEditing, editCabin} = useEditCabin();

  const isWorking = isLoading || isEditing;
  function onSubmit(data) {
  const image = typeof data.image === 'string' ? data.image : data.image[0];


    if(isEditSession) editCabin({newCabinData: {  ...data, image} , id: editID}, {
      onSuccess: (data)=>{
        reset();
        onClose?.();
      },
    });
   else createCabin({ ...data, image: image },{
     onSuccess: (data)=>{
       reset();
       onClose?.();
     }
    });
}
function onError(error) {
    console.log(error);
}
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onClose ? 'modal': 'regular'}>
    <FormRow label='Cabin name' error={errors?.name?.message}>
      <Input type="text" id="Name" disabled={isWorking} {...register("name", {
        required: 'This field is required',
      })} />
    </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapasity?.message}>
        <Input type="number" id="maxCapasity" disabled={isWorking} {...register("maxCapasity", {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Maximum capacity must be greater than 1',
          }
        })} />
      </FormRow>

      <FormRow label=' Cabin price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice", {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Maximum capacity must be greater than 1',
          }
        })} />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isWorking} defaultValue={0} {...register("discount",{
          required: 'This field is required',
          validate: (value) => value <= getValues().regularPrice || 'Discount should be less than regular price'
        })} />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea type="number" id="description"  defaultValue="" {...register('description',{
          required: 'This field is required',
        })} />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput id="image" accept="image/*" disabled={isWorking} {...register('image',{
          required: isEditSession ? false : 'This field is required',
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" size='medium' type="reset" onClick={()=> onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking} variation="primary" size='medium' >{ isEditSession ? 'Update cabin': 'Add new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
