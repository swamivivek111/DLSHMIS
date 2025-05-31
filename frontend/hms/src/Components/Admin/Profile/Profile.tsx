import { Avatar, Button, Divider, Modal, NumberInput, TextInput } from '@mantine/core'
import { IconEdit } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { getAdmin, updateAdmin } from '../../../Services/AdminProfileService';

function Profile() {
    const user = useSelector((state:any)=>state.user);
    const [edit, setEdit]=useState(false);
    const [opened, {open,close}]=useDisclosure(false);
    const [profile, setProfile]=useState<any>({});
    useEffect(()=>{
      getAdmin(user.profileId).then((data)=>{
        setProfile(data);
      }).catch((error)=>{console.log(error)})
    },[]);
    const ProfileField: React.FC<FieldProps> = ({ label, value }) => (
      <div className="flex flex-col">
        <span className="text-gray-400 text-xl">{label} :</span>
        <span className='text-neutral-900 text-xl'>{value}</span>
      </div>
    );
    const form = useForm({
      initialValues: {
        dob: '',
        phone: '',
        address: '',
        aadharNo: '',
        id:user.profileId
      },
  
      validate: {
        dob: (value:any) => (value!=undefined && value!=null && value!='') ? null : 'Invalid dob',
        phone: (value:any) => (value!=undefined && value!=null && value!='') ? null : 'Invalid phone',
        address: (value:any) => (value!=undefined && value!=null && value!='') ? null : 'Invalid address',
        aadharNo: (value:any) => (value!=undefined && value!=null && value!='') ? null : 'Invalid aadharNo'
      },
    });
    const handleSubmit=()=>{
      const formValues=form.getValues();
      form.validate();
      if(!form.isValid())return;

      updateAdmin({...profile, ...formValues, 
        id:user.profileId
      }).then((data)=>{
        successNotification("Profile updated successfully!");
        setProfile(data);
        setEdit(false);
      }).catch((error)=>{
        errorNotification(error.response.data.errorMessage);
        console.log(error);
      })
      console.log(formValues);
    }
    const handleEdit=()=>{
      form.setValues({...profile, dob:profile.dob?new Date(profile.dob):undefined});
      setEdit(true);
    }
    return (
      <div className='p-5 sm:p-10'>
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mb-4">Profile Information</h2>
        <div className='flex flex-col sm:flex-row justify-between items-center sm:gap-10'>
          <div className='flex flex-col sm:flex-row items-center gap-5'>
            <div className='flex flex-col items-center gap-5'>
              <Avatar
                className='shadow-2xl shadow-orange-500'
                variant='filled'
                src="/avatar.jpg"
                size={200}
                alt="it's me"
              />
              {edit && <Button variant="filled" onClick={open} color="grape" radius="xl">Upload</Button>}
            </div>
            <div className='flex flex-col gap-3 sm:mr-16'>
              {edit ? (
                <TextInput label="Name" description="" placeholder="Name" value={user.name} />
              ) : (
                <div className='text-3xl font-medium text-neutral-900'>{user.name}</div>
              )}
              {edit ? (
                <TextInput label="Email" description="" placeholder="Email" value={user.email} />
              ) : (
                <div className='text-xl text-neutral-700'>{user.email}</div>
              )}
            </div>
            {!edit ? (
              <Button variant="filled" onClick={handleEdit} leftSection={<IconEdit />} color="grape" radius="xl" />
            ) : (
              <Button variant="filled" type='button' onClick={handleSubmit} color="grape" radius="xl">Save</Button>
            )}
          </div>
        </div>
        <Divider my="xl" />
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-2xl rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-2xl font-semibold text-gray-700">
            {edit ? (
              <DatePickerInput
                {...form.getInputProps('dob')}
                valueFormat="DD/MM/YYYY"
                label="Date of Birth"
                placeholder="Date of Birth"
                withAsterisk
              />
            ) : (
              <ProfileField label="Date of Birth" value={profile.dob || '-'} />
            )}
            {edit ? (
              <NumberInput
                {...form.getInputProps('phone')}
                label="Phone"
                description=""
                placeholder="Enter 10-digit Phone Number"
                maxLength={10}
                withAsterisk
                hideControls
              />
            ) : (
              <ProfileField label="Phone" value={profile.phone || '-'} />
            )}
            {edit ? (
              <TextInput
                {...form.getInputProps('address')}
                label="Address"
                description=""
                placeholder="Address"
              />
            ) : (
              <ProfileField label="Address" value={profile.address || ''} />
            )}
            {edit ? (
              <NumberInput
                {...form.getInputProps('aadharNo')}
                label="Aadhar Number"
                description=""
                placeholder="Aadhar Number"
                maxLength={12}
                withAsterisk
                hideControls
              />
            ) : (
              <ProfileField label="Aadhar Number" value={profile.aadharNo || '-'} />
            )}
          </div>
        </div>
        <Modal opened={opened} onClose={close} title={<span className='text-xl font-medium'>Upload Profile Picture</span>} centered>
          {/* Modal content */}
        </Modal>
      </div>
    );
    
}
interface FieldProps {
  label: string;
  value: string;
}


export default Profile
