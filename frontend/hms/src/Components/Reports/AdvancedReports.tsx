import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDailyReport, getMonthlyReport, getAnalytics } from '../../Services/ReportServices';

const AdvancedReports: React.FC = () => {
  const [dailyReport, setDailyReport] = useState<any>(null);
  const [monthlyReport, setMonthlyReport] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const [daily, monthly, analyticsData] = await Promise.all([
        getDailyReport(),
        getMonthlyReport(),
        getAnalytics()
      ]);
      setDailyReport(daily);
      setMonthlyReport(monthly);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Advanced Reports & Analytics</h2>
      
      {loading ? (
        <div className="text-center py-8">Loading reports...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Daily Report */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Revenue</h3>
            {dailyReport && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Revenue:</span>
                  <span className="font-semibold text-green-600">₹{dailyReport.totalRevenue?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transactions:</span>
                  <span className="font-semibold">{dailyReport.totalTransactions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Value:</span>
                  <span className="font-semibold">₹{dailyReport.avgTransactionValue?.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Monthly Report */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h3>
            {monthlyReport && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Revenue:</span>
                  <span className="font-semibold text-green-600">₹{monthlyReport.totalRevenue?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transactions:</span>
                  <span className="font-semibold">{monthlyReport.totalTransactions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Month:</span>
                  <span className="font-semibold">{monthlyReport.month}</span>
                </div>
              </div>
            )}
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h3>
            {analytics && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient Growth:</span>
                  <span className="font-semibold text-green-600">+{analytics.patientGrowth}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue Growth:</span>
                  <span className="font-semibold text-green-600">+{analytics.revenueGrowth}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bed Occupancy:</span>
                  <span className="font-semibold">{analytics.bedOccupancy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lab Utilization:</span>
                  <span className="font-semibold">{analytics.labUtilization}%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdvancedReports;