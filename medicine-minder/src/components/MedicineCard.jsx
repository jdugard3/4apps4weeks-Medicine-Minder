import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button'; // Add this import
import { Clock, Pill, AlertCircle, Trash, Edit } from 'lucide-react';
import { format } from 'date-fns';

const MedicineCard = ({ medicine, onMarkTaken, onDelete, onEdit }) => {
  const {
    name,
    dosage,
    frequency,
    nextDose,
    instructions,
    isTaken
  } = medicine;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      onDelete(medicine.id);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col">
          <CardTitle className="text-xl font-bold text-blue-400 tracking-wide">
            {name}
          </CardTitle>
          <span className="text-sm text-gray-400 mt-1">
            {dosage}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(medicine)}
            className="hover:text-blue-400"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="hover:text-red-400"
          >
            <Trash className="w-4 h-4" />
          </Button>
          <div className={`p-1.5 rounded-full ${isTaken ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
            <Pill className={`w-5 h-5 ${isTaken ? 'text-green-400' : 'text-blue-400'}`} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-300 bg-gray-800/50 p-2 rounded-md">
            <Clock className="w-4 h-4 mr-2 text-blue-400" />
            <span>Next dose: {format(new Date(nextDose), 'h:mm a')}</span>
          </div>
          
          <div className="text-sm text-gray-400">
            {frequency}
          </div>
          
          {instructions && (
            <div className="flex items-start text-sm text-gray-400 mt-2 bg-gray-800/30 p-2 rounded-md">
              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 text-yellow-400" />
              <span>{instructions}</span>
            </div>
          )}
          
          {!isTaken && (
            <Button
              onClick={() => onMarkTaken(medicine.id)}
              className="mt-4 w-full"
            >
              Mark as Taken
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineCard;