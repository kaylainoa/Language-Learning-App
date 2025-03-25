import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  // Sample user data - would come from props or API in a real app
  const [userData, setUserData] = useState({
    username: "WICSE Design Team",
    email: "springdesign@wicse.com",
    language: "Spanish",
    level: 8,
    totalLevels: 15,
    joinDate: "January 15, 2025",
    streak: 24,
    achievements: [
      { name: "Perfect Week", description: "Complete lessons 7 days in a row", earned: true },
      { name: "Vocabulary Master", description: "Learn 500 words", earned: true },
      { name: "Grammar Guru", description: "Complete all grammar exercises in Level 5", earned: false }
    ]
  });

  // Calculate completion percentage
  const completionPercentage = (userData.level / userData.totalLevels) * 100;

  // Available languages
  const languages = ["Spanish", "N/A"];

  // Handle language change
  const handleLanguageChange = (e) => {
    setUserData({...userData, language: e.target.value});
  };

  return (
    <div className="profile-page">
      {/* Decorative Elements */}
      <div className="seashell" style={{top: '20%', left: '10%'}}></div>
      <div className="seashell" style={{top: '30%', right: '15%'}}></div>
      <div className="seashell" style={{bottom: '25%', left: '20%'}}></div>
      <div className="seashell" style={{bottom: '15%', right: '10%'}}></div>
      
      <div className="palm-leaf" style={{top: '5%', left: '5%'}}></div>
      <div className="palm-leaf" style={{bottom: '10%', right: '5%'}}></div>
      
      <div className="sparkle sparkle-1"></div>
      <div className="sparkle sparkle-2"></div>
      <div className="sparkle sparkle-3"></div>

      {/* Header */}
      <div className="header">
        <h1 className="title">My Profile</h1>
        <p className="subtitle">Track your language learning journey</p>
      </div>

      {/* Profile Info Container */}
      <div className="profile-container">
        <div className="profile-content">
          {/* Profile Image */}
          <div className="profile-image-container">
            <div className="profile-image">
              <span id="user-initial">{userData.username.charAt(0).toUpperCase()}</span>
            </div>
            <div className="streak-badge">
              {userData.streak} Day Streak
            </div>
          </div>

          {/* Profile Information */}
          <div className="profile-info">
            <div className="info-group">
              <h2 className="profile-name">{userData.username}</h2>
              <p className="profile-email">{userData.email}</p>
              <p className="join-date">Member since {userData.joinDate}</p>
            </div>

            {/* Language Selection */}
            <div className="info-group">
              <label className="language-label">Learning Language</label>
              <select 
                className="language-select"
                value={userData.language}
                onChange={handleLanguageChange}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Progress */}
            <div className="progress-section">
              <div className="progress-header">
                <span className="progress-label">Current Progress</span>
                <span className="level-info">Level {userData.level}/{userData.totalLevels}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <p className="progress-message">
                {completionPercentage < 50 
                  ? "Keep going! You're making great progress." 
                  : completionPercentage < 90 
                    ? "You're doing fantastic! Almost there!" 
                    : "You're a language master in the making!"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="achievements-section">
        <h3 className="section-title">My Achievements</h3>
        <div className="achievements-container">
          {userData.achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
            >
              <div className="achievement-header">
                <div className="achievement-icon">
                  {achievement.earned ? '🏆' : '🔒'}
                </div>
                <h4 className="achievement-title">{achievement.name}</h4>
              </div>
              <p className="achievement-description">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-value">42</div>
          <div className="stat-label">Words Learned This Week</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">16</div>
          <div className="stat-label">Hours Practiced</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">85%</div>
          <div className="stat-label">Quiz Accuracy</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="button-container">
        <button className="primary-button">
          Start Today's Lesson
        </button>
        <button className="secondary-button">
          Practice Vocabulary
        </button>
      </div>

      {/* Wave Animation */}
      <div className="wave-animation">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
    </div>
  );
}

export default Profile;