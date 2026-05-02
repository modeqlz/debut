import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// ЗАМЕНИТЕ ЭТИ ДАННЫЕ НА СВОИ ИЗ НАСТРОЕК SUPABASE (Project Settings -> API)
const supabaseUrl = 'https://sujyedxcwkfudleiazod.supabase.co/';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1anllZHhjd2tmdWRsZWlhem9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MjIzMzksImV4cCI6MjA5MzE5ODMzOX0.1qnbB1Qd4R5F5FMP-SoG860vjl_IhPASMZgSo525dsA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
