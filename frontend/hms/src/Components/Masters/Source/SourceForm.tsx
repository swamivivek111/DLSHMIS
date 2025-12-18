import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import { Button, Container, Paper, TextInput, Textarea, Title } from '@mantine/core';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { SourceService } from '../../../Services/SourceService';

interface SourceFormData {
  sourceName: string;
  description: string;
}

export default function SourceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(id);

  const form = useForm<SourceFormData>({
    initialValues: {
      sourceName: '',
      description: '',
    },
    validate: {
      sourceName: (value) => (!value ? 'Source name is required' : null),
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      loadSource();
    }
  }, [id, isEdit]);

  const loadSource = async () => {
    try {
      setLoading(true);
      const response = await SourceService.getSourceById(Number(id));
      const source = response.source;
      form.setValues({
        sourceName: source.sourceName || '',
        description: source.description || '',
      });
    } catch {
      errorNotification('Failed to load source');
      navigate('/admin/mastersettings/sources');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: SourceFormData) => {
    try {
      setLoading(true);
      if (isEdit) {
        await SourceService.updateSource(Number(id), values);
        successNotification('Source updated successfully!');
      } else {
        await SourceService.createSource(values);
        successNotification('Source created successfully!');
      }
      navigate('/admin/mastersettings/sources');
    } catch {
      errorNotification(`Failed to ${isEdit ? 'update' : 'create'} source`);
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
          {isEdit ? 'Edit Source' : 'Add Source'}
        </h2>

        <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TextInput 
            label="Source Name" 
            withAsterisk 
            {...form.getInputProps('sourceName')} 
            className="xl:col-span-2"
          />
          
          <Textarea 
            label="Description" 
            {...form.getInputProps('description')} 
            className="xl:col-span-2" 
            rows={4}
          />

          <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
            <Button type="submit" loading={loading} className="bg-[#202A44] text-white hover:bg-[#1a2236]">
              {isEdit ? 'Update' : 'Save'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/sources')}
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}