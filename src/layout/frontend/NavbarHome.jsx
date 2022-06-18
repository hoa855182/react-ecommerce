import axios from 'axios'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import {useState} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function NavBarHome() {

  // const [loading,setLoading] = useState(true)
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null);


  const logoutSubmit =(e) => {
    e.preventDefault() 

    
   
    axios.get('/sanctum/csrf-cookie/').then((response) => {
      axios.post(`/api/logout`).then(res => {
        if(res.data.status === 200)
        {
          localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_name')
            swal('Success', res.data.message, 'success')
            history.push('/')
          
        }
        else
        {

        }
      })
    })
  }

  var AuthButtons ='';

  
  
  if(!localStorage.getItem('auth_token'))
  {
    AuthButtons = (
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <AccountCircleIcon/>
        </li>
        <li className='nav-item pt-2 border-bottom border-secondary'></li>
        <li className='nav-item pt-2'>
          <Link className="nav-link btn btn-primary btn-sm p-2 text-white" to="/Login">Login</Link>
        </li>
      </ul>
    )
  }
  else
  {
     AuthButtons =(
      <li className='nav-item'>
        <li className='nav-item line'>
          <AccountCircleIcon/>
        </li>
        <li className='nav-item pt-2 border-bottom border-secondary'></li>
        <button type="button" onClick={logoutSubmit} className="nav-link mt-2 btn btn-danger btn-sm text-white">
          Logout
        </button>
      </li>
     )
  }

  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Fear Of God
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Colection
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="#">Action</Link></li>
                <li><Link className="dropdown-item" to="#">Another action</Link></li>
                <li><hr className="dropdown-divider"/></li>
                <li><Link className="dropdown-item" to="#">Something else here</Link></li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div>
              <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                <PersonIcon/>
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
              
                <Typography sx={{ p: 2 }}>
                  {AuthButtons}
                </Typography>
              </Popover>
            </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBarHome
