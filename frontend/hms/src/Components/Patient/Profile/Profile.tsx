import { Avatar, Button, Divider, Modal, NumberInput, Select, TagsInput, TextInput } from '@mantine/core'
import { IconEdit } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DatePickerInput } from '@mantine/dates';
import { bloodGroups } from '../../../DataMaster/DropdownData';
import { useDisclosure } from '@mantine/hooks';
import { getPatient, updatePatient } from '../../../Services/PatientProfileService';
import { useForm } from '@mantine/form';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { getBlooodGroupEnumFString, getBlooodGroupStringFEnum } from '../../../Utility/UtilityFunctions';

function Profile() {
    const user = useSelector((state:any)=>state.user);
    const [edit, setEdit]=useState(false);
    const [opened, {open,close}]=useDisclosure(false);
    const [profile, setProfile]=useState<any>({});
    useEffect(()=>{
      console.log("From useEffect get User : "+user);
      getPatient(user.profileId).then((data)=>{
        console.log("From useEffect get Patient : "+data);
        setProfile({...data, 
          allergies:data.allergies?JSON.parse(data.allergies):[], 
          cronicDisease:data.cronicDisease?JSON.parse(data.cronicDisease):[],
          bloodGroup:data.bloodGroup?getBlooodGroupStringFEnum(data.bloodGroup):null});
      }).catch((error)=>{console.log(error)

        })
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
        bloodGroup: '',
        allergies: [],
        cronicDisease: [],
        id:user.profileId
      },
  
      validate: {
        dob: (value:string) => (value!=undefined && value!=null && value!='') ? null : 'Invalid dob',
        phone: (value:string) => (value!=undefined && value!=null && value!='') ? null : 'Invalid phone',
        address: (value:string) => (value!=undefined && value!=null && value!='') ? null : 'Invalid address',
        aadharNo: (value:string) => (value!=undefined && value!=null && value!='') ? null : 'Invalid aadharNo',
        bloodGroup: (value:string) => (value!=undefined && value!=null && value!='') ? null : 'Invalid bloodGroup'
      },
    });
    const handleSubmit=()=>{
      const formValues=form.getValues();
      form.validate();
      if(!form.isValid())return;

      updatePatient({...profile, ...formValues, 
        allergies:formValues.allergies?JSON.stringify(formValues.allergies):null, 
        cronicDisease:formValues.cronicDisease?JSON.stringify(formValues.cronicDisease):null, 
        bloodGroup:formValues.bloodGroup?getBlooodGroupEnumFString(formValues.bloodGroup):null, 
        id:user.profileId}).then((data)=>{
        successNotification("Profile updated successfully!");
        setProfile({...data, 
          allergies:data.allergies?JSON.parse(data.allergies):[], 
          cronicDisease:data.cronicDisease?JSON.parse(data.cronicDisease):[],
          bloodGroup:data.bloodGroup?getBlooodGroupStringFEnum(data.bloodGroup):null});
        setEdit(false);
      }).catch((error)=>{
        errorNotification(error.response.data.errorMessage);
        console.log(error);
      })
      console.log(formValues);
    }
    const handleEdit=()=>{
      form.setValues({...profile, dob:profile.dob?new Date(profile.dob):undefined, cronicDisease:profile.cronicDisease??[], allergies:profile.allergies??[]});
      setEdit(true);
    }

    return (
      <div className="p-4 sm:p-6 md:p-10">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6 text-center md:text-left">
          Profile Information
        </h2>
    
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            {/* Avatar + Upload */}
            <div className="flex flex-col items-center gap-4">
              <Avatar
                className="shadow-2xl shadow-pink-500"
                variant="filled"
                src="/avatar.jpg"
                size={150}
                alt="it's me"
              />
              {edit && (
                <Button
                  variant="filled"
                  onClick={open}
                  color="grape"
                  radius="xl"
                  size="sm"
                >
                  Upload
                </Button>
              )}
            </div>
    
            {/* User Info */}
            <div className="flex flex-col gap-3 w-full md:w-auto text-center md:text-left">
              {edit ? (
                <TextInput label="Name" placeholder="Name" value={user.name} />
              ) : (
                <div className="text-2xl font-medium text-neutral-900">{user.name}</div>
              )}
              {edit ? (
                <TextInput label="Email" placeholder="Email" value={user.email} />
              ) : (
                <div className="text-lg text-neutral-700">{user.email}</div>
              )}
            </div>
          </div>
    
          {/* Edit/Save Button */}
          <div className="flex justify-center md:justify-start">
            {!edit ? (
              <Button
                variant="filled"
                onClick={handleEdit}
                leftSection={<IconEdit />}
                color="grape"
                radius="xl"
                size="sm"
              />
            ) : (
              <Button
                variant="filled"
                type="button"
                onClick={handleSubmit}
                color="grape"
                radius="xl"
                size="sm"
              >
                Save
              </Button>
            )}
          </div>
        </div>
    
        <Divider my="xl" />
    
        {/* Profile Form Grid */}
        <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white shadow-2xl rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base font-medium text-gray-700">
            {edit ? (
              <DatePickerInput
                {...form.getInputProps("dob")}
                valueFormat="DD/MM/YYYY"
                label="Date of Birth"
                placeholder="Date of Birth"
                withAsterisk
              />
            ) : (
              <ProfileField label="Date of Birth" value={profile.dob || "-"} />
            )}
    
            {edit ? (
              <NumberInput
                {...form.getInputProps("phone")}
                label="Phone"
                placeholder="Enter 10-digit Phone Number"
                maxLength={10}
                withAsterisk
                hideControls
              />
            ) : (
              <ProfileField label="Phone" value={profile.phone || "-"} />
            )}
    
            {edit ? (
              <TextInput
                {...form.getInputProps("address")}
                label="Address"
                placeholder="Address"
              />
            ) : (
              <ProfileField label="Address" value={profile.address || "-"} />
            )}
    
            {edit ? (
              <NumberInput
                {...form.getInputProps("aadharNo")}
                label="Aadhar Number"
                placeholder="Aadhar Number"
                maxLength={12}
                withAsterisk
                hideControls
              />
            ) : (
              <ProfileField
                label="Aadhar Number"
                value={profile.aadharNo || "-"}
              />
            )}
    
            {edit ? (
              <Select
                {...form.getInputProps("bloodGroup")}
                searchable
                label="Blood Group"
                placeholder="Blood Group"
                data={bloodGroups}
              />
            ) : (
              <ProfileField
                label="Blood Group"
                value={profile.bloodGroup || "-"}
              />
            )}
    
            {edit ? (
              <TagsInput
                {...form.getInputProps("allergies")}
                label="Allergies"
                placeholder="Enter Allergies"
                clearable
              />
            ) : (
              <ProfileField
                label="Allergies"
                value={
                  Array.isArray(profile.allergies)
                    ? profile.allergies.join(", ")
                    : profile.allergies || "-"
                }
              />
            )}
    
            {edit ? (
              <TagsInput
                {...form.getInputProps("cronicDisease")}
                label="Chronic Disease"
                placeholder="Chronic Disease"
                clearable
              />
            ) : (
              <ProfileField
                label="Chronic Disease"
                value={
                  Array.isArray(profile.cronicDisease)
                    ? profile.cronicDisease.join(", ")
                    : profile.cronicDisease || "-"
                }
              />
            )}
          </div>
        </div>
    
        {/* Upload Modal */}
        <Modal
          opened={opened}
          onClose={close}
          title={<span className="text-xl font-medium">Upload Profile Picture</span>}
          centered
        >
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
