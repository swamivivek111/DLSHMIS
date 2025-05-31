import { Button, Divider, NumberInput, Select, TextInput } from '@mantine/core'
import { IconEdit, IconEyeEdit } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { DateTimePicker } from '@mantine/dates';
import { doctorSpecializations, hospitalDepartments } from '../../DataMaster/DropdownData';
import { getAllDoctors, getDoctor, updateDoctor } from '../../Services/DoctorProfileService';
import { useForm } from '@mantine/form';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllPatients } from '../../Services/PatientProfileService';

function AddAppointment() {
    //const user = useSelector((state:any)=>state.user);
    const [edit, setEdit]=useState(false);
    //const [opened, {open,close}]=useDisclosure(false);
    const [appointment, setAppointment]=useState<any>({});
    
    const { appId } = useParams();
    useEffect(()=>{
        if(appId!==undefined && appId!=null){
            getDoctor(appId).then((data:any)=>{
              setAppointment(data);
            }).catch((error:any)=>{console.log(error)})
        }
    },[]);
    const AppointmentField: React.FC<FieldProps> = ({ label, value }) => (
      <div className="flex flex-col">
        <span className="text-gray-400 text-xl">{label} :</span>
        <span className='text-neutral-900 text-xl'>{value}</span>
      </div>
    );
    const form = useForm({
      initialValues: {
        patientId: '',
        patientName: '',
        doctorId: '',
        doctorName: '',
        appointmentDateTime: new Date(),
        status: '',
        reason: '',
        notes: '',
        id:appId
      },
  
      validate: {
        appointmentDateTime: (value:Date) => (value!=undefined && value!=null) ? null : 'Invalid appointmentDateTime',
        patientId: (value:string) => (value!=undefined && value!=null && value!='') ? null : 'Patient is mandatory',
        doctorId: (value:string) => (value!=undefined && value!=null && value!='') ? null : 'Doctor is mandatory',
        status: (value:string) => (value!=undefined && value!=null && value!='') ? null : 'Invalid status',
        reason: (value:string) => (value!=undefined && value!=null && value!='') ? null : 'Invalid reason',
        notes: (value:string) => (value!=undefined && value!=null && value!='') ? null : 'Invalid notes'
      },
    });

    const [patients, setPatients] = useState<{ value: string; label: string }[]>([]);
    const [doctors, setDoctors] = useState<{ value: string; label: string }[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  
    // Fetch patients and doctors
    useEffect(() => {
        getAllPatients().then((res) => {
        const formatted = res.map((p: any) => ({
          value: p.id.toString(),
          label: `${p.name}`,
        }));
        setPatients(formatted);
      });
  
      getAllDoctors().then((res) => {
        const formatted = res.map((d: any) => ({
          value: d.id.toString(),
          label: `${d.name}`,
        }));
        setDoctors(formatted);
      });
    }, []);


    const handleSubmit=()=>{
      const formValues=form.getValues();
      form.validate();
      if(!form.isValid())return;

      updateDoctor({...appointment, ...formValues, 
        id:appId,
        //specialization:formValues.specialization,
        //department:formValues.department
      }).then((data:any)=>{
        successNotification("appointment updated successfully!");
        setAppointment(data);
        setEdit(false);
      }).catch((error:any)=>{
        errorNotification(error.response.data.errorMessage);
        console.log(error);
      })
      console.log(formValues);
    }
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/admin/appointments/list'); // Navigate to the appointment page
    };
    const handleEdit=()=>{
      form.setValues({...appointment, appointmentDateTime:appointment.appointmentDateTime?new Date(appointment.appointmentDateTime):undefined});
      setEdit(true);
    }
    return (
      <div className="p-4 sm:p-6 md:p-10">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6 text-center md:text-left">
          Add Appointment
        </h2>
    
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            {/* Avatar */}
    
            {/* Name & Email */}
          </div>
    
          {/* Edit/Save Button */}
          <div className="flex justify-center md:justify-start">
            <Button
                variant="filled"
                onClick={handleNavigate}
                leftSection={<IconEyeEdit />}
                color="grape"
                radius="xl"
                size="sm"
                style={{ backgroundColor: '#ae3ec9', color: 'white' }} // override if needed
              />
            {!edit ? (
              <Button
                variant="filled"
                onClick={handleEdit}
                leftSection={<IconEdit />}
                color="grape"
                radius="xl"
                size="sm"
                style={{ backgroundColor: '#ae3ec9', color: 'white' }} // override if needed
              />
            ) : (
              <Button
                variant="filled"
                type="button"
                onClick={handleSubmit}
                color="grape"
                radius="xl"
                size="sm"
                style={{ backgroundColor: '#ae3ec9', color: 'white' }} // override if needed
              >
                Save
              </Button>
            )}
          </div>
        </div>
    
        <Divider my="xl" />
    
        {/* Form Grid */}
        <div className="max-w-8xl mx-auto p-4 sm:p-6 bg-white shadow-2xl rounded-lg border border-gray-650">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-base font-medium text-gray-700">
            {edit ? (
              <Select
                    {...form.getInputProps("doctorId")}
                    label="Doctor"
                    placeholder="Select doctor"
                    data={doctors}
                    searchable
                    nothingFoundMessage="No doctors found"
                    value={selectedDoctor}
                    onChange={setSelectedDoctor}
                    withAsterisk
                />
            ) : (
              <AppointmentField label="Doctor" value={appointment.doctorName || "-"} />
            )}
            {edit ? (
              <Select
                    {...form.getInputProps("patientId")}
                    label="Patient"
                    placeholder="Select patient"
                    data={patients}
                    searchable
                    nothingFoundMessage="No patients found"
                    value={selectedPatient}
                    onChange={setSelectedPatient}
                    withAsterisk
                />
            ) : (
              <AppointmentField label="Patient" value={appointment.patientName || "-"} />
            )}


            {edit ? (
              <DateTimePicker
              label="Appointment Date & Time"
              placeholder="Pick date and time"
              //value={form.appointmentDateTime}
                withAsterisk
              />
            ) : (
              <AppointmentField label="Appointment Date & Time" value={appointment.appointmentDateTime || "-"} />
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
              <AppointmentField label="Phone" value={appointment.phone || "-"} />
            )}
            {edit ? (
              <TextInput
                {...form.getInputProps("address")}
                label="Address"
                placeholder="Address"
              />
            ) : (
              <AppointmentField label="Address" value={appointment.address || ""} />
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
              <AppointmentField label="Aadhar Number" value={appointment.aadharNo || "-"} />
            )}
            {edit ? (
              <NumberInput
                {...form.getInputProps("licenseNo")}
                label="License Number"
                placeholder="License Number"
                maxLength={12}
                value={appointment.licenseNo}
                withAsterisk
                hideControls
              />
            ) : (
              <AppointmentField
                label="License Number"
                value={appointment.licenseNo || "-"}
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
              <AppointmentField
                label="Specialization"
                value={appointment.specialization || "NA"}
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
              <AppointmentField
                label="Department"
                value={appointment.department || "NA"}
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
                value={appointment.totalExperience}
                withAsterisk
                hideControls
              />
            ) : (
              <AppointmentField
                label="Total Experience"
                value={appointment.totalExperience || "NA"}
              />
            )}
          </div>
    <div className="flex justify-center">
    <Button
                variant="filled"
                type="button"
                onClick={handleSubmit}
                color="grape"
                radius="xl"
                size="sm"
                style={{ backgroundColor: '#ae3ec9', color: 'white' }} // override if needed
              >
                Save
              </Button>
    </div>
        </div>
      </div>
    );
    
}
interface FieldProps {
  label: string;
  value: string;
}


export default AddAppointment
