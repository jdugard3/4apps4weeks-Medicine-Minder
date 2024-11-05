import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import DailySchedule from './components/DailySchedule';
import MedicineList from './components/MedicineList';
import AddMedicineForm from './components/AddMedicineForm';

function App() {
  const [medicines, setMedicines] = useState(() => {
    const saved = localStorage.getItem('medicines');
    console.log('Loading saved medicines:', saved);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isAddingMedicine, setIsAddingMedicine] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);

  useEffect(() => {
    localStorage.setItem('medicines', JSON.stringify(medicines));
  }, [medicines]);

  const addMedicine = (medicine) => {
    console.log('Adding/Editing medicine:', medicine);
    if (editingMedicine) {
      setMedicines(medicines.map(med => 
        med.id === medicine.id ? medicine : med
      ));
      setEditingMedicine(null);
    } else {
      setMedicines([...medicines, { ...medicine, id: Date.now() }]);
    }
    setIsAddingMedicine(false);
  };

  const deleteMedicine = (id) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  // Add this function that was missing
  const markMedicineAsTaken = (id) => {
    setMedicines(medicines.map(med => 
      med.id === id ? { ...med, isTaken: true } : med
    ));
  };

  const handleEdit = (medicine) => {
    console.log('Editing medicine:', medicine);
    setEditingMedicine(medicine);
    setIsAddingMedicine(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-100">Medicine Minder</h1>
          <button
            onClick={() => {
              setEditingMedicine(null);
              setIsAddingMedicine(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Medicine
          </button>
        </div>

        <div>
          {isAddingMedicine ? (
            <AddMedicineForm 
              onAdd={addMedicine}
              onCancel={() => {
                setIsAddingMedicine(false);
                setEditingMedicine(null);
              }}
              editingMedicine={editingMedicine}
            />
          ) : (
            medicines.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No medications added yet. Click "Add Medicine" to get started.
              </div>
            ) : (
              <div className="space-y-6">
                <DailySchedule 
                  medicines={medicines}
                  onMarkTaken={markMedicineAsTaken}
                  onDelete={deleteMedicine}
                  onEdit={handleEdit}
                />
                <MedicineList 
                  medicines={medicines}
                  onMarkTaken={markMedicineAsTaken}
                  onDelete={deleteMedicine}
                  onEdit={handleEdit}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;