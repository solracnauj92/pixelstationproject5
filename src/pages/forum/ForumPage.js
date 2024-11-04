
import React from 'react';
import Forum from './Forum'; // Importing Forum to display each forum
import CreateForum from './CreateForum'; // Importing CreateForum if you want to allow creation of new forums

const ForumPage = () => {
    return (
        <div>
            <h1>Forums</h1>
            <CreateForum /> {/* Optionally display a form to create a new forum */}
            <Forum /> {/* Display forums or list of forums */}
            {/* You might want to map through an array of forums and render them */}
        </div>
    );
};

export default ForumPage;
