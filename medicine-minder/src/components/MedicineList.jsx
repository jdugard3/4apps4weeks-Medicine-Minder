import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { List } from 'lucide-react';
import MedicineCard from './MedicineCard';

const MedicineList = ({ medicines, onMarkTaken, onDelete, onEdit }) => { // Add onEdit here
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <List className="w-5 h-5 text-gray-300" />
          All Medications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medicines.length === 0 ? (
            <p className="text-gray-400 col-span-2 text-center py-4">
              No medications added yet
            </p>
          ) : (
            medicines.map(medicine => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                onMarkTaken={onMarkTaken}
                onDelete={onDelete}
                onEdit={onEdit}  // Add this line
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineList;