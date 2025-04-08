import { useLocation } from 'react-router-dom';

import Signup from './Signup';
import Signup2 from './Signup2';
import Login from './Login';
import LoginForm from './LoginForm';
import Location from './Location';
import Calender from './Calender';
import Interest from './Interest';

export default function AppRoutes() {
  const location = useLocation();
  const path = location.pathname;

  const routeMap = {
    '/signup': <Signup />,
    '/sign': <Signup2 />,
    '/login': <Login />,
    '/signin': <LoginForm />,
    '/location': <Location />,
    '/calender': <Calender />,
    '/interest': <Interest />,
  };

  return routeMap[path] || <div>404 - Page Not Found</div>;
}
