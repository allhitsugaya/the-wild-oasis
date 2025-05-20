import supabase, { supabaseUrl } from './supabaseClient.js';

export  async function getCabins(){
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
  if(error) throw new Error('Cabins can`t be loaded');
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

//https://rfhtbdhpgwsvvxfkcyvu.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from('cabins');
  //1. Create/edit cabin

  //a. Create
  if(!id) query =  query.insert([{ ...newCabin, image: imagePath }])

  //edit
  if(id) query = query.update({  ...newCabin, image: imagePath }).eq('id', id)
  const { data, error } = await query.select().single();

  if(error){
    console.log(error);
    throw new Error('Cabins can`t be created');
  }
   //2. Upload image
  if (hasImagePath) return data;
  const { error:storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);
  // 3. Delete the cabin if there was error of uploading image
  if(storageError) {
    await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id);
    console.error(storageError);
    throw new Error("Cabin image couldn`t not be uploaded and cabin was not created");
  }
  return data;
}

export async function deleteCabin(id){
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
  if(error) throw new Error('Cabins can`t be deleted');
  return data;
}


