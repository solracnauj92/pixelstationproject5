import React, { useEffect, useState } from 'react';
import Forum from './Forum';
import CreateForum from './CreateForum';
import { axiosRes } from "../../api/axiosDefaults";

const ForumPage = () => {
    const [forums, setForums] = useState([]);

    useEffect(() => {
        const fetchForums = async () => {
            try {
                const { data } = await axiosRes.get("/forums/");
                setForums(data.results);
            } catch (err) {
                console.error("Error fetching forums:", err);
            }
        };

        fetchForums();
    }, []);

    return (
        <div>
            <h1>Forums</h1>
            <CreateForum setForums={setForums} />
            {forums.length ? (
                <Forum forums={forums} />
            ) : (
                <p>No forums available. Be the first to create one!</p>
            )}
        </div>
    );
};

export default ForumPage;
