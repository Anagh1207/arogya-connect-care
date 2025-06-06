import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, User, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Doctor {
  id: string;
  full_name: string;
  specialization: string;
  consultation_fee: number;
  verification_status: string;
}

interface BookAppointmentProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const BookAppointment = ({ onSuccess, onCancel }: BookAppointmentProps) => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date>();
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string>('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor && date) {
      fetchAvailableSlots();
    }
  }, [selectedDoctor, date]);

  const fetchDoctors = async () => {
    try {
      // First get verified doctors only
      const { data: doctorsData, error: doctorsError } = await supabase
        .from('doctors')
        .select('id, specialization, consultation_fee, verification_status')
        .eq('verification_status', 'verified');

      if (doctorsError) throw doctorsError;

      // Then get their profiles separately
      const doctorsWithProfiles = await Promise.all(
        (doctorsData || []).map(async (doctor) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', doctor.id)
            .single();

          return {
            id: doctor.id,
            full_name: profile?.full_name || 'Unknown Doctor',
            specialization: doctor.specialization,
            consultation_fee: doctor.consultation_fee || 0,
            verification_status: doctor.verification_status
          };
        })
      );

      setDoctors(doctorsWithProfiles);
    } catch (error: any) {
      console.error('Error fetching doctors:', error);
      toast({
        title: "Error",
        description: "Failed to load doctors",
        variant: "destructive",
      });
    }
  };

  const fetchAvailableSlots = async () => {
    if (!selectedDoctor || !date) return;

    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      
      // Generate default time slots (9 AM to 5 PM)
      const defaultSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00'
      ];

      // Check for existing appointments
      const { data: existingAppointments } = await supabase
        .from('appointments')
        .select('appointment_time')
        .eq('doctor_id', selectedDoctor)
        .eq('appointment_date', dateStr)
        .neq('status', 'cancelled');

      const bookedSlots = existingAppointments?.map(apt => apt.appointment_time) || [];
      const available = defaultSlots.filter(slot => !bookedSlots.includes(slot));
      
      setAvailableSlots(available);
    } catch (error: any) {
      console.error('Error fetching available slots:', error);
    }
  };

  const handleBookAppointment = async () => {
    if (!user || !selectedDoctor || !date || !selectedTime) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .insert({
          patient_id: user.id,
          doctor_id: selectedDoctor,
          appointment_date: format(date, 'yyyy-MM-dd'),
          appointment_time: selectedTime,
          symptoms: symptoms || null,
          status: 'scheduled'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Appointment booked successfully!",
      });

      onSuccess();
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Error",
        description: "Failed to book appointment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedDoctorInfo = doctors.find(doc => doc.id === selectedDoctor);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-arogya-dark-teal">Book New Appointment</CardTitle>
        <p className="text-sm text-gray-600">Only verified doctors are available for booking</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="doctor">Select Doctor</Label>
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a verified doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map(doctor => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    <div className="flex items-center space-x-2">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{doctor.full_name}</span>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                        <span className="text-sm text-gray-500">{doctor.specialization}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {doctors.length === 0 && (
              <p className="text-sm text-gray-500">No verified doctors available at the moment</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {selectedDoctor && date && (
          <div className="space-y-2">
            <Label>Available Time Slots</Label>
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map(slot => (
                <Button
                  key={slot}
                  variant={selectedTime === slot ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(slot)}
                  className="justify-center"
                >
                  <Clock className="w-4 h-4 mr-1" />
                  {slot}
                </Button>
              ))}
            </div>
            {availableSlots.length === 0 && (
              <p className="text-gray-500 text-sm">No available slots for this date</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="symptoms">Symptoms (Optional)</Label>
          <Textarea
            id="symptoms"
            placeholder="Describe your symptoms..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={3}
          />
        </div>

        {selectedDoctorInfo && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-blue-900">{selectedDoctorInfo.full_name}</p>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified</span>
                </div>
                <p className="text-sm text-blue-700">{selectedDoctorInfo.specialization}</p>
                <p className="text-sm text-blue-600">Consultation Fee: ₹{selectedDoctorInfo.consultation_fee}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <Button 
            onClick={handleBookAppointment}
            disabled={loading || !selectedDoctor || !date || !selectedTime}
            className="flex-1 bg-arogya-dark-green hover:bg-arogya-light-green text-white"
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookAppointment;
