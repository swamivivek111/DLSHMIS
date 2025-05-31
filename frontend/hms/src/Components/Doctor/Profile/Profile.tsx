import { Avatar, Button, Divider, Modal, NumberInput, Select, TextInput } from '@mantine/core'
import { IconEdit } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DatePickerInput } from '@mantine/dates';
import { doctorSpecializations, hospitalDepartments } from '../../../DataMaster/DropdownData';
import { useDisclosure } from '@mantine/hooks';
import { getDoctor, updateDoctor } from '../../../Services/DoctorProfileService';
import { useForm } from '@mantine/form';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';

function Profile() {
    const user = useSelector((state:any)=>state.user);
    const [edit, setEdit]=useState(false);
    const [opened, {open,close}]=useDisclosure(false);
    const [profile, setProfile]=useState<any>({});
    useEffect(()=>{
      getDoctor(user.profileId).then((data)=>{
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
        licenseNo: '',
        specialization: [],
        department: [],
        totalExperience:0,
        id:user.profileId
      },
  
      validate: {
        dob: (value:string) => (value!=undefined && value!=null && value!='') ? null : 'Invalid dob',
        phone: (value:string) => (value!=undefined && value!=null && value!='') ? null : 'Invalid phone',
        address: (value:string) => (value!=undefined && value!=null && value!='') ? null : 'Invalid address',
        aadharNo: (value:string) => (value!=undefined && value!=null && value!='') ? null : 'Invalid aadharNo',
        licenseNo: (value:string) => (value!=undefined && value!=null && value!='') ? null : 'Invalid licenseNo'
      },
    });
    const handleSubmit=()=>{
      const formValues=form.getValues();
      form.validate();
      if(!form.isValid())return;

      updateDoctor({...profile, ...formValues, 
        id:user.profileId,
        specialization:formValues.specialization,
        department:formValues.department
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
      <div className="p-4 sm:p-6 md:p-10">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6 text-center md:text-left">
          Profile Information
        </h2>
    
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            {/* Avatar */}
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
    
            {/* Name & Email */}
            <div className="flex flex-col gap-3 w-full md:w-auto">
              {edit ? (
                <TextInput label="Name" placeholder="Name" value={user.name} />
              ) : (
                <div className="text-2xl font-medium text-neutral-900">
                  {user.name}
                </div>
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
    
        {/* Form Grid */}
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
              <ProfileField label="Address" value={profile.address || ""} />
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
              <ProfileField label="Aadhar Number" value={profile.aadharNo || "-"} />
            )}
            {edit ? (
              <NumberInput
                {...form.getInputProps("licenseNo")}
                label="License Number"
                placeholder="License Number"
                maxLength={12}
                value={profile.licenseNo}
                withAsterisk
                hideControls
              />
            ) : (
              <ProfileField
                label="License Number"
                value={profile.licenseNo || "-"}
              />
            )}
            {edit ? (
              <Select
                {...form.getInputProps("specialization")}
                searchable
                label="Specialization"
                placeholder="Select Specialization"
                data={doctorSpecializations}
              />
            ) : (
              <ProfileField
                label="Specialization"
                value={profile.specialization || "NA"}
              />
            )}
            {edit ? (
              <Select
                {...form.getInputProps("department")}
                searchable
                label="Department"
                placeholder="Select Department"
                data={hospitalDepartments}
              />
            ) : (
              <ProfileField
                label="Department"
                value={profile.department || "NA"}
              />
            )}
            {edit ? (
              <NumberInput
                {...form.getInputProps("totalExperience")}
                label="Total Experience"
                placeholder="Total Experience"
                min={0}
                max={60}
                clampBehavior="strict"
                value={profile.totalExperience}
                withAsterisk
                hideControls
              />
            ) : (
              <ProfileField
                label="Total Experience"
                value={profile.totalExperience || "NA"}
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
