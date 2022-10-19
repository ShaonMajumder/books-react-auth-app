import React from 'react';
import apiClient from '../services/api';
import Cookies from 'js-cookie';

const Books = (props) => {
    const [books, setBooks] = React.useState([]);
    React.useEffect(() => {
        if (props.loggedIn) {
            apiClient.interceptors.request.use(config => {
                config.headers['Authorization'] = `Bearer ${Cookies.get('access_token')}`;
                return config;
              });

            apiClient.get('/api/book')
            .then(response => {
                setBooks(response.data.data.books)
            })
            .catch(error => console.error(error));
        }
    }, []);
    const bookList = books.map((book) => 
        <div key={book.id}
            className="list-group-item"
        >
            <h5>{book.title}</h5>
            <small>{book.author}</small>
        </div>
    );
    if (props.loggedIn) {
        return (
            <div className="list-group">{bookList}</div>
        );
    }
    return (
        <div className="alert alert-warning">You are not logged in.</div>
    );
};

export default Books;
