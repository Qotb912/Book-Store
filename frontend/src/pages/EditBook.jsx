import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useSnackbar } from 'notistack';

const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/books/${id}`)
            .then((res) => {
                setAuthor(res.data.author);
                setTitle(res.data.title);
                setPublishYear(res.data.publishYear);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                alert('An error occurred while. Please Check console for more information')
                console.log(err);
            });
    }, [])

    const handelEditBook = () => {
        const data = {
            title, author, publishYear
        }
        setLoading(true);
        axios
            .put(`http://localhost:5000/books/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book Updated Successfully', { variant: 'success' });

                navigate('/');
            })
            .catch((err) => {
                setLoading(false);
                // alert('An error happened: Please Check console');
                enqueueSnackbar('Error', { variant: 'error' });

                console.log(err);
            });

    };
    return (

        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Edit book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'> Title </label>
                    <input type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-2 w-full' />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'> Author </label>
                    <input type='text'
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-2 w-full' />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'> Publish Year </label>
                    <input type='text'
                        value={publishYear}
                        onChange={e => setPublishYear(e.target.value)}
                        className='border-2 border-gray-500 px-2 w-full' />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handelEditBook}>
                    Save
                </button>

            </div>

        </div>
    )
}

export default EditBook






