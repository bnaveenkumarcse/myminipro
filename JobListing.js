// src/components/JobListing.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobListing = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/api/jobs');
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="container">
            <h2>Job Listings</h2>
            <ul className="list-group">
                {jobs.map((job) => (
                    <li key={job._id} className="list-group-item">
                        <Link to={`/jobs/${job._id}`}>{job.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobListing;
