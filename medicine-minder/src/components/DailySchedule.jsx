import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Calendar } from 'lucide-react';
import MedicineCard from './MedicineCard';
import { format } from 'date-fns';

const DailySchedule = ({ medicines, onMarkTaken, onDelete, onEdit }) => { // Add onEdit here
  const today = new Date();
  
  const sortedMedicines = [...medicines].sort((a, b) => 
    new Date(a.nextDose) - new Date(b.nextDose)
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-300" />
          Today's Schedule
        </CardTitle>
        <span className="text-sm text-gray-400">
          {format(today, 'EEEE, MMMM d')}
        </span>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedMedicines.length === 0 ? (
            <p className="text-gray-400 text-center py-4">
              No medications scheduled for today
            </p>
          ) : (
            sortedMedicines.map(medicine => (
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

export default DailySchedule;