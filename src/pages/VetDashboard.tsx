import React, { useState, useEffect } from "react";
import "./VetDashboard.css";

// Types matching your backend structure
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface PetImage {
  _id: string;
  url: string;
  isPrimary: boolean;
}

interface Pet {
  _id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  status: string;
  healthNotes?: string;
  images: PetImage[];
  vet?: User;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface MedicalRecord {
  _id: string;
  pet: Pet;
  diagnosis: string;
  treatment: string;
  medications: Medication[];
  notes: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  nextCheckup?: string;
  date: string;
  vet: User;
}

interface Vaccination {
  _id: string;
  pet: Pet;
  vaccineName: string;
  dateAdministered: string;
  nextDueDate: string;
  notes: string;
  administeredBy: User;
}

const VetDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [myPatients, setMyPatients] = useState<Pet[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [activeTab, setActiveTab] = useState<'patients' | 'medical' | 'vaccinations'>('patients');
  const [loading, setLoading] = useState(false);

  // Form states
  const [medicalRecordForm, setMedicalRecordForm] = useState({
    petId: "",
    diagnosis: "",
    treatment: "",
    notes: "",
    urgency: "medium" as 'low' | 'medium' | 'high' | 'critical',
    nextCheckup: ""
  });

  const [vaccinationForm, setVaccinationForm] = useState({
    petId: "",
    vaccineName: "",
    dateAdministered: "",
    nextDueDate: "",
    notes: ""
  });

  const [medications, setMedications] = useState<Medication[]>([]);
  const [pendingBoosterFor, setPendingBoosterFor] = useState<string | null>(null); // Track which overdue vaccination we're creating a booster for

  // Initialize with dummy data
  useEffect(() => {
    loadDummyData();
    setDefaultVaccinationDates();
  }, []);

  const loadDummyData = () => {
    // Dummy user data
    setUser({
      _id: "vet1",
      name: "Dr. Jivesh Malhotra",
      email: "jivesh@petconnect.org",
      role: "vet"
    });

    // Dummy patients
    const patients: Pet[] = [
      {
        _id: "pet1",
        name: "Buddy",
        breed: "Golden Retriever",
        age: 3,
        gender: "Male",
        status: "In Treatment",
        healthNotes: "Recovering from sprain. Prescribed anti-inflammatory medication.",
        images: [
          { 
            _id: "img1", 
            url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop", 
            isPrimary: true 
          }
        ]
      },
      {
        _id: "pet2",
        name: "Luna",
        breed: "Siamese",
        age: 2,
        gender: "Female",
        status: "Available",
        healthNotes: "Up-to-date on vaccinations. Healthy weight and condition.",
        images: [
          { 
            _id: "img2", 
            url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop", 
            isPrimary: true 
          }
        ]
      },
      {
        _id: "pet3",
        name: "Max",
        breed: "Labrador",
        age: 4,
        gender: "Male",
        status: "Needs Follow-up",
        healthNotes: "Annual checkup due. Dental cleaning recommended.",
        images: [
          { 
            _id: "img3", 
            url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop", 
            isPrimary: true 
          }
        ]
      },
      {
        _id: "pet4",
        name: "Bella",
        breed: "Beagle",
        age: 5,
        gender: "Female",
        status: "In Treatment",
        healthNotes: "Allergy treatment ongoing. Responding well to medication.",
        images: [
          { 
            _id: "img4", 
            url: "https://images.unsplash.com/photo-1593134257782-e89567b7718a?w=300&h=200&fit=crop", 
            isPrimary: true 
          }
        ]
      }
    ];

    setMyPatients(patients);

    // Dummy medical records
    setMedicalRecords([
      {
        _id: "record1",
        pet: patients[0],
        diagnosis: "Right hind leg sprain",
        treatment: "Rest and anti-inflammatory medication",
        medications: [
          {
            name: "Carprofen",
            dosage: "25mg",
            frequency: "2x daily",
            duration: "7 days"
          }
        ],
        notes: "Mild swelling observed. No fracture detected in X-ray.",
        urgency: "medium",
        nextCheckup: "2024-12-28",
        date: new Date().toISOString(),
        vet: {
          _id: "vet1",
          name: "Dr. Sarah Wilson",
          email: "sarah@petconnect.org",
          role: "vet"
        }
      },
      {
        _id: "record2",
        pet: patients[3],
        diagnosis: "Seasonal allergies",
        treatment: "Antihistamine therapy",
        medications: [
          {
            name: "Cetirizine",
            dosage: "10mg",
            frequency: "1x daily",
            duration: "14 days"
          }
        ],
        notes: "Excessive scratching and ear inflammation. Responding well to treatment.",
        urgency: "low",
        nextCheckup: "2024-12-20",
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        vet: {
          _id: "vet1",
          name: "Dr. Jivesh Malhotra",
          email: "jivesh@petconnect.org",
          role: "vet"
        }
      }
    ]);

    // Dummy vaccinations
    setVaccinations([
      {
        _id: "vax1",
        pet: patients[1],
        vaccineName: "FVRCP",
        dateAdministered: "2024-06-15",
        nextDueDate: "2025-06-15",
        notes: "No adverse reactions observed",
        administeredBy: {
          _id: "vet1",
          name: "Dr. Sarah Wilson",
          email: "sarah@petconnect.org",
          role: "vet"
        }
      },
      {
        _id: "vax2",
        pet: patients[0],
        vaccineName: "Rabies",
        dateAdministered: "2024-01-10",
        nextDueDate: "2025-01-10",
        notes: "Booster vaccination",
        administeredBy: {
          _id: "vet1",
          name: "Dr. Sarah Wilson",
          email: "sarah@petconnect.org",
          role: "vet"
        }
      },
      {
        _id: "vax3",
        pet: patients[2],
        vaccineName: "DHPP",
        dateAdministered: "2023-12-01",
        nextDueDate: "2024-06-01",
        notes: "Overdue for booster",
        administeredBy: {
          _id: "vet1",
          name: "Dr. Sarah Wilson",
          email: "sarah@petconnect.org",
          role: "vet"
        }
      }
    ]);
  };

  const setDefaultVaccinationDates = () => {
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    setVaccinationForm(prev => ({
      ...prev,
      dateAdministered: today.toISOString().split('T')[0],
      nextDueDate: nextYear.toISOString().split('T')[0]
    }));
  };

  // Helper function to check if vaccination is overdue
  const isVaccinationOverdue = (vaccination: Vaccination) => {
    return new Date(vaccination.nextDueDate) < new Date();
  };

  // Get overdue vaccinations
  const getOverdueVaccinations = () => {
    return vaccinations.filter(vax => isVaccinationOverdue(vax));
  };

  // Get recent vaccinations (non-overdue)
  const getRecentVaccinations = () => {
    return vaccinations.filter(vax => !isVaccinationOverdue(vax)).slice(0, 5);
  };

  // Stats calculation
  const stats = {
    patientsCount: myPatients.length,
    overdueVaccinations: getOverdueVaccinations().length,
    upcomingCheckups: medicalRecords.filter(record => 
      record.nextCheckup && new Date(record.nextCheckup) >= new Date()
    ).length,
    todayDate: new Date().toLocaleDateString()
  };

  // Form handlers
  const handleMedicalRecordFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMedicalRecordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleVaccinationFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVaccinationForm(prev => ({ ...prev, [name]: value }));
  };

