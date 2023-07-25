import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getActivityLog } from '../services/api';

const ActivityLog = () => {
  const { tableId } = useParams();
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    // Fetch the activity log for the specified table using the tableId from the URL parameter
    getActivityLog(tableId)
      .then((response) => {
        // Assuming the getActivityLog service returns an array of activity log items
        setActivityLog(response.activityLog);
      })
      .catch((error) => {
        console.error('Error fetching activity log:', error);
        // Handle the error, show error message to the user, etc.
      });
  }, [tableId]);

  return (
    <div className="activity-log">
      <h2>Activity Log</h2>
      <ul>
        {activityLog.map((activity, index) => (
          <li key={index}>
            <p>{activity.description}</p>
            <p>Date: {activity.date}</p>
            <p>Performed by: {activity.user}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
