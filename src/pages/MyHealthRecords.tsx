
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Filter, FileText, Pill, Activity, Calendar } from 'lucide-react';

interface HealthRecord {
  id: number;
  title: string;
  type: 'lab-report' | 'prescription' | 'imaging' | 'consultation';
  date: string;
  doctor: string;
  summary: string;
  status: string;
  fileUrl?: string;
}

const MyHealthRecords = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const [healthRecords] = useState<HealthRecord[]>([
    {
      id: 1,
      title: 'Complete Blood Count (CBC)',
      type: 'lab-report',
      date: '2024-01-20',
      doctor: 'Dr. Sarah Johnson',
      summary: 'All values within normal range. Hemoglobin: 14.2 g/dL, WBC: 7,200/μL',
      status: 'normal',
      fileUrl: '/reports/cbc-jan-2024.pdf'
    },
    {
      id: 2,
      title: 'Hypertension Medication',
      type: 'prescription',
      date: '2024-01-18',
      doctor: 'Dr. Michael Chen',
      summary: 'Amlodipine 5mg once daily. Take with food. Monitor BP weekly.',
      status: 'active',
    },
    {
      id: 3,
      title: 'Chest X-Ray',
      type: 'imaging',
      date: '2024-01-15',
      doctor: 'Dr. Emily Davis',
      summary: 'Clear lung fields. No abnormalities detected. Heart size normal.',
      status: 'normal',
      fileUrl: '/reports/chest-xray-jan-2024.pdf'
    },
    {
      id: 4,
      title: 'General Consultation',
      type: 'consultation',
      date: '2024-01-10',
      doctor: 'Dr. Sarah Johnson',
      summary: 'Routine checkup. Vital signs stable. Discussed lifestyle modifications.',
      status: 'completed',
    },
    {
      id: 5,
      title: 'Lipid Profile',
      type: 'lab-report',
      date: '2024-01-08',
      doctor: 'Dr. Sarah Johnson',
      summary: 'Total cholesterol: 195 mg/dL. LDL: 120 mg/dL (slightly elevated)',
      status: 'attention',
      fileUrl: '/reports/lipid-profile-jan-2024.pdf'
    }
  ]);

  const filterTypes = [
    { value: 'all', label: 'All Records', icon: FileText },
    { value: 'lab-report', label: 'Lab Reports', icon: Activity },
    { value: 'prescription', label: 'Prescriptions', icon: Pill },
    { value: 'imaging', label: 'Imaging', icon: FileText },
    { value: 'consultation', label: 'Consultations', icon: Calendar }
  ];

  const filteredRecords = selectedFilter === 'all' 
    ? healthRecords 
    : healthRecords.filter(record => record.type === selectedFilter);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab-report':
        return <Activity className="w-5 h-5" />;
      case 'prescription':
        return <Pill className="w-5 h-5" />;
      case 'imaging':
        return <FileText className="w-5 h-5" />;
      case 'consultation':
        return <Calendar className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      normal: 'bg-green-100 text-green-800',
      active: 'bg-blue-100 text-blue-800',
      attention: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-gray-100 text-gray-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeLabel = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#c9e6e8' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#013c22' }}>My Health Records</h1>
          <p className="text-gray-600">Your complete medical history and health timeline</p>
        </div>

        {/* Filter Section */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center" style={{ color: '#013c22' }}>
                <Filter className="w-5 h-5 mr-2" />
                Filter Records
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                style={{ borderColor: '#093e43', color: '#093e43' }}
                className="hover:bg-gray-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {filterTypes.map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <Button
                    key={filter.value}
                    variant={selectedFilter === filter.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter.value)}
                    className={selectedFilter === filter.value 
                      ? "text-white" 
                      : "border-gray-300"
                    }
                    style={{
                      backgroundColor: selectedFilter === filter.value ? '#013c22' : 'transparent',
                      color: selectedFilter === filter.value ? 'white' : '#013c22'
                    }}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Records Timeline */}
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <Card key={record.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: '#c9e6e8', color: '#093e43' }}
                    >
                      {getTypeIcon(record.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg" style={{ color: '#013c22' }}>
                            {record.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            by {record.doctor} • {new Date(record.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(record.type)}
                          </Badge>
                          <Badge className={getStatusBadge(record.status)}>
                            {record.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{record.summary}</p>
                      
                      <div className="flex items-center space-x-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          style={{ borderColor: '#093e43', color: '#093e43' }}
                          className="hover:bg-gray-50"
                        >
                          View Details
                        </Button>
                        {record.fileUrl && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            style={{ borderColor: '#093e43', color: '#093e43' }}
                            className="hover:bg-gray-50"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
              <p className="text-gray-600">
                No health records match your current filter selection.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyHealthRecords;
