import React, { useState, useEffect } from "react";
import "./TrainerDashboard.css";

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
  trainingNotes?: string;
  images: PetImage[];
  trainer?: User;
}

interface BehaviorAssessment {
  _id: string;
  pet: Pet;
  behaviorProfile: {
    energyLevel: string;
    socialBehavior: {
      withAdults: string;
      withChildren: string;
      withOtherPets: string;
      withStrangers: string;
    };
    trainability: {
      intelligence: string;
      obedience: string;
      trainingProgress: string;
    };
    environmentNeeds: {
      spaceRequired: string;
      exerciseNeeds: string;
      climateTolerance: string;
    };
  };
  trainerNotes: string;
  assessmentDate: string;
  followUpRequired: boolean;
  compatibilityScores: {
    withFamilies: number;
    withSingles: number;
    withSeniors: number;
    withChildren: number;
  };
}

interface TrainingSession {
  _id: string;
  pet: Pet;
  sessionDetails: {
    sessionDate: string;
    duration: number;
    sessionType: string;
    focusAreas: string[];
  };
  trainerObservations: {
    sessionSummary: string;
    strengthsNoted: string[];
    areasForImprovement: string[];
    homework: string[];
    nextSessionFocus: string[];
  };
  progressMetrics: {
    commandPerformance: {
      sit: number;
      stay: number;
      come: number;
      heel: number;
      down: number;
    };
    behaviorScores: {
      attentionSpan: number;
      impulseControl: number;
      socialConfidence: number;
      stressTolerance: number;
      overallProgress: number;
    };
  };
}

const TrainerDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [myTrainees, setMyTrainees] = useState<Pet[]>([]);
  const [recentAssessments, setRecentAssessments] = useState<BehaviorAssessment[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<TrainingSession[]>([]);
  const [activeTab, setActiveTab] = useState<'trainees' | 'assessments' | 'sessions'>('trainees');
  const [loading, setLoading] = useState(false);

  // Form states
  const [assessmentForm, setAssessmentForm] = useState({
    petId: "",
    energyLevel: "moderate",
    socialAdults: "friendly",
    socialChildren: "good",
    intelligence: "average",
    spaceRequired: "small_yard",
    trainerNotes: ""
  });

  const [sessionForm, setSessionForm] = useState({
    petId: "",
    sessionType: "obedience_basic",
    sessionDate: "",
    sessionDuration: "",
    sessionSummary: ""
  });

  // Initialize with dummy data
  useEffect(() => {
    loadDummyData();
    setDefaultSessionDate();
  }, []);

  const loadDummyData = () => {
    // Dummy user data
    setUser({
      _id: "trainer1",
      name: "Jivesh Trainer",
      email: "jivesh@petconnect.org",
      role: "trainer"
    });

    // Dummy trainees
    const trainees: Pet[] = [
      {
        _id: "pet1",
        name: "Buddy",
        breed: "Golden Retriever",
        age: 3,
        gender: "Male",
        status: "In Training",
        trainingNotes: "Responds well to positive reinforcement. Needs work on leash training.",
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
        trainingNotes: "Very intelligent. Quick learner with clicker training.",
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
        trainingNotes: "Socialization needed with other dogs.",
        images: [
          { 
            _id: "img3", 
            url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop", 
            isPrimary: true 
          }
        ]
      }
    ];

    setMyTrainees(trainees);

    // Dummy behavior assessments
    setRecentAssessments([
      {
        _id: "assess1",
        pet: trainees[0],
        behaviorProfile: {
          energyLevel: "high",
          socialBehavior: {
            withAdults: "friendly",
            withChildren: "good",
            withOtherPets: "cautious",
            withStrangers: "neutral"
          },
          trainability: {
            intelligence: "high",
            obedience: "selective",
            trainingProgress: "intermediate"
          },
          environmentNeeds: {
            spaceRequired: "large_yard",
            exerciseNeeds: "high",
            climateTolerance: "any"
          }
        },
        trainerNotes: "Excellent potential for advanced obedience training. Shows strong bonding behavior.",
        assessmentDate: new Date().toISOString(),
        followUpRequired: false,
        compatibilityScores: {
          withFamilies: 4,
          withSingles: 5,
          withSeniors: 3,
          withChildren: 4
        }
      }
    ]);

    // Dummy training sessions
    setUpcomingSessions([
      {
        _id: "session1",
        pet: trainees[0],
        sessionDetails: {
          sessionDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
          duration: 60,
          sessionType: "obedience_advanced",
          focusAreas: ["heel", "stay", "recall"]
        },
        trainerObservations: {
          sessionSummary: "Excellent progress with stay command. Needs more work on recall in distracting environments.",
          strengthsNoted: ["Quick learner", "Good focus"],
          areasForImprovement: ["Distraction handling", "Long-distance recall"],
          homework: ["Practice 10-minute stays", "Recall training in backyard"],
          nextSessionFocus: ["Advanced recall", "Heel with distractions"]
        },
        progressMetrics: {
          commandPerformance: {
            sit: 9,
            stay: 8,
            come: 6,
            heel: 7,
            down: 9
          },
          behaviorScores: {
            attentionSpan: 8,
            impulseControl: 7,
            socialConfidence: 6,
            stressTolerance: 7,
            overallProgress: 7
          }
        }
      }
    ]);
  };

  const setDefaultSessionDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    setSessionForm(prev => ({
      ...prev,
      sessionDate: `${year}-${month}-${day}T${hours}:${minutes}`
    }));
  };

  // Stats calculation
  const stats = {
    traineesCount: myTrainees.length,
    sessionsCount: upcomingSessions.length,
    followupCount: myTrainees.filter(pet => pet.status === 'Needs Follow-up').length,
    todayDate: new Date().toLocaleDateString()
  };

  // Form handlers
  const handleAssessmentFormChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssessmentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSessionFormChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSessionForm(prev => ({ ...prev, [name]: value }));
  };

  // Action handlers
  const handleAddBehaviorAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assessmentForm.petId) {
      alert("Please select a pet");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      const newAssessment: BehaviorAssessment = {
        _id: `assess${Date.now()}`,
        pet: myTrainees.find(pet => pet._id === assessmentForm.petId)!,
        behaviorProfile: {
          energyLevel: assessmentForm.energyLevel,
          socialBehavior: {
            withAdults: assessmentForm.socialAdults,
            withChildren: assessmentForm.socialChildren,
            withOtherPets: "good",
            withStrangers: "neutral"
          },
          trainability: {
            intelligence: assessmentForm.intelligence,
            obedience: "selective",
            trainingProgress: "beginner"
          },
          environmentNeeds: {
            spaceRequired: assessmentForm.spaceRequired,
            exerciseNeeds: "moderate",
            climateTolerance: "any"
          }
        },
        trainerNotes: assessmentForm.trainerNotes,
        assessmentDate: new Date().toISOString(),
        followUpRequired: false,
        compatibilityScores: {
          withFamilies: 4,
          withSingles: 5,
          withSeniors: 3,
          withChildren: 4
        }
      };

      setRecentAssessments(prev => [newAssessment, ...prev]);
      
      // Reset form
      setAssessmentForm({
        petId: "",
        energyLevel: "moderate",
        socialAdults: "friendly",
        socialChildren: "good",
        intelligence: "average",
        spaceRequired: "small_yard",
        trainerNotes: ""
      });

      alert("✅ Behavior assessment saved successfully!");
    } catch (error) {
      console.error('Error adding behavior assessment:', error);
      alert("❌ Failed to save assessment");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTrainingSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionForm.petId || !sessionForm.sessionType || !sessionForm.sessionDate || !sessionForm.sessionDuration) {
      alert("Please fill in all required fields: Pet, Session Type, Date, and Duration");
      return;
    }

    setLoading(true);
    try {
      const focusAreaMap: { [key: string]: string[] } = {
        'obedience_basic': ['sit', 'stay', 'come'],
        'obedience_advanced': ['heel', 'down', 'leave_it'],
        'behavior_modification': ['impulse_control', 'fear_desensitization'],
        'socialization': ['social_skills'],
        'aggression_management': ['leave_it', 'drop_it', 'impulse_control']
      };

      const newSession: TrainingSession = {
        _id: `session${Date.now()}`,
        pet: myTrainees.find(pet => pet._id === sessionForm.petId)!,
        sessionDetails: {
          sessionDate: sessionForm.sessionDate,
          duration: parseInt(sessionForm.sessionDuration),
          sessionType: sessionForm.sessionType,
          focusAreas: focusAreaMap[sessionForm.sessionType] || ['sit']
        },
        trainerObservations: {
          sessionSummary: sessionForm.sessionSummary,
          strengthsNoted: [],
          areasForImprovement: [],
          homework: [],
          nextSessionFocus: []
        },
        progressMetrics: {
          commandPerformance: {
            sit: 0, stay: 0, come: 0, heel: 0, down: 0
          },
          behaviorScores: {
            attentionSpan: 5,
            impulseControl: 5,
            socialConfidence: 5,
            stressTolerance: 5,
            overallProgress: 5
          }
        }
      };

      setUpcomingSessions(prev => [newSession, ...prev]);
      
      // Reset form
      setSessionForm({
        petId: "",
        sessionType: "obedience_basic",
        sessionDate: "",
        sessionDuration: "",
        sessionSummary: ""
      });

      setDefaultSessionDate();

      alert("✅ Training session recorded successfully!");
    } catch (error) {
      console.error('Error adding training session:', error);
      alert("❌ Failed to record training session");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickTrainingNote = (petId: string) => {
    const pet = myTrainees.find(p => p._id === petId);
    if (pet) {
      const note = prompt(`Quick training note for ${pet.name}:`, pet.trainingNotes || '');
      if (note !== null) {
        // Update the pet's training notes
        setMyTrainees(prev => prev.map(p => 
          p._id === petId ? { ...p, trainingNotes: note } : p
        ));
        alert(`Training notes updated for ${pet.name}`);
      }
    }
  };

  const handleViewAssessments = (petId: string) => {
    const pet = myTrainees.find(p => p._id === petId);
    if (pet) {
      const petAssessments = recentAssessments.filter(assessment => assessment.pet._id === petId);
      alert(`Behavior assessments for ${pet.name}\n\nTotal assessments: ${petAssessments.length}`);
    }
  };

  const handleRefreshData = () => {
    setLoading(true);
    setTimeout(() => {
      loadDummyData();
      setLoading(false);
      alert("Data refreshed!");
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Available': 'trainer-status-available',
      'In Training': 'trainer-status-training',
      'Needs Follow-up': 'trainer-status-followup',
      'Adopted': 'trainer-status-adopted',
      'Unavailable': 'trainer-status-unavailable'
    };
    return colors[status] || 'trainer-status-default';
  };

  if (!user) {
    return <div className="trainer-loading">Loading...</div>;
  }

  return (
    <div className="trainer-dashboard">
      {/* Header */}
      <div className="trainer-dashboard-header">
        <div className="trainer-header-content">
          <div>
            <h1 className="trainer-dashboard-title">🎯 Trainer Dashboard</h1>
            <p className="trainer-info">Welcome, {user.name} | {user.email}</p>
          </div>
          <div className="trainer-header-actions">
            <button onClick={handleRefreshData} className="trainer-refresh-btn">
              🔄 Refresh
            </button>
            <button className="trainer-profile-btn"  onClick={() => window.location.href = '/profile'}>
              👤 My Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="trainer-stats-grid">
        <div className="trainer-stat-card">
          <h3>My Trainees</h3>
          <p className="trainer-stat-number">{stats.traineesCount}</p>
        </div>
        <div className="trainer-stat-card">
          <h3>Upcoming Sessions</h3>
          <p className="trainer-stat-number">{stats.sessionsCount}</p>
        </div>
        <div className="trainer-stat-card">
          <h3>Needs Follow-up</h3>
          <p className="trainer-stat-number">{stats.followupCount}</p>
        </div>
        <div className="trainer-stat-card">
          <h3>Today's Date</h3>
          <p className="trainer-stat-date">{stats.todayDate}</p>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="trainer-main-section">
        <div className="trainer-tabs">
          <button 
            className={`trainer-tab ${activeTab === 'trainees' ? 'trainer-tab-active' : ''}`}
            onClick={() => setActiveTab('trainees')}
          >
            My Trainees
          </button>
          <button 
            className={`trainer-tab ${activeTab === 'assessments' ? 'trainer-tab-active' : ''}`}
            onClick={() => setActiveTab('assessments')}
          >
            Behavior Assessments
          </button>
          <button 
            className={`trainer-tab ${activeTab === 'sessions' ? 'trainer-tab-active' : ''}`}
            onClick={() => setActiveTab('sessions')}
          >
            Training Sessions
          </button>
        </div>

        {/* Tab Content */}
        <div className="trainer-tab-content">
          {/* Trainees Tab */}
          {activeTab === 'trainees' && (
            <div className="trainer-tab-panel">
              <div className="trainer-section-header">
                <h2>My Assigned Pets</h2>
                <div className="trainer-section-status">
                  {myTrainees.length} pets assigned
                </div>
              </div>
              
              <div className="trainer-trainees-list">
                {myTrainees.length === 0 ? (
                  <div className="trainer-empty-state">
                    <p>No pets assigned to you for training yet.</p>
                  </div>
                ) : (
                  myTrainees.map(trainee => (
                    <div key={trainee._id} className="trainer-trainee-card">
                      <div className="trainer-trainee-content">
                        {/* Pet Image */}
                        <div className="trainer-trainee-image">
                          {trainee.images && trainee.images.length > 0 ? (
                            <img 
                              src={trainee.images.find(img => img.isPrimary)?.url || trainee.images[0].url} 
                              alt={trainee.name}
                              className="trainer-pet-image"
                            />
                          ) : (
                            <div className="trainer-pet-image-placeholder">
                              No Image
                            </div>
                          )}
                        </div>
                        
                        {/* Pet Info */}
                        <div className="trainer-trainee-info">
                          <div className="trainer-trainee-header">
                            <h3 className="trainer-trainee-name">{trainee.name}</h3>
                            <span className={`trainer-status-badge ${getStatusColor(trainee.status)}`}>
                              {trainee.status}
                            </span>
                          </div>
                          
                          <div className="trainer-trainee-details">
                            <div className="trainer-detail-row">
                              <span className="trainer-detail-label">Breed:</span>
                              <span>{trainee.breed || 'Unknown'}</span>
                            </div>
                            <div className="trainer-detail-row">
                              <span className="trainer-detail-label">Age:</span>
                              <span>{trainee.age || 'Unknown'} years</span>
                            </div>
                            <div className="trainer-detail-row">
                              <span className="trainer-detail-label">Gender:</span>
                              <span>{trainee.gender || 'Unknown'}</span>
                            </div>
                          </div>

                          <div className="trainer-training-notes">
                            <strong>Training Notes:</strong> 
                            <span>{trainee.trainingNotes || 'No notes yet'}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="trainer-trainee-actions">
                          <button 
                            onClick={() => handleQuickTrainingNote(trainee._id)}
                            className="trainer-action-btn trainer-action-secondary"
                          >
                            Quick Note
                          </button>
                          <button 
                            onClick={() => handleViewAssessments(trainee._id)}
                            className="trainer-action-btn trainer-action-primary"
                          >
                            View Assessments
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Assessments Tab */}
          {activeTab === 'assessments' && (
            <div className="trainer-tab-panel">
              <div className="trainer-assessments-grid">
                <div className="trainer-assessment-form-section">
                  <h3>New Behavior Assessment</h3>
                  <form onSubmit={handleAddBehaviorAssessment} className="trainer-assessment-form">
                    <div className="trainer-form-group">
                      <select
                        name="petId"
                        value={assessmentForm.petId}
                        onChange={handleAssessmentFormChange}
                        className="trainer-form-select"
                        required
                      >
                        <option value="">Select a pet</option>
                        {myTrainees.map(trainee => (
                          <option key={trainee._id} value={trainee._id}>
                            {trainee.name} ({trainee.breed})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Behavior Profile */}
                    <div className="trainer-behavior-profile">
                      <h4>🧠 Behavior Profile</h4>
                      
                      <div className="trainer-form-grid">
                        <div className="trainer-form-group">
                          <label>Energy Level</label>
                          <select
                            name="energyLevel"
                            value={assessmentForm.energyLevel}
                            onChange={handleAssessmentFormChange}
                            className="trainer-form-select"
                          >
                            <option value="very_low">Very Low</option>
                            <option value="low">Low</option>
                            <option value="moderate">Moderate</option>
                            <option value="high">High</option>
                            <option value="very_high">Very High</option>
                          </select>
                        </div>

                        <div className="trainer-form-group">
                          <label>Social Behavior - With Adults</label>
                          <select
                            name="socialAdults"
                            value={assessmentForm.socialAdults}
                            onChange={handleAssessmentFormChange}
                            className="trainer-form-select"
                          >
                            <option value="shy">Shy</option>
                            <option value="cautious">Cautious</option>
                            <option value="friendly">Friendly</option>
                            <option value="very_friendly">Very Friendly</option>
                            <option value="overly_excited">Overly Excited</option>
                          </select>
                        </div>

                        <div className="trainer-form-group">
                          <label>Social Behavior - With Children</label>
                          <select
                            name="socialChildren"
                            value={assessmentForm.socialChildren}
                            onChange={handleAssessmentFormChange}
                            className="trainer-form-select"
                          >
                            <option value="not_recommended">Not Recommended</option>
                            <option value="supervised_only">Supervised Only</option>
                            <option value="good">Good</option>
                            <option value="excellent">Excellent</option>
                          </select>
                        </div>

                        <div className="trainer-form-group">
                          <label>Trainability - Intelligence</label>
                          <select
                            name="intelligence"
                            value={assessmentForm.intelligence}
                            onChange={handleAssessmentFormChange}
                            className="trainer-form-select"
                          >
                            <option value="low">Low</option>
                            <option value="average">Average</option>
                            <option value="high">High</option>
                            <option value="very_high">Very High</option>
                          </select>
                        </div>

                        <div className="trainer-form-group">
                          <label>Environment Needs - Space Required</label>
                          <select
                            name="spaceRequired"
                            value={assessmentForm.spaceRequired}
                            onChange={handleAssessmentFormChange}
                            className="trainer-form-select"
                          >
                            <option value="apartment_ok">Apartment OK</option>
                            <option value="small_yard">Small Yard</option>
                            <option value="large_yard">Large Yard</option>
                            <option value="rural">Rural</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Trainer Notes */}
                    <div className="trainer-form-group">
                      <label>Trainer Notes</label>
                      <textarea
                        name="trainerNotes"
                        value={assessmentForm.trainerNotes}
                        onChange={handleAssessmentFormChange}
                        placeholder="Behavior observations and recommendations..."
                        className="trainer-form-textarea"
                        rows={4}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="trainer-primary-btn trainer-form-submit"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Behavior Assessment'}
                    </button>
                  </form>
                </div>

                <div className="trainer-recent-assessments">
                  <h3>Recent Assessments</h3>
                  <div className="trainer-assessments-list">
                    {recentAssessments.length === 0 ? (
                      <div className="trainer-empty-state">
                        <p>No behavior assessments yet</p>
                      </div>
                    ) : (
                      recentAssessments.map(assessment => (
                        <div key={assessment._id} className="trainer-assessment-card">
                          <div className="trainer-assessment-header">
                            <div>
                              <h4>{assessment.pet.name}</h4>
                              <p className="trainer-assessment-meta">
                                Energy: {assessment.behaviorProfile.energyLevel} | 
                                Intelligence: {assessment.behaviorProfile.trainability.intelligence}
                              </p>
                              <p className="trainer-assessment-date">
                                {new Date(assessment.assessmentDate).toLocaleDateString()}
                              </p>
                            </div>
                            <span className="trainer-assessment-score">
                              Score: {assessment.compatibilityScores.withFamilies}/5
                            </span>
                          </div>
                          <p className="trainer-assessment-notes">
                            {assessment.trainerNotes || 'No notes'}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <div className="trainer-tab-panel">
              <h2>Training Sessions</h2>
              <div className="trainer-sessions-grid">
                <div className="trainer-session-form-section">
                  <h3>Record Training Session</h3>
                  <form onSubmit={handleAddTrainingSession} className="trainer-session-form">
                    <div className="trainer-form-group">
                      <select
                        name="petId"
                        value={sessionForm.petId}
                        onChange={handleSessionFormChange}
                        className="trainer-form-select"
                        required
                      >
                        <option value="">Select a pet</option>
                        {myTrainees.map(trainee => (
                          <option key={trainee._id} value={trainee._id}>
                            {trainee.name} ({trainee.breed})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="trainer-form-group">
                      <select
                        name="sessionType"
                        value={sessionForm.sessionType}
                        onChange={handleSessionFormChange}
                        className="trainer-form-select"
                        required
                      >
                        <option value="obedience_basic">Basic Obedience</option>
                        <option value="obedience_advanced">Advanced Obedience</option>
                        <option value="behavior_modification">Behavior Modification</option>
                        <option value="socialization">Socialization</option>
                        <option value="aggression_management">Aggression Management</option>
                      </select>
                    </div>

                    <div className="trainer-form-group">
                      <input
                        type="datetime-local"
                        name="sessionDate"
                        value={sessionForm.sessionDate}
                        onChange={handleSessionFormChange}
                        className="trainer-form-input"
                        required
                      />
                    </div>

                    <div className="trainer-form-group">
                      <input
                        type="number"
                        name="sessionDuration"
                        value={sessionForm.sessionDuration}
                        onChange={handleSessionFormChange}
                        placeholder="Duration (minutes)"
                        className="trainer-form-input"
                        required
                      />
                    </div>

                    <div className="trainer-form-group">
                      <textarea
                        name="sessionSummary"
                        value={sessionForm.sessionSummary}
                        onChange={handleSessionFormChange}
                        placeholder="Session summary..."
                        className="trainer-form-textarea"
                        rows={3}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="trainer-primary-btn trainer-form-submit"
                      disabled={loading}
                    >
                      {loading ? 'Recording...' : 'Record Training Session'}
                    </button>
                  </form>
                </div>

                <div className="trainer-upcoming-sessions">
                  <h3>Upcoming Sessions</h3>
                  <div className="trainer-sessions-list">
                    {upcomingSessions.length === 0 ? (
                      <div className="trainer-empty-state">
                        <p>No upcoming training sessions</p>
                      </div>
                    ) : (
                      upcomingSessions.map(session => (
                        <div key={session._id} className="trainer-session-card">
                          <div className="trainer-session-header">
                            <div>
                              <h4>{session.pet.name}</h4>
                              <p className="trainer-session-type">
                                {session.sessionDetails.sessionType}
                              </p>
                              <p className="trainer-session-meta">
                                {new Date(session.sessionDetails.sessionDate).toLocaleDateString()} 
                                • {session.sessionDetails.duration} mins
                              </p>
                            </div>
                            <span className="trainer-session-status">
                              Scheduled
                            </span>
                          </div>
                          {session.trainerObservations.sessionSummary && (
                            <p className="trainer-session-summary">
                              {session.trainerObservations.sessionSummary}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="trainer-loading-overlay">
          <div className="trainer-loading-spinner"></div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;