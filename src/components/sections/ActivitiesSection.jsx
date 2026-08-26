import React from 'react';
import SectionTitle from '../common/SectionTitle';
import { activitiesData } from '../../data/portfolioData';
import { CalendarCheck2, Calendar, Building } from 'lucide-react';
import '../../styles/activities.css';

export default function ActivitiesSection() {
  return (
    <section id="activities" className="activities-section">
      <div className="container">
        <SectionTitle 
          tag="Activities & Achievements"
          icon={CalendarCheck2}
          title={<>กิจกรรมและ <span className="gradient-text">การมีส่วนร่วมในวงการ Tech</span></>}
          subtitle="ประสบการณ์การแข่งขัน Hackathon, การเป็นวิทยากร Workshop, และกิจกรรมสร้างสรรค์เพื่อชุมชนนักพัฒนา"
        />

        <div className="activities-grid">
          {activitiesData.map((activity, idx) => (
            <div 
              key={activity.id} 
              className={`glass-card activity-card reveal-on-scroll stagger-${(idx % 3) + 1}`}
            >
              <div className="activity-img-box">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="activity-img" 
                  loading="lazy" 
                  decoding="async" 
                />
                {activity.badge && (
                  <span className="activity-badge">
                    {activity.badge}
                  </span>
                )}
              </div>

              <div className="activity-content">
                <div className="activity-meta">
                  <div className="activity-meta-item">
                    <Calendar size={14} color="var(--accent-yellow)" />
                    <span>{activity.date}</span>
                  </div>
                  <div className="activity-meta-item">
                    <Building size={14} color="var(--primary-accent)" />
                    <span>{activity.organization}</span>
                  </div>
                </div>

                <h3 className="activity-title">{activity.title}</h3>
                
                <div className="activity-role">
                  <span>บทบาท: {activity.role}</span>
                </div>

                <p className="activity-desc">{activity.description}</p>

                <div className="activity-tags">
                  {activity.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="badge badge-primary">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
