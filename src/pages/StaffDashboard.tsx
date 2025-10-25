import React, { useState, useEffect } from "react";
import "./StaffDashboard.css";

// Types matching your backend structure
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  location?: string;
}

interface Organization {
  _id: string;
  name: string;
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
  energyLevel: string;
  temperament: string;
  status: string;
  organization: Organization;
  images: PetImage[];
  adopter?: User;
  vet?: User;
}

interface AdoptionRequest {
  _id: string;
  pet: Pet;
  adopter: User;
  status: 'pending' | 'approved' | 'ignored' | 'chat' | 'meeting' | 'finalized';
  meeting?: {
    date: string;
    confirmed: boolean;
  };
}

const StaffDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);
  const [vets, setVets] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'pets' | 'requests'>('pets');
  
  // Form state
  const [petForm, setPetForm] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    energyLevel: "",
    temperament: "",
    organization: ""
  });
  const [petImages, setPetImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [editingPetId, setEditingPetId] = useState<string | null>(null);

  // Meeting modal state
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);
  const [isRescheduling, setIsRescheduling] = useState(false);

  // Initialize with dummy data
  useEffect(() => {
    loadDummyData();
  }, []);

  const loadDummyData = () => {
    // Dummy user data
    setUser({
      _id: "user1",
      name: "Jivesh Malhotra",
      email: "jivesh@petconnect.org",
      role: "staff"
    });

    // Dummy organizations
    setOrganizations([
      { _id: "org1", name: "Happy Paws Rescue" },
      { _id: "org2", name: "Safe Haven Shelter" }
    ]);

    // Dummy vets
    setVets([
      { _id: "vet1", name: "Dr. Smith", email: "smith@vet.com", role: "vet" },
      { _id: "vet2", name: "Dr. Johnson", email: "johnson@vet.com", role: "vet" }
    ]);

    // Dummy pets with real placeholder images
    setPets([
      {
        _id: "pet1",
        name: "Buddy",
        breed: "Golden Retriever",
        age: 3,
        gender: "Male",
        energyLevel: "high",
        temperament: "Friendly, Playful",
        status: "Available",
        organization: { _id: "org1", name: "Happy Paws Rescue" },
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
        energyLevel: "medium",
        temperament: "Calm, Affectionate",
        status: "In Treatment",
        organization: { _id: "org2", name: "Safe Haven Shelter" },
        vet: { _id: "vet1", name: "Dr. Smith", email: "smith@vet.com", role: "vet" },
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
        energyLevel: "high",
        temperament: "Energetic, Loyal",
        status: "Ready for Adoption",
        organization: { _id: "org1", name: "Happy Paws Rescue" },
        images: [
          { 
            _id: "img3", 
            url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop", 
            isPrimary: true 
          }
        ]
      }
    ]);

    // Dummy adoption requests
    setAdoptionRequests([
      {
        _id: "req1",
        pet: {
          _id: "pet1",
          name: "Buddy",
          breed: "Golden Retriever",
          age: 3,
          gender: "Male",
          energyLevel: "high",
          temperament: "Friendly, Playful",
          status: "Available",
          organization: { _id: "org1", name: "Happy Paws Rescue" },
          images: [{ 
            _id: "img1", 
            url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop", 
            isPrimary: true 
          }]
        },
        adopter: {
          _id: "adopter1",
          name: "Alice Cooper",
          email: "alice@example.com",
          role: "adopter",
          location: "New York"
        },
        status: "pending"
      },
      {
        _id: "req2",
        pet: {
          _id: "pet2",
          name: "Luna",
          breed: "Siamese",
          age: 2,
          gender: "Female",
          energyLevel: "medium",
          temperament: "Calm, Affectionate",
          status: "In Treatment",
          organization: { _id: "org2", name: "Safe Haven Shelter" },
          images: [{ 
            _id: "img2", 
            url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop", 
            isPrimary: true 
          }]
        },
        adopter: {
          _id: "adopter2",
          name: "Bob Wilson",
          email: "bob@example.com",
          role: "adopter",
          location: "Boston"
        },
        status: "approved",
        meeting: {
          date: "2024-12-20T14:00:00Z",
          confirmed: false
        }
      },
      {
        _id: "req3",
        pet: {
          _id: "pet3",
          name: "Max",
          breed: "Labrador",
          age: 4,
          gender: "Male",
          energyLevel: "high",
          temperament: "Energetic, Loyal",
          status: "Ready for Adoption",
          organization: { _id: "org1", name: "Happy Paws Rescue" },
          images: [{ 
            _id: "img3", 
            url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop", 
            isPrimary: true 
          }]
        },
        adopter: {
          _id: "adopter3",
          name: "Carol Davis",
          email: "carol@example.com",
          role: "adopter",
          location: "Chicago"
        },
        status: "meeting",
        meeting: {
          date: "2024-12-18T10:00:00Z",
          confirmed: true
        }
      }
    ]);
  };

  // Pet form handlers
  const handlePetFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPetForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPetImages(files);
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleAddPet = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    const newPet: Pet = {
      _id: `pet${Date.now()}`,
      name: petForm.name,
      breed: petForm.breed,
      age: parseInt(petForm.age) || 0,
      gender: petForm.gender,
      energyLevel: petForm.energyLevel,
      temperament: petForm.temperament,
      status: "Available",
      organization: organizations.find(org => org._id === petForm.organization) || organizations[0],
      images: imagePreviews.map((preview, index) => ({
        _id: `img${Date.now()}${index}`,
        url: preview,
        isPrimary: index === 0
      }))
    };

    setPets(prev => [...prev, newPet]);
    resetPetForm();
    alert("Pet added successfully!");
  };

  const resetPetForm = () => {
    setPetForm({
      name: "",
      breed: "",
      age: "",
      gender: "",
      energyLevel: "",
      temperament: "",
      organization: ""
    });
    setPetImages([]);
    setImagePreviews([]);
    setEditingPetId(null);
  };

  // Pet management functions
  const assignVet = async (petId: string, vetId: string) => {
    const vet = vets.find(v => v._id === vetId);
    if (!vet) return;

    setPets(prev => prev.map(pet => 
      pet._id === petId ? { ...pet, vet } : pet
    ));
    alert("Vet assigned successfully!");
  };

  const deletePet = async (petId: string) => {
    if (!confirm("Are you sure you want to delete this pet?")) return;
    
    setPets(prev => prev.filter(pet => pet._id !== petId));
    alert("Pet deleted successfully!");
  };

  const updatePetStatus = async (petId: string, newStatus: string) => {
    setPets(prev => prev.map(pet => 
      pet._id === petId ? { ...pet, status: newStatus } : pet
    ));
    alert(`Pet status updated to ${newStatus}`);
  };

  const addMoreImages = async (petId: string) => {
    // Simulate file input
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    
    input.onchange = (e: Event) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length === 0) return;

      const newImages = files.map((file, index) => ({
        _id: `img${Date.now()}${index}`,
        url: URL.createObjectURL(file),
        isPrimary: false
      }));

      setPets(prev => prev.map(pet => 
        pet._id === petId 
          ? { ...pet, images: [...pet.images, ...newImages] }
          : pet
      ));
      alert(`${files.length} images added successfully!`);
    };

    input.click();
  };

  // Adoption request handlers
  const handleAdoptionRequest = async (requestId: string, action: string, meetingDate?: string) => {
    setAdoptionRequests(prev => prev.map(req => {
      if (req._id === requestId) {
        const updatedReq = { ...req, status: action as any };
        if (action === 'meeting' && meetingDate) {
          updatedReq.meeting = {
            date: meetingDate,
            confirmed: false
          };
        }
        return updatedReq;
      }
      return req;
    }));
    alert(`Request ${action} successfully!`);
  };

  // Meeting modal functions
  const openMeetingModal = (requestId: string, reschedule = false) => {
    setCurrentRequestId(requestId);
    setIsRescheduling(reschedule);
    
    // Pre-fill with existing meeting time if rescheduling
    if (reschedule) {
      const request = adoptionRequests.find(req => req._id === requestId);
      if (request?.meeting?.date) {
        const meetingDateObj = new Date(request.meeting.date);
        setMeetingDate(meetingDateObj.toISOString().split('T')[0]);
        setMeetingTime(meetingDateObj.toTimeString().slice(0, 5)); // HH:MM format
      }
    } else {
      // Set default to tomorrow at 10:00 AM
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setMeetingDate(tomorrow.toISOString().split('T')[0]);
      setMeetingTime("10:00");
    }
    
    setShowMeetingModal(true);
  };

  const closeMeetingModal = () => {
    setShowMeetingModal(false);
    setMeetingDate("");
    setMeetingTime("");
    setCurrentRequestId(null);
    setIsRescheduling(false);
  };

  const scheduleMeeting = async () => {
    if (!meetingDate || !meetingTime || !currentRequestId) {
      alert("Please select both date and time");
      return;
    }

    try {
      // Combine date and time into ISO string
      const isoDateTime = new Date(`${meetingDate}T${meetingTime}`).toISOString();
      await handleAdoptionRequest(currentRequestId, 'meeting', isoDateTime);
      closeMeetingModal();
    } catch (error) {
      alert("Invalid date/time selected");
    }
  };

  const sendMeetingReminder = async (requestId: string) => {
    alert("Meeting reminder sent to adopter!");
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Stats calculation
  const stats = {
    totalPets: pets.length,
    availablePets: pets.filter(pet => pet.status === 'Available').length,
    inTreatment: pets.filter(pet => pet.status === 'In Treatment').length,
    pendingRequests: adoptionRequests.filter(req => req.status === 'pending').length,
    approvedRequests: adoptionRequests.filter(req => req.status === 'approved').length,
    meetingScheduled: adoptionRequests.filter(req => req.status === 'meeting').length,
  };

  if (!user) {
    return <div className="staff-loading">Loading...</div>;
  }

  return (
    <div className="staff-dashboard">
      {/* Header */}
      <div className="staff-dashboard-header">
        <div className="staff-header-content">
          <h1 className="staff-dashboard-title">Staff Dashboard</h1>
          <div className="staff-user-info">
            <span className="staff-welcome-text">Welcome, <strong>{user.name}</strong></span>
            <div className="staff-header-actions">
              <button className="staff-profile-btn" onClick={() => window.location.href = '/profile'}>
                👤 Profile
              </button>
              <button className="staff-logout-btn" onClick={handleLogout}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="staff-stats-grid">
        <div className="staff-stat-card">
          <h3>Total Pets</h3>
          <p className="staff-stat-number">{stats.totalPets}</p>
        </div>
        <div className="staff-stat-card">
          <h3>Available for Adoption</h3>
          <p className="staff-stat-number">{stats.availablePets}</p>
        </div>
        <div className="staff-stat-card">
          <h3>In Treatment</h3>
          <p className="staff-stat-number">{stats.inTreatment}</p>
        </div>
        <div className="staff-stat-card">
          <h3>Pending Requests</h3>
          <p className="staff-stat-number">{stats.pendingRequests}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="staff-tabs">
        <button 
          className={`staff-tab ${activeTab === 'pets' ? 'staff-tab-active' : ''}`}
          onClick={() => setActiveTab('pets')}
        >
          🐾 Pet Management
        </button>
        <button 
          className={`staff-tab ${activeTab === 'requests' ? 'staff-tab-active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          📋 Adoption Requests ({adoptionRequests.length})
        </button>
      </div>

      {/* Main Content */}
      <div className="staff-main-content">
        {activeTab === 'pets' && (
          <>
            {/* Add Pet Form */}
            <div className="staff-section">
              <div className="staff-section-header">
                <h2>Add New Pet</h2>
              </div>
              <form onSubmit={handleAddPet} className="staff-pet-form">
                <div className="staff-form-grid">
                  <div className="staff-form-group">
                    <label>Pet Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={petForm.name}
                      onChange={handlePetFormChange}
                      className="staff-form-input"
                      required
                      placeholder="Enter pet name"
                    />
                  </div>
                  
                  <div className="staff-form-group">
                    <label>Breed</label>
                    <input
                      type="text"
                      name="breed"
                      value={petForm.breed}
                      onChange={handlePetFormChange}
                      className="staff-form-input"
                      placeholder="Enter breed"
                    />
                  </div>

                  <div className="staff-form-group">
                    <label>Age</label>
                    <input
                      type="number"
                      name="age"
                      value={petForm.age}
                      onChange={handlePetFormChange}
                      className="staff-form-input"
                      placeholder="Enter age"
                    />
                  </div>

                  <div className="staff-form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={petForm.gender}
                      onChange={handlePetFormChange}
                      className="staff-form-select"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="staff-form-group">
                    <label>Energy Level</label>
                    <select
                      name="energyLevel"
                      value={petForm.energyLevel}
                      onChange={handlePetFormChange}
                      className="staff-form-select"
                    >
                      <option value="">Select Energy Level</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className="staff-form-group">
                    <label>Temperament</label>
                    <input
                      type="text"
                      name="temperament"
                      value={petForm.temperament}
                      onChange={handlePetFormChange}
                      className="staff-form-input"
                      placeholder="e.g., Friendly, Playful"
                    />
                  </div>

                  <div className="staff-form-group">
                    <label>Organization *</label>
                    <select
                      name="organization"
                      value={petForm.organization}
                      onChange={handlePetFormChange}
                      className="staff-form-select"
                      required
                    >
                      <option value="">Select Organization</option>
                      {organizations.map(org => (
                        <option key={org._id} value={org._id}>
                          {org.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="staff-form-group staff-form-full-width">
                    <label>Pet Images</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="staff-image-upload-input"
                    />
                    <div className="staff-image-preview-container">
                      {imagePreviews.map((preview, index) => (
                        <img
                          key={index}
                          src={preview}
                          alt={`Preview ${index}`}
                          className="staff-image-preview"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <button type="submit" className="staff-primary-btn staff-form-submit">
                  Add Pet with Images
                </button>
              </form>
            </div>

            {/* Pets List */}
            <div className="staff-section">
              <div className="staff-section-header">
                <h2>All Pets ({pets.length} total)</h2>
              </div>
              
              <div className="staff-pets-grid">
                {pets.map(pet => (
                  <div key={pet._id} className="staff-pet-card">
                    <div className="staff-pet-image-container">
                      {pet.images && pet.images.length > 0 ? (
                        <img
                          src={pet.images.find(img => img.isPrimary)?.url || pet.images[0].url}
                          alt={pet.name}
                          className="staff-pet-image"
                        />
                      ) : (
                        <div className="staff-pet-image-placeholder">
                          No Image
                        </div>
                      )}
                      <div className={`staff-pet-status staff-pet-status-${pet.status.toLowerCase().replace(' ', '-')}`}>
                        {pet.status}
                      </div>
                    </div>
                    
                    <div className="staff-pet-info">
                      <h3 className="staff-pet-name">{pet.name}</h3>
                      <div className="staff-pet-details">
                        <div className="staff-pet-detail">
                          <span className="staff-detail-label">Breed:</span>
                          <span>{pet.breed || "Unknown"}</span>
                        </div>
                        <div className="staff-pet-detail">
                          <span className="staff-detail-label">Age:</span>
                          <span>{pet.age} years</span>
                        </div>
                        <div className="staff-pet-detail">
                          <span className="staff-detail-label">Energy:</span>
                          <span className={`staff-energy-level staff-energy-${pet.energyLevel}`}>
                            {pet.energyLevel}
                          </span>
                        </div>
                        <div className="staff-pet-detail">
                          <span className="staff-detail-label">Vet:</span>
                          <span>{pet.vet ? pet.vet.name : "Not assigned"}</span>
                        </div>
                      </div>

                      <div className="staff-pet-actions-grid">
                        {/* First Row: Add Images and Delete */}
                        <div className="staff-pet-actions-row">
                          <button
                            onClick={() => addMoreImages(pet._id)}
                            className="staff-action-btn staff-action-secondary"
                          >
                            📷 Add Images
                          </button>
                          <button
                            onClick={() => deletePet(pet._id)}
                            className="staff-action-btn staff-action-danger"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                        
                        {/* Second Row: Assign Vet and Update Status */}
                        <div className="staff-pet-actions-row">
                          <select
                            className="staff-form-select staff-select-small"
                            onChange={(e) => assignVet(pet._id, e.target.value)}
                            defaultValue=""
                          >
                            <option value="" disabled>👨‍⚕️ Assign Vet</option>
                            {vets.map(vet => (
                              <option key={vet._id} value={vet._id}>
                                {vet.name}
                              </option>
                            ))}
                          </select>
                          
                          <select
                            className="staff-form-select staff-select-small"
                            onChange={(e) => updatePetStatus(pet._id, e.target.value)}
                            defaultValue=""
                          >
                            <option value="" disabled>🔄 Update Status</option>
                            <option value="Available">Available</option>
                            <option value="In Treatment">In Treatment</option>
                            <option value="Recovered">Recovered</option>
                            <option value="Ready for Adoption">Ready for Adoption</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'requests' && (
          <div className="staff-section">
            <div className="staff-section-header">
              <h2>Adoption Requests</h2>
              <div className="staff-requests-stats">
                <span className="staff-request-stat pending">{stats.pendingRequests} Pending</span>
                <span className="staff-request-stat approved">{stats.approvedRequests} Approved</span>
                <span className="staff-request-stat meeting">{stats.meetingScheduled} Meetings</span>
              </div>
            </div>

            <div className="staff-requests-list">
              {adoptionRequests.map(request => (
                <div key={request._id} className={`staff-request-card staff-request-${request.status}`}>
                  <div className="staff-request-header">
                    <div className="staff-request-pet-info">
                      <h3>{request.pet.name}</h3>
                      <span className="staff-request-breed">{request.pet.breed}</span>
                    </div>
                    <div className={`staff-request-status staff-status-${request.status}`}>
                      {request.status}
                    </div>
                  </div>

                  <div className="staff-request-details">
                    <div className="staff-request-adopter">
                      <strong>Adopter:</strong> {request.adopter.name}
                    </div>
                    <div className="staff-request-contact">
                      <strong>Email:</strong> {request.adopter.email}
                    </div>
                    <div className="staff-request-location">
                      <strong>Location:</strong> {request.adopter.location}
                    </div>
                    
                    {request.meeting && (
                      <div className="staff-meeting-info">
                        <div className="staff-meeting-detail">
                          <strong>Meeting:</strong> {new Date(request.meeting.date).toLocaleString()}
                        </div>
                        <div className="staff-meeting-detail">
                          <strong>Confirmed:</strong>
                          <span className={request.meeting.confirmed ? 'staff-confirmed' : 'staff-pending'}>
                            {request.meeting.confirmed ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="staff-request-actions">
                    {request.status === 'pending' && (
                      <>
                        <button onClick={() => handleAdoptionRequest(request._id, 'approved')} 
                                className="staff-action-btn staff-action-success">
                          ✅ Approve
                        </button>
                        <button onClick={() => handleAdoptionRequest(request._id, 'ignored')} 
                                className="staff-action-btn staff-action-danger">
                          ❌ Ignore
                        </button>
                        <button onClick={() => handleAdoptionRequest(request._id, 'chat')} 
                                className="staff-action-btn staff-action-secondary">
                          💬 Chat
                        </button>
                        <button onClick={() => openMeetingModal(request._id, false)} 
                                className="staff-action-btn staff-action-warning">
                          📅 Request Meeting
                        </button>
                      </>
                    )}

                    {request.status === 'approved' && (
                      <>
                        <button onClick={() => handleAdoptionRequest(request._id, 'chat')} 
                                className="staff-action-btn staff-action-secondary">
                          💬 Chat Online
                        </button>
                        <button onClick={() => openMeetingModal(request._id, false)} 
                                className="staff-action-btn staff-action-warning">
                          📅 Schedule Meeting
                        </button>
                      </>
                    )}

                    {request.status === 'chat' && (
                      <button onClick={() => handleAdoptionRequest(request._id, 'finalized')} 
                              className="staff-action-btn staff-action-success">
                        ✅ Finalize Adoption
                      </button>
                    )}

                    {request.status === 'meeting' && (
                      <>
                        <button onClick={() => handleAdoptionRequest(request._id, 'finalized')} 
                                className="staff-action-btn staff-action-success">
                          ✅ Finalize
                        </button>
                        <button onClick={() => openMeetingModal(request._id, true)} 
                                className="staff-action-btn staff-action-secondary">
                          📅 Reschedule
                        </button>
                        {!request.meeting?.confirmed && (
                          <button onClick={() => sendMeetingReminder(request._id)} 
                                  className="staff-action-btn staff-action-warning">
                            🔔 Send Reminder
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Meeting Modal */}
      {showMeetingModal && (
        <div className="staff-modal-overlay">
          <div className="staff-modal">
            <div className="staff-modal-header">
              <h3>{isRescheduling ? 'Reschedule Meeting' : 'Schedule Meeting'}</h3>
              <button className="staff-modal-close" onClick={closeMeetingModal}>×</button>
            </div>
            <div className="staff-modal-body">
              <div className="staff-meeting-form">
                <div className="staff-form-group">
                  <label>Meeting Date</label>
                  <input
                    type="date"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="staff-form-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="staff-form-group">
                  <label>Meeting Time</label>
                  <input
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="staff-form-input"
                  />
                </div>
                {meetingDate && meetingTime && (
                  <div className="staff-meeting-preview">
                    <p><strong>Scheduled for:</strong> {new Date(`${meetingDate}T${meetingTime}`).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="staff-modal-footer">
              <button className="staff-action-btn staff-action-secondary" onClick={closeMeetingModal}>
                Cancel
              </button>
              <button className="staff-action-btn staff-action-success" onClick={scheduleMeeting}>
                {isRescheduling ? 'Reschedule Meeting' : 'Schedule Meeting'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;