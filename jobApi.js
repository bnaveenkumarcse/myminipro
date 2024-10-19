// src/api/jobApi.js

// Function to fetch all job listings
export const fetchJobs = async () => {
    try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching job listings:', error);
        return [];
    }
};

// Function to fetch details of a single job by its ID
export const fetchJobDetails = async (id) => {
    try {
        const response = await fetch(`/api/jobs/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching job details:', error);
        return null;
    }
};

// Function to post a new job (employer only)
export const postJob = async (jobData) => {
    try {
        const response = await fetch('/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error posting new job:', error);
        return null;
    }
};

// Function to apply for a job (candidate only)
export const applyForJob = async (jobId, applicationData) => {
    try {
        const response = await fetch(`/api/jobs/${jobId}/apply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(applicationData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error applying for job:', error);
        return null;
    }
};
