import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const  auth = localStorage.getItem('user');

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }

    return(
        <div>
        <img 
            src='https://t3.ftcdn.net/jpg/00/91/91/06/360_F_91910614_BhkcI01k8esjWxapqjwi7Wv15Z6ZcPYe.jpg'
            alt='logo'
            className='nav-logo'
        />
        { auth ?  <ul className='nav-ul'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/update">Update Products</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/signup" onClick={logout}>Logout ({JSON.parse(auth).username})</Link></li>
            </ul>
            :
            <ul className='nav-ul nav-right'>
                <li><Link to="/signup">SignUp</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>     
        }
        </div>
    )
}

export default Navbar;