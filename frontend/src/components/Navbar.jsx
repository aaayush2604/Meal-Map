import {Link} from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';
import {useLogOut} from '../Hooks/useLogOut';

export const Navbar=()=>{

    const {user}=useAuthContext();
    const {logout}=useLogOut();

    const handleClick=()=>{
        logout();
    }

    return <>
        <Link to='/'><h1>Meal Map</h1></Link>
        {user?<div><h3>{user.email}</h3><button onClick={handleClick}>LogOut</button><Link to='/user'><h4>User</h4></Link></div>:<div>
        <Link to='/login'><h4>Login</h4></Link>
        <Link to='/signup'><h4>SignUp</h4></Link>
        
        </div>}
        
    </>
}