  // Medication handlers
  const addMedication = () => {
    setMedications(prev => [...prev, { name: "", dosage: "", frequency: "", duration: "" }]);
  };

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    setMedications(prev => prev.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    ));
  };

  const removeMedication = (index: number) => {
    setMedications(prev => prev.filter((_, i) => i !== index));
  };

  // Action handlers
  const handleAddMedicalRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicalRecordForm.petId || !medicalRecordForm.diagnosis) {
      alert("Please select a pet and enter a diagnosis");
      return;
    }

    setLoading(true);
    try {
      const newRecord: MedicalRecord = {
        _id: `record${Date.now()}`,
        pet: myPatients.find(pet => pet._id === medicalRecordForm.petId)!,
        diagnosis: medicalRecordForm.diagnosis,
        treatment: medicalRecordForm.treatment,
        medications: medications.filter(med => med.name.trim() !== ""),
        notes: medicalRecordForm.notes,
        urgency: medicalRecordForm.urgency,
        nextCheckup: medicalRecordForm.nextCheckup || undefined,
        date: new Date().toISOString(),
        vet: user!
      };

      setMedicalRecords(prev => [newRecord, ...prev]);
      
      // Reset form
      setMedicalRecordForm({
        petId: "",
        diagnosis: "",
        treatment: "",
        notes: "",
        urgency: "medium",
        nextCheckup: ""
      });
      setMedications([]);

      alert("✅ Medical record added successfully!");
    } catch (error) {
      console.error('Error adding medical record:', error);
      alert("❌ Failed to add medical record");
    } finally {
      setLoading(false);
    }
  };

  const handleAddVaccination = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vaccinationForm.petId || !vaccinationForm.vaccineName || !vaccinationForm.dateAdministered || !vaccinationForm.nextDueDate) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const newVaccination: Vaccination = {
        _id: `vax${Date.now()}`,
        pet: myPatients.find(pet => pet._id === vaccinationForm.petId)!,
        vaccineName: vaccinationForm.vaccineName,
        dateAdministered: vaccinationForm.dateAdministered,
        nextDueDate: vaccinationForm.nextDueDate,
        notes: vaccinationForm.notes,
        administeredBy: user!
      };

      // Check if this is a booster for an overdue vaccination
      const isBooster = vaccinationForm.notes.includes('Booster') || 
                       vaccinationForm.vaccineName.includes('Booster') ||
                       pendingBoosterFor !== null;
      
      if (isBooster && pendingBoosterFor) {
        // Remove the overdue vaccination that we're creating a booster for
        setVaccinations(prev => prev.filter(vax => vax._id !== pendingBoosterFor));
        setPendingBoosterFor(null); // Reset the pending booster
      }

      // Add the new vaccination
      setVaccinations(prev => [newVaccination, ...prev]);
      
      // Reset form
      setVaccinationForm({
        petId: "",
        vaccineName: "",
        dateAdministered: "",
        nextDueDate: "",
        notes: ""
      });

      setDefaultVaccinationDates();

      alert("✅ Vaccination recorded successfully!" + (isBooster ? " Overdue vaccination removed." : ""));
    } catch (error) {
      console.error('Error recording vaccination:', error);
      alert("❌ Failed to record vaccination");
    } finally {
      setLoading(false);
    }
  };

  const handleRecordBooster = (overdueVaccination: Vaccination) => {
    // Pre-fill the form with booster information
    setVaccinationForm({
      petId: overdueVaccination.pet._id,
      vaccineName: `${overdueVaccination.vaccineName} (Booster)`,
      dateAdministered: new Date().toISOString().split('T')[0],
      nextDueDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      notes: 'Booster vaccination administered'
    });

    // Store which overdue vaccination we're creating a booster for
    setPendingBoosterFor(overdueVaccination._id);

    // Switch to vaccinations tab
    setActiveTab('vaccinations');
    
    alert(`✅ ${overdueVaccination.vaccineName} booster prepared for ${overdueVaccination.pet.name}. Please review and submit the form.`);
  };

  const handleQuickHealthUpdate = (petId: string) => {
    const pet = myPatients.find(p => p._id === petId);
    if (pet) {
      const notes = prompt(`Quick health update for ${pet.name}:`, pet.healthNotes || '');
      if (notes !== null) {
        setMyPatients(prev => prev.map(p => 
          p._id === petId ? { ...p, healthNotes: notes } : p
        ));
        alert(`Health notes updated for ${pet.name}`);
      }
    }
  };

  const handleViewMedicalHistory = (petId: string) => {
    const pet = myPatients.find(p => p._id === petId);
    const petRecords = medicalRecords.filter(record => record.pet._id === petId);
    alert(`Medical history for ${pet?.name}\n\nTotal records: ${petRecords.length}`);
  };

  const handleRefreshData = () => {
    setLoading(true);
    setTimeout(() => {
      loadDummyData();
      setPendingBoosterFor(null);
      setLoading(false);
      alert("Data refreshed!");
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Available': 'vet-status-available',
      'In Treatment': 'vet-status-treatment',
      'Needs Follow-up': 'vet-status-followup',
      'Adopted': 'vet-status-adopted',
      'Unavailable': 'vet-status-unavailable'
    };
    return colors[status] || 'vet-status-default';
  };

  const getUrgencyColor = (urgency: string) => {
    const colors: { [key: string]: string } = {
      'low': 'vet-urgency-low',
      'medium': 'vet-urgency-medium',
      'high': 'vet-urgency-high',
      'critical': 'vet-urgency-critical'
    };
    return colors[urgency] || 'vet-urgency-medium';
  };

  const getVaccinationStatus = (nextDueDate: string) => {
    return new Date(nextDueDate) < new Date() ? 'overdue' : 'upcoming';
  };

  if (!user) {
    return <div className="vet-loading">Loading...</div>;
  }

  return (
    <div className="vet-dashboard">
      {/* Header */}
      <div className="vet-dashboard-header">
        <div className="vet-header-content">
          <div>
            <h1 className="vet-dashboard-title">🏥 Vet Dashboard</h1>
            <p className="vet-info">Welcome, {user.name} | {user.email}</p>
          </div>
          <div className="vet-header-actions">
            <button onClick={handleRefreshData} className="vet-refresh-btn">
              🔄 Refresh
            </button>
            <button className="vet-profile-btn" onClick={() => window.location.href = '/profile'}>
              👤 My Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="vet-stats-grid">
        <div className="vet-stat-card">
          <h3>My Patients</h3>
          <p className="vet-stat-number">{stats.patientsCount}</p>
        </div>
        <div className="vet-stat-card">
          <h3>Overdue Vaccinations</h3>
          <p className="vet-stat-number">{stats.overdueVaccinations}</p>
        </div>
        <div className="vet-stat-card">
          <h3>Upcoming Checkups</h3>
          <p className="vet-stat-number">{stats.upcomingCheckups}</p>
        </div>
        <div className="vet-stat-card">
          <h3>Today's Date</h3>
          <p className="vet-stat-date">{stats.todayDate}</p>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="vet-main-section">
        <div className="vet-tabs">
          <button 
            className={`vet-tab ${activeTab === 'patients' ? 'vet-tab-active' : ''}`}
            onClick={() => setActiveTab('patients')}
          >
            My Patients
          </button>
          <button 
            className={`vet-tab ${activeTab === 'medical' ? 'vet-tab-active' : ''}`}
            onClick={() => setActiveTab('medical')}
          >
            Medical Records
          </button>
          <button 
            className={`vet-tab ${activeTab === 'vaccinations' ? 'vet-tab-active' : ''}`}
            onClick={() => setActiveTab('vaccinations')}
          >
            Vaccinations
          </button>
        </div>

        {/* Tab Content */}
        <div className="vet-tab-content">
          {/* Patients Tab */}
          {activeTab === 'patients' && (
            <div className="vet-tab-panel">
              <div className="vet-section-header">
                <h2>My Assigned Patients</h2>
                <div className="vet-section-status">
                  {myPatients.length} patients assigned
                </div>
              </div>
              
              <div className="vet-patients-list">
                {myPatients.length === 0 ? (
                  <div className="vet-empty-state">
                    <p>No patients assigned to you yet.</p>
                  </div>
                ) : (
                  myPatients.map(patient => (
                    <div key={patient._id} className="vet-patient-card">
                      <div className="vet-patient-content">
                        {/* Pet Image */}
                        <div className="vet-patient-image">
                          {patient.images && patient.images.length > 0 ? (
                            <img 
                              src={patient.images.find(img => img.isPrimary)?.url || patient.images[0].url} 
                              alt={patient.name}
                              className="vet-pet-image"
                            />
                          ) : (
                            <div className="vet-pet-image-placeholder">
                              No Image
                            </div>
                          )}
                        </div>
                        
                        {/* Patient Info */}
                        <div className="vet-patient-info">
                          <div className="vet-patient-header">
                            <h3 className="vet-patient-name">{patient.name}</h3>
                            <span className={`vet-status-badge ${getStatusColor(patient.status)}`}>
                              {patient.status}
                            </span>
                          </div>
                          
                          <div className="vet-patient-details">
                            <div className="vet-detail-row">
                              <span className="vet-detail-label">Breed:</span>
                              <span>{patient.breed || 'Unknown'}</span>
                            </div>
                            <div className="vet-detail-row">
                              <span className="vet-detail-label">Age:</span>
                              <span>{patient.age || 'Unknown'} years</span>
                            </div>
                            <div className="vet-detail-row">
                              <span className="vet-detail-label">Gender:</span>
                              <span>{patient.gender || 'Unknown'}</span>
                            </div>
                          </div>

                          <div className="vet-health-notes">
                            <strong>Health Notes:</strong> 
                            <span>{patient.healthNotes || 'No notes yet'}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="vet-patient-actions">
                          <button 
                            onClick={() => handleQuickHealthUpdate(patient._id)}
                            className="vet-action-btn vet-action-secondary"
                          >
                            Quick Update
                          </button>
                          <button 
                            onClick={() => handleViewMedicalHistory(patient._id)}
                            className="vet-action-btn vet-action-primary"
                          >
                            View History
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Medical Records Tab */}
          {activeTab === 'medical' && (
            <div className="vet-tab-panel">
              <div className="vet-medical-grid">
                <div className="vet-medical-form-section">
                  <h3>Add Medical Record</h3>
                  <form onSubmit={handleAddMedicalRecord} className="vet-medical-form">
                    <div className="vet-form-group">
                      <select
                        name="petId"
                        value={medicalRecordForm.petId}
                        onChange={handleMedicalRecordFormChange}
                        className="vet-form-select"
                        required
                      >
                        <option value="">Select a patient</option>
                        {myPatients.map(patient => (
                          <option key={patient._id} value={patient._id}>
                            {patient.name} ({patient.breed})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="vet-form-group">
                      <input
                        type="text"
                        name="diagnosis"
                        value={medicalRecordForm.diagnosis}
                        onChange={handleMedicalRecordFormChange}
                        placeholder="Diagnosis *"
                        className="vet-form-input"
                        required
                      />
                    </div>

                    <div className="vet-form-group">
                      <input
                        type="text"
                        name="treatment"
                        value={medicalRecordForm.treatment}
                        onChange={handleMedicalRecordFormChange}
                        placeholder="Treatment"
                        className="vet-form-input"
                      />
                    </div>

                    {/* Medications Section */}
                    <div className="vet-medications-section">
                      <h4>💊 Medications</h4>
                      {medications.map((medication, index) => (
                        <div key={index} className="vet-medication-field">
                          <div className="vet-medication-header">
                            <span>Medication #{index + 1}</span>
                            <button 
                              type="button" 
                              onClick={() => removeMedication(index)}
                              className="vet-remove-medication"
                            >
                              🗑️ Remove
                            </button>
                          </div>
                          <div className="vet-medication-grid">
                            <input
                              type="text"
                              placeholder="Medication Name"
                              value={medication.name}
                              onChange={(e) => updateMedication(index, 'name', e.target.value)}
                              className="vet-form-input"
                            />
                            <input
                              type="text"
                              placeholder="Dosage (e.g., 10mg)"
                              value={medication.dosage}
                              onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                              className="vet-form-input"
                            />
                            <input
                              type="text"
                              placeholder="Frequency (e.g., 2x daily)"
                              value={medication.frequency}
                              onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                              className="vet-form-input"
                            />
                            <input
                              type="text"
                              placeholder="Duration (e.g., 7 days)"
                              value={medication.duration}
                              onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                              className="vet-form-input"
                            />
                          </div>
                        </div>
                      ))}
                      <button 
                        type="button" 
                        onClick={addMedication}
                        className="vet-add-medication-btn"
                      >
                        + Add Medication
                      </button>
                    </div>

                    <div className="vet-form-group">
                      <textarea
                        name="notes"
                        value={medicalRecordForm.notes}
                        onChange={handleMedicalRecordFormChange}
                        placeholder="Notes"
                        className="vet-form-textarea"
                        rows={3}
                      />
                    </div>

                    <div className="vet-form-group">
                      <select
                        name="urgency"
                        value={medicalRecordForm.urgency}
                        onChange={handleMedicalRecordFormChange}
                        className="vet-form-select"
                      >
                        <option value="low">Low Urgency</option>
                        <option value="medium">Medium Urgency</option>
                        <option value="high">High Urgency</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>

                    <div className="vet-form-group">
                      <input
                        type="date"
                        name="nextCheckup"
                        value={medicalRecordForm.nextCheckup}
                        onChange={handleMedicalRecordFormChange}
                        className="vet-form-input"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="vet-primary-btn vet-form-submit"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Add Medical Record'}
                    </button>
                  </form>
                </div>

                <div className="vet-recent-records">
                  <h3>Recent Medical Records</h3>
                  <div className="vet-records-list">
                    {medicalRecords.length === 0 ? (
                      <div className="vet-empty-state">
                        <p>No medical records yet</p>
                      </div>
                    ) : (
                      medicalRecords.map(record => (
                        <div key={record._id} className="vet-record-card">
                          <div className="vet-record-header">
                            <div>
                              <h4>{record.pet.name}</h4>
                              <p className="vet-record-date">
                                {new Date(record.date).toLocaleDateString()}
                              </p>
                            </div>
                            <span className={`vet-urgency-badge ${getUrgencyColor(record.urgency)}`}>
                              {record.urgency.toUpperCase()}
                            </span>
                          </div>
                          
                          <div className="vet-record-details">
                            <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                            {record.treatment && <p><strong>Treatment:</strong> {record.treatment}</p>}
                            
                            {record.medications.length > 0 && (
                              <div className="vet-record-medications">
                                <strong>💊 Medications:</strong>
                                {record.medications.map((med, index) => (
                                  <div key={index} className="vet-medication-display">
                                    <span><strong>{med.name}</strong> {med.dosage}</span>
                                    <span>{med.frequency} • {med.duration}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {record.notes && <p><strong>Notes:</strong> {record.notes}</p>}
                            {record.nextCheckup && (
                              <p className="vet-next-checkup">
                                <strong>Next Checkup:</strong> {new Date(record.nextCheckup).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vaccinations Tab */}
          {activeTab === 'vaccinations' && (
            <div className="vet-tab-panel">
              <h2>Vaccination Management</h2>
              <div className="vet-vaccinations-grid">
                <div className="vet-vaccination-form-section">
                  <h3>Record Vaccination</h3>
                  {pendingBoosterFor && (
                    <div className="vet-booster-notice">
                      <p>📝 <strong>Booster Prepared:</strong> You are recording a booster for an overdue vaccination. Submit to complete.</p>
                    </div>
                  )}
                  <form onSubmit={handleAddVaccination} className="vet-vaccination-form">
                    <div className="vet-form-group">
                      <select
                        name="petId"
                        value={vaccinationForm.petId}
                        onChange={handleVaccinationFormChange}
                        className="vet-form-select"
                        required
                      >
                        <option value="">Select a patient</option>
                        {myPatients.map(patient => (
                          <option key={patient._id} value={patient._id}>
                            {patient.name} ({patient.breed})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="vet-form-group">
                      <input
                        type="text"
                        name="vaccineName"
                        value={vaccinationForm.vaccineName}
                        onChange={handleVaccinationFormChange}
                        placeholder="Vaccine Name *"
                        className="vet-form-input"
                        required
                      />
                    </div>

                    <div className="vet-form-group">
                      <input
                        type="date"
                        name="dateAdministered"
                        value={vaccinationForm.dateAdministered}
                        onChange={handleVaccinationFormChange}
                        className="vet-form-input"
                        required
                      />
                    </div>

                    <div className="vet-form-group">
                      <input
                        type="date"
                        name="nextDueDate"
                        value={vaccinationForm.nextDueDate}
                        onChange={handleVaccinationFormChange}
                        className="vet-form-input"
                        required
                      />
                    </div>

                    <div className="vet-form-group">
                      <textarea
                        name="notes"
                        value={vaccinationForm.notes}
                        onChange={handleVaccinationFormChange}
                        placeholder="Notes"
                        className="vet-form-textarea"
                        rows={3}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="vet-primary-btn vet-form-submit"
                      disabled={loading}
                    >
                      {loading ? 'Recording...' : 'Record Vaccination'}
                    </button>
                  </form>
                </div>

                <div className="vet-vaccination-lists">
                  {/* Overdue Vaccinations */}
                  <div className="vet-overdue-vaccinations">
                    <h3>⚠️ Overdue Vaccinations ({getOverdueVaccinations().length})</h3>
                    <div className="vet-vaccinations-list">
                      {getOverdueVaccinations().length === 0 ? (
                        <div className="vet-empty-state">
                          <p>No overdue vaccinations 🎉</p>
                        </div>
                      ) : (
                        getOverdueVaccinations().map(vaccination => (
                          <div key={vaccination._id} className="vet-vaccination-card vet-vaccination-overdue">
                            <div className="vet-vaccination-header">
                              <h4>{vaccination.pet.name}</h4>
                              <span className="vet-overdue-badge">OVERDUE</span>
                            </div>
                            <p><strong>Vaccine:</strong> {vaccination.vaccineName}</p>
                            <p><strong>Last Administered:</strong> {new Date(vaccination.dateAdministered).toLocaleDateString()}</p>
                            <p><strong>Due Date:</strong> {new Date(vaccination.nextDueDate).toLocaleDateString()}</p>
                            {vaccination.notes && <p><strong>Notes:</strong> {vaccination.notes}</p>}
                            <button 
                              onClick={() => handleRecordBooster(vaccination)}
                              className="vet-action-btn vet-action-primary"
                            >
                              Record Booster
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Recent Vaccinations */}
                  <div className="vet-recent-vaccinations">
                    <h3>📋 Recent Vaccinations ({getRecentVaccinations().length})</h3>
                    <div className="vet-vaccinations-list">
                      {getRecentVaccinations().length === 0 ? (
                        <div className="vet-empty-state">
                          <p>No recent vaccinations</p>
                        </div>
                      ) : (
                        getRecentVaccinations().map(vaccination => (
                          <div key={vaccination._id} className="vet-vaccination-card">
                            <div className="vet-vaccination-header">
                              <h4>{vaccination.pet.name}</h4>
                              <span className={`vet-vaccination-status vet-status-${getVaccinationStatus(vaccination.nextDueDate)}`}>
                                {getVaccinationStatus(vaccination.nextDueDate) === 'overdue' ? 'Overdue' : 'Upcoming'}
                              </span>
                            </div>
                            <p><strong>Vaccine:</strong> {vaccination.vaccineName}</p>
                            <p><strong>Administered:</strong> {new Date(vaccination.dateAdministered).toLocaleDateString()}</p>
                            <p><strong>Next Due:</strong> {new Date(vaccination.nextDueDate).toLocaleDateString()}</p>
                            {vaccination.notes && <p><strong>Notes:</strong> {vaccination.notes}</p>}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="vet-loading-overlay">
          <div className="vet-loading-spinner"></div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default VetDashboard;