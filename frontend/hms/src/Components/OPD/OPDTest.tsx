import React, { useEffect, useState } from 'react';
import { Button, Text, Stack } from '@mantine/core';
import axios from 'axios';

const OPDTest: React.FC = () => {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      // Test direct connection to OPDMS
      const response = await axios.get('http://localhost:8090/opd/patient-registration/test');
      setTestResult(`Direct API Success: ${response.data}`);
    } catch (error: any) {
      try {
        // Test through Gateway
        const token = localStorage.getItem('token');
        const gatewayResponse = await axios.get('http://localhost:9000/opd/patient-registration/test', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTestResult(`Gateway API Success: ${gatewayResponse.data}`);
      } catch (gatewayError: any) {
        setTestResult(`Both failed - Direct: ${error.message}, Gateway: ${gatewayError.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap="md" className="p-6">
      <Text size="lg" fw={500}>OPD API Test</Text>
      <Button onClick={testAPI} loading={loading}>
        Test OPD API Connection
      </Button>
      {testResult && (
        <Text c={testResult.includes('Success') ? 'green' : 'red'}>
          {testResult}
        </Text>
      )}
    </Stack>
  );
};

export default OPDTest;