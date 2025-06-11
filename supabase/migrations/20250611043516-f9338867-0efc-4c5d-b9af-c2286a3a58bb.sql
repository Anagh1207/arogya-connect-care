
-- Create enum for blood groups
CREATE TYPE public.blood_group AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');

-- Create enum for donor types
CREATE TYPE public.donor_type AS ENUM ('individual', 'blood_bank');

-- Create blood donors table
CREATE TABLE public.blood_donors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_name TEXT NOT NULL,
    donor_type public.donor_type NOT NULL DEFAULT 'individual',
    blood_group public.blood_group NOT NULL,
    contact_phone TEXT,
    address TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_available BOOLEAN DEFAULT true,
    last_donation_date DATE,
    consent_given BOOLEAN DEFAULT false,
    patient_id UUID REFERENCES public.patients(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create blood requests table
CREATE TABLE public.blood_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) NOT NULL,
    blood_group public.blood_group NOT NULL,
    units_needed INTEGER NOT NULL DEFAULT 1,
    urgency_level TEXT NOT NULL DEFAULT 'high',
    hospital_name TEXT,
    contact_person TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    status TEXT DEFAULT 'active',
    notes TEXT,
    requested_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blood_donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;

-- RLS policies for blood_donors
CREATE POLICY "Anyone can view available blood donors" 
    ON public.blood_donors 
    FOR SELECT 
    USING (is_available = true AND consent_given = true);

CREATE POLICY "Users can manage their own donor profile" 
    ON public.blood_donors 
    FOR ALL 
    USING (patient_id IN (SELECT id FROM public.patients WHERE id = auth.uid()));

-- RLS policies for blood_requests
CREATE POLICY "Anyone can view active blood requests" 
    ON public.blood_requests 
    FOR SELECT 
    USING (status = 'active');

CREATE POLICY "Authenticated users can create blood requests" 
    ON public.blood_requests 
    FOR INSERT 
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can manage their own blood requests" 
    ON public.blood_requests 
    FOR ALL 
    USING (requested_by = auth.uid());

-- Add indexes for better performance
CREATE INDEX idx_blood_donors_location ON public.blood_donors(latitude, longitude);
CREATE INDEX idx_blood_donors_blood_group ON public.blood_donors(blood_group);
CREATE INDEX idx_blood_requests_location ON public.blood_requests(latitude, longitude);
CREATE INDEX idx_blood_requests_blood_group ON public.blood_requests(blood_group);

-- Add blood_group column to patients table if it doesn't exist
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS blood_group public.blood_group;

-- Add donor consent column to patients table
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS donor_consent BOOLEAN DEFAULT false;
