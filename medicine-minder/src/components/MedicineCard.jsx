import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
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
      {/* Updated CardHeader with enhanced name styling */}
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
          <button 
            onClick={() => onEdit(medicine)}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
          >
            <Edit className="w-4 h-4 text-gray-400 hover:text-blue-400" />
          </button>
          <button 
            onClick={handleDelete}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
          >
            <Trash className="w-4 h-4 text-gray-400 hover:text-red-400" />
          </button>
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
            <button
              onClick={() => onMarkTaken(medicine.id)}
              className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Mark as Taken
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineCard;