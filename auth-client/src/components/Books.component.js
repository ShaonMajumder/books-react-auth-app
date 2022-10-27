import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../resources/app.css';
import Swal from 'sweetalert2';

import Table from 'react-bootstrap/Table';
import PaginationCustom from './Pagination';
import { useBooksQuery } from '../services/api';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import apiClient,{book_delete_url,useAddBookMutation} from '../services/api';
import { Redirect, useHistory } from 'react-router-dom';

// import { getBookItems } from '../reducers/bookSlice';
// import { useDispatch, useSelector } from "react-redux";

const BookList = (props) => {
    const history = useHistory();
    const [validationError,setValidationError] = useState({})
    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await apiClient.post(`${book_delete_url}/${id}`,[]).then(({data})=>{
            Swal.fire({
              icon:"success",
              text:data.message
            })
            
            history.push('/')
            
          }).catch(({response})=>{
            if(response.status===422){
              setValidationError(response.data.errors)
            }else{
              Swal.fire({
                text:response.data.message,
                icon:"error"
              })
            }
          })

         
    }

    // const [current_page, setCurrentPage] = useState(1);
    // const [last_page, setLastPage] = useState(1);
    const [page, setPage] = useState(1);
    var bookItems2 = [];
    var current_page = 0;
    var last_page = 0;
    var data_prop = [];
    const { data,  error, isLoading, isSuccess} = useBooksQuery(page, {skip: !props.loggedIn});
    const [addBook, { isLoading2 }] = useAddBookMutation()
    
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
                <td>{id}</td>
                <td>{title}</td>
                <td>{author}</td>
                <td>
                    <Button variant="danger" 
                    onClick={()=>deleteProduct(id)}
                    >Delete</Button>
                </td>
            </tr>
        );

        console.log('data props', data_prop)
        
        return (
            <div className="list-group">
                <Link className='btn btn-primary mb-2 float-end' to={"/books/create"}>
                    Create Book
                </Link>
                <Table responsive="sm" striped bordered hover >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Actions</th>
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

export default BookList;
