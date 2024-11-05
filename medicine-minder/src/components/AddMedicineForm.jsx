import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Clock, Pill, AlertCircle, X } from 'lucide-react';

const AddMedicineForm = ({ onAdd, onCancel, editingMedicine = null }) => {
  const [medicine, setMedicine] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    time: '09:00', // Default time
    instructions: ''
  });

  // Load editing medicine data when available
  useEffect(() => {
    if (editingMedicine) {
      const editTime = new Date(editingMedicine.nextDose)
        .toLocaleTimeString('en-US', { hour12: false })
        .slice(0, 5);

      setMedicine({
        name: editingMedicine.name || '',
        dosage: editingMedicine.dosage || '',
        frequency: editingMedicine.frequency || 'daily',
        time: editTime || '09:00',
        instructions: editingMedicine.instructions || ''
      });
    }
  }, [editingMedicine]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextDose = new Date();
    const [hours, minutes] = medicine.time.split(':');
    nextDose.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const medicineData = {
      ...medicine,
      nextDose: nextDose.toISOString(),
      isTaken: false,
      id: editingMedicine?.id || Date.now()
    };

    onAdd(medicineData);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl">
          {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
        </CardTitle>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-200">
          <X className="w-5 h-5" />
        </button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Pill className="w-4 h-4" />
              Medicine Name
            </label>
            <input
              type="text"
              required
              value={medicine.name}
              onChange={e => setMedicine({...medicine, name: e.target.value})}
              className="w-full p-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter medicine name"
            />
          </div>

          {/* Dosage and Frequency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Dosage</label>
              <input
                type="text"
                required
                value={medicine.dosage}
                onChange={e => setMedicine({...medicine, dosage: e.target.value})}
                className="w-full p-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 1 pill"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Frequency</label>
              <select
                value={medicine.frequency}
                onChange={e => setMedicine({...medicine, frequency: e.target.value})}
                className="w-full p-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="twice-daily">Twice Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          {/* Time Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Clock className="w-4 h-4" />
              Time
            </label>
            <input
              type="time"
              required
              value={medicine.time}
              onChange={e => setMedicine({...medicine, time: e.target.value})}
              className="w-full p-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <AlertCircle className="w-4 h-4" />
              Instructions (Optional)
            </label>
            <textarea
              value={medicine.instructions}
              onChange={e => setMedicine({...medicine, instructions: e.target.value})}
              className="w-full p-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Special instructions..."
              rows={3}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {editingMedicine ? 'Update Medicine' : 'Add Medicine'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-700 text-gray-200 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMedicineForm;