import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../resources/app.css';
import Table from 'react-bootstrap/Table';
import PaginationCustom from './Pagination';
import { useBooksQuery } from '../services/api';

// import { getBookItems } from '../reducers/bookSlice';
// import { useDispatch, useSelector } from "react-redux";

const Books = (props) => {
    // const [current_page, setCurrentPage] = useState(1);
    // const [last_page, setLastPage] = useState(1);
    const [page, setPage] = useState(1);
    var bookItems2 = [];
    var current_page = 0;
    var last_page = 0;
    var data_prop = [];
    const { data,  error, isLoading, isSuccess} = useBooksQuery(page, {skip: !props.loggedIn});
    
    if(data){
        bookItems2 = data.data.books.data
        current_page = data.data.books.current_page
        last_page = data.data.books.last_page
        data_prop = [1,current_page,last_page, isSuccess, setPage];
        // setCurrentPage(current_page)
        // setLastPage(last_page)
        console.log('data fetching', bookItems2)
        console.log('data full', data)
    }
    
    /*
    const dispatch = useDispatch();
    const { bookItems, error, isLoading, isSuccess } = useSelector((store) => store.books);
    console.log('test book items',bookItems)
    const isLoggedIn = useSelector((store) => store.books.isLoggedIn);
    console.log("If is logged in",isLoggedIn)
    const [books, setBooks] = React.useState([]);
    React.useEffect(() => {
        if (props.loggedIn) {
            dispatch(getBookItems());
            // dispatch(nextPage());
        }
    }, []);
    
    */


    if (props.loggedIn) {
        const bookList = bookItems2.map(({ id, title, author }) => 
            <tr key={id}>
                <td>id</td>
                <td>{title}</td>
                <td>{author}</td>
            </tr>
        );

        console.log('data props', data_prop)
        
        return (
            <div className="list-group">
                <Table responsive="sm" striped bordered hover >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Author</th>
                    </tr>
                    </thead>
                    <tbody>
                        {bookList}
                    </tbody>
                </Table>
                <PaginationCustom props={data_prop} ></PaginationCustom>
            </div>
        );
    }
    return (
        <div className="alert alert-warning">You are not logged in.</div>
    );
};

export default Books;
