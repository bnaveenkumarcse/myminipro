// src/components/ApplicationForm.js
import React, { useState } from 'react';

const ApplicationForm = ({ jobId }) => {
    const [resume, setResume] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/jobs/${jobId}/apply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ resume }),
        });
        const data = await response.json()
    }
}