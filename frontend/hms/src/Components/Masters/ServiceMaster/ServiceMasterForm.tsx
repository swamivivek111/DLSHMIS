import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import { Button, Container, Paper, Select, TextInput, Title, NumberInput, Checkbox, Tabs } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ServiceMasterService } from '../../../Services/ServiceMasterService';
import { ServiceGroupService } from '../../../Services/ServiceGroupService';
import { ServiceSubGroupService } from '../../../Services/ServiceSubGroupService';
import { ServiceClassService } from '../../../Services/ServiceClassService';
import { BillingHeadService } from '../../../Services/BillingHeadService';
import { WardGroupService } from '../../../Services/WardGroupService';

export default function ServiceMasterForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serviceGroups, setServiceGroups] = useState<any[]>([]);
  const [serviceSubGroups, setServiceSubGroups] = useState<any[]>([]);
  const [serviceClasses, setServiceClasses] = useState<any[]>([]);
  const [billingHeads, setBillingHeads] = useState<any[]>([]);
  const [wardGroups, setWardGroups] = useState<any[]>([]);
  const isEdit = Boolean(id);

  const form = useForm({
    initialValues: {
      serviceName: '',
      displayName: '',
      serviceGroupId: '',
      serviceSubGroupId: '',
      serviceClassId: '',
      serviceType: '',
      applicableFor: '',
      billingProcess: '',
      billingHeadId: '',
      effectFrom: null,
      effectTo: null,
      opdServicePrice: 0,
      opdEmergencyPrice: 0,
      opdHospitalSharePct: 0,
      opdHospitalPrice: 0,
      opdHospitalEmergencyPrice: 0,
      opdDoctorPrice: 0,
      opdDoctorSharePct: 0,
      wardGroupNameId: '',
      ipdNormalPrice: 0,
      ipdDoctorSharePrice: 0,
      ipdEmergencyPrice: 0,
      ipdDoctorShare: 0,
      universalCode: '',
      isHavingUniversalCode: false,
      minAmt: 0,
      maxAmt: 0,
      isPriceCaps: false,
      taxId: '',
      taxPercentage: 0,
      isActive: true,
      isQtyEditable: false,
      isDiet: false,
      isNonConsumableRequired: false,
      isNormalServiceCharges: false,
      isPriceEditable: false,
      isEmergencyServiceCharges: false,
      isDoctorRequired: false,
      isTreatmentRoom: false,
      isDoctorShareRequired: false,
      status: 'Active',
    },
    validate: {
      serviceName: (value) => (!value ? 'Service name is required' : null),
    },
  });

  useEffect(() => {
    loadMasterData();
    if (isEdit && id) {
      loadService();
    }
  }, [id, isEdit]);

  const loadMasterData = async () => {
    try {
      const [groups, subGroups, classes, heads, wards] = await Promise.all([
        ServiceGroupService.getAllServiceGroups(),
        ServiceSubGroupService.getAllServiceSubGroups(),
        ServiceClassService.getAllServiceClasses(),
        BillingHeadService.getAllBillingHeads(),
        WardGroupService.getAllWardGroups()
      ]);

      setServiceGroups(groups.map((g: any) => ({ value: g.groupId.toString(), label: g.groupName })));
      setServiceSubGroups(subGroups.map((sg: any) => ({ value: sg.subGroupId.toString(), label: sg.subGroupName })));
      setServiceClasses(classes.map((sc: any) => ({ value: sc.serviceClassId.toString(), label: sc.serviceClassName })));
      setBillingHeads(heads.map((bh: any) => ({ value: bh.billingHeadId.toString(), label: bh.billingHeadName })));
      setWardGroups(wards.map((wg: any) => ({ value: wg.wardGroupId.toString(), label: wg.wardGroupName })));
    } catch {
      errorNotification('Failed to load master data');
    }
  };

  const loadService = async () => {
    try {
      setLoading(true);
      const service = await ServiceMasterService.getServiceById(Number(id));
      form.setValues({
        ...service,
        serviceGroupId: service.serviceGroupId?.toString() || '',
        serviceSubGroupId: service.serviceSubGroupId?.toString() || '',
        serviceClassId: service.serviceClassId?.toString() || '',
        billingHeadId: service.billingHeadId?.toString() || '',
        wardGroupNameId: service.wardGroupNameId?.toString() || '',
        taxId: service.taxId?.toString() || '',
        effectFrom: service.effectFrom ? new Date(service.effectFrom) : null,
        effectTo: service.effectTo ? new Date(service.effectTo) : null,
      });
    } catch {
      errorNotification('Failed to load service');
      navigate('/admin/mastersettings/services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const submitData = {
        ...values,
        serviceGroupId: values.serviceGroupId ? Number(values.serviceGroupId) : null,
        serviceSubGroupId: values.serviceSubGroupId ? Number(values.serviceSubGroupId) : null,
        serviceClassId: values.serviceClassId ? Number(values.serviceClassId) : null,
        billingHeadId: values.billingHeadId ? Number(values.billingHeadId) : null,
        wardGroupNameId: values.wardGroupNameId ? Number(values.wardGroupNameId) : null,
        taxId: values.taxId ? Number(values.taxId) : null,
      };
      
      if (isEdit) {
        await ServiceMasterService.updateService(Number(id), submitData);
        successNotification('Service updated successfully!');
      } else {
        await ServiceMasterService.createService(submitData);
        successNotification('Service created successfully!');
      }
      navigate('/admin/mastersettings/services');
    } catch {
      errorNotification(`Failed to ${isEdit ? 'update' : 'create'} service`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? 'Edit Service' : 'Add Service'}
        </h2>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Tabs defaultValue="basic">
            <Tabs.List>
              <Tabs.Tab value="basic">Basic Info</Tabs.Tab>
              <Tabs.Tab value="opd">OPD Pricing</Tabs.Tab>
              <Tabs.Tab value="ipd">IPD Pricing</Tabs.Tab>
              <Tabs.Tab value="additional">Additional</Tabs.Tab>
              <Tabs.Tab value="options">Options</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="basic" className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
              <TextInput label="Service Name" withAsterisk {...form.getInputProps('serviceName')} />
              <TextInput label="Display Name" {...form.getInputProps('displayName')} />
              <Select label="Service Group" data={serviceGroups} searchable {...form.getInputProps('serviceGroupId')} />
              <Select label="Service Sub Group" data={serviceSubGroups} searchable {...form.getInputProps('serviceSubGroupId')} />
              <Select label="Service Class" data={serviceClasses} searchable {...form.getInputProps('serviceClassId')} />
              <TextInput label="Service Type" {...form.getInputProps('serviceType')} />
              <TextInput label="Applicable For" {...form.getInputProps('applicableFor')} />
              <TextInput label="Billing Process" {...form.getInputProps('billingProcess')} />
              <Select label="Billing Head" data={billingHeads} searchable {...form.getInputProps('billingHeadId')} />
              <DateInput label="Effect From" {...form.getInputProps('effectFrom')} />
              <DateInput label="Effect To" {...form.getInputProps('effectTo')} />
              <Select label="Status" data={[{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]} {...form.getInputProps('status')} />
            </Tabs.Panel>

            <Tabs.Panel value="opd" className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
              <NumberInput label="OPD Service Price" {...form.getInputProps('opdServicePrice')} />
              <NumberInput label="OPD Emergency Price" {...form.getInputProps('opdEmergencyPrice')} />
              <NumberInput label="OPD Hospital Share %" {...form.getInputProps('opdHospitalSharePct')} />
              <NumberInput label="OPD Hospital Price" {...form.getInputProps('opdHospitalPrice')} />
              <NumberInput label="OPD Hospital Emergency Price" {...form.getInputProps('opdHospitalEmergencyPrice')} />
              <NumberInput label="OPD Doctor Price" {...form.getInputProps('opdDoctorPrice')} />
              <NumberInput label="OPD Doctor Share %" {...form.getInputProps('opdDoctorSharePct')} />
            </Tabs.Panel>

            <Tabs.Panel value="ipd" className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
              <Select label="Ward Group" data={wardGroups} searchable {...form.getInputProps('wardGroupNameId')} />
              <NumberInput label="IPD Normal Price" {...form.getInputProps('ipdNormalPrice')} />
              <NumberInput label="IPD Doctor Share Price" {...form.getInputProps('ipdDoctorSharePrice')} />
              <NumberInput label="IPD Emergency Price" {...form.getInputProps('ipdEmergencyPrice')} />
              <NumberInput label="IPD Doctor Share %" {...form.getInputProps('ipdDoctorShare')} />
            </Tabs.Panel>

            <Tabs.Panel value="additional" className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
              <TextInput label="Universal Code" {...form.getInputProps('universalCode')} />
              <Checkbox label="Is Having Universal Code" {...form.getInputProps('isHavingUniversalCode', { type: 'checkbox' })} />
              <NumberInput label="Min Amount" {...form.getInputProps('minAmt')} />
              <NumberInput label="Max Amount" {...form.getInputProps('maxAmt')} />
              <Checkbox label="Is Price Caps" {...form.getInputProps('isPriceCaps', { type: 'checkbox' })} />
              <TextInput label="Tax ID" {...form.getInputProps('taxId')} />
              <NumberInput label="Tax Percentage" {...form.getInputProps('taxPercentage')} />
              <Checkbox label="Is Active" {...form.getInputProps('isActive', { type: 'checkbox' })} />
            </Tabs.Panel>

            <Tabs.Panel value="options" className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
              <Checkbox label="Is Quantity Editable" {...form.getInputProps('isQtyEditable', { type: 'checkbox' })} />
              <Checkbox label="Is Diet" {...form.getInputProps('isDiet', { type: 'checkbox' })} />
              <Checkbox label="Is Non-Consumable Required" {...form.getInputProps('isNonConsumableRequired', { type: 'checkbox' })} />
              <Checkbox label="Is Normal Service Charges" {...form.getInputProps('isNormalServiceCharges', { type: 'checkbox' })} />
              <Checkbox label="Is Price Editable" {...form.getInputProps('isPriceEditable', { type: 'checkbox' })} />
              <Checkbox label="Is Emergency Service Charges" {...form.getInputProps('isEmergencyServiceCharges', { type: 'checkbox' })} />
              <Checkbox label="Is Doctor Required" {...form.getInputProps('isDoctorRequired', { type: 'checkbox' })} />
              <Checkbox label="Treatment Room Procedure" {...form.getInputProps('isTreatmentRoom', { type: 'checkbox' })} />
              <Checkbox label="Is Doctor Share Required" {...form.getInputProps('isDoctorShareRequired', { type: 'checkbox' })} />
            </Tabs.Panel>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="submit" loading={loading} className="bg-[#202A44] text-white hover:bg-[#1a2236]">
              {isEdit ? 'Update' : 'Create'}
            </Button>
            <Button variant="subtle" onClick={() => navigate('/admin/mastersettings/services')} className="bg-[#202A44] text-white hover:bg-[#1a2236]">
              Back
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}