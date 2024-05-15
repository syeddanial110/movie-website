import { useState } from 'react';
import axios from 'axios';

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async (method, url, data) => {
        setLoading(true);

        try {
            const response = await axios[method](url, data);
            return response.data;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const post = async (url, data) => {
        return request('post', url, data);
    };

    const put = async (url, data) => {
        return request('put', url, data);
    };

    const patch = async (url, data) => {
        return request('patch', url, data);
    };

    const update = async (url, data) => {
        return request('update', url, data);
    };

    const remove = async (url) => {
        return request('delete', url);
    };

    return { loading, error, post, put, patch, update, remove };
};

export default useApi;
