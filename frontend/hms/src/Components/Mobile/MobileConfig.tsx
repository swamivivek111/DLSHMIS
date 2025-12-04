import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMobileConfig, getMobileEndpoints } from '../../Services/ReportServices';

const MobileConfig: React.FC = () => {
  const [config, setConfig] = useState<any>(null);
  const [endpoints, setEndpoints] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchMobileConfig = async () => {
    setLoading(true);
    try {
      const [configData, endpointsData] = await Promise.all([
        getMobileConfig(),
        getMobileEndpoints()
      ]);
      setConfig(configData);
      setEndpoints(endpointsData);
    } catch (error) {
      console.error('Error fetching mobile config:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMobileConfig();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Mobile App Integration</h2>
      
      {loading ? (
        <div className="text-center py-8">Loading configuration...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Mobile Config */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Mobile Configuration</h3>
            {config && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">API Version:</span>
                  <span className="font-semibold">{config.apiVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Base URL:</span>
                  <span className="font-semibold text-blue-600">{config.baseUrl}</span>
                </div>
                <div>
                  <span className="text-gray-600">Supported Platforms:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {config.supportedPlatforms?.map((platform: string) => (
                      <span key={platform} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Available Features:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {config.features?.map((feature: string) => (
                      <span key={feature} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* API Endpoints */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">API Endpoints</h3>
            {endpoints && (
              <div className="space-y-3">
                {Object.entries(endpoints).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{value as string}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR Code for Mobile App */}
      <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mobile App Download</h3>
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
              <span className="text-gray-500">QR Code</span>
            </div>
            <p className="text-sm text-gray-600">Scan to download iOS app</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
              <span className="text-gray-500">QR Code</span>
            </div>
            <p className="text-sm text-gray-600">Scan to download Android app</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileConfig;