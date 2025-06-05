
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pill, Calendar, Clock, User, Plus } from 'lucide-react';
import { format } from 'date-fns';

interface Prescription {
  id: string;
  doctor: {
    full_name: string;
  };
  medication_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  status: string;
  prescribed_date: string;
}

interface PrescriptionManagementProps {
  prescriptions: Prescription[];
  onRequestRefill?: (prescriptionId: string) => void;
}

const PrescriptionManagement = ({ prescriptions, onRequestRefill }: PrescriptionManagementProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const activePrescriptions = prescriptions.filter(p => p.status === 'active');
  const completedPrescriptions = prescriptions.filter(p => p.status === 'completed');

  const handleRefillRequest = (prescriptionId: string) => {
    if (onRequestRefill) {
      onRequestRefill(prescriptionId);
    }
  };

  const renderPrescriptionCard = (prescription: Prescription) => (
    <div key={prescription.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-arogya-light-blue rounded-full flex items-center justify-center">
            <Pill className="w-5 h-5 text-arogya-dark-green" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{prescription.medication_name}</h3>
            <p className="text-sm text-gray-600">{prescription.dosage}</p>
          </div>
        </div>
        <Badge variant={prescription.status === 'active' ? 'default' : 'secondary'}>
          {prescription.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>{prescription.frequency}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{prescription.duration}</span>
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-3">
        <User className="w-4 h-4 mr-1" />
        <span>Prescribed by {prescription.doctor.full_name}</span>
        <span className="mx-2">•</span>
        <span>{format(new Date(prescription.prescribed_date), 'MMM dd, yyyy')}</span>
      </div>

      {prescription.instructions && (
        <div className="bg-blue-50 p-3 rounded-lg mb-3">
          <p className="text-sm text-blue-800">
            <strong>Instructions:</strong> {prescription.instructions}
          </p>
        </div>
      )}

      <div className="flex space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setExpandedId(expandedId === prescription.id ? null : prescription.id)}
        >
          {expandedId === prescription.id ? 'Less Details' : 'More Details'}
        </Button>
        {prescription.status === 'active' && (
          <Button
            size="sm"
            onClick={() => handleRefillRequest(prescription.id)}
            className="bg-arogya-dark-green hover:bg-arogya-light-green text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Request Refill
          </Button>
        )}
      </div>

      {expandedId === prescription.id && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Detailed Information</h4>
          <div className="space-y-2 text-sm">
            <div><strong>Medication:</strong> {prescription.medication_name}</div>
            <div><strong>Dosage:</strong> {prescription.dosage}</div>
            <div><strong>Frequency:</strong> {prescription.frequency}</div>
            <div><strong>Duration:</strong> {prescription.duration}</div>
            <div><strong>Status:</strong> {prescription.status}</div>
            <div><strong>Prescribed Date:</strong> {format(new Date(prescription.prescribed_date), 'MMMM dd, yyyy')}</div>
            <div><strong>Doctor:</strong> {prescription.doctor.full_name}</div>
            {prescription.instructions && (
              <div><strong>Special Instructions:</strong> {prescription.instructions}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Active Prescriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-arogya-dark-teal flex items-center">
            <Pill className="w-5 h-5 mr-2" />
            Active Prescriptions ({activePrescriptions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activePrescriptions.length === 0 ? (
            <div className="text-center py-8">
              <Pill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Prescriptions</h3>
              <p className="text-gray-600">You don't have any active prescriptions at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activePrescriptions.map(renderPrescriptionCard)}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completed Prescriptions */}
      {completedPrescriptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-600 flex items-center">
              <Pill className="w-5 h-5 mr-2" />
              Completed Prescriptions ({completedPrescriptions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedPrescriptions.map(renderPrescriptionCard)}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PrescriptionManagement;
