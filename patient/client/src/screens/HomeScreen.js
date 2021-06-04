import React, {useEffect} from 'react'
import Meta from '../components/Meta'
import LoginScreen from './LoginScreen'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
function HomeScreen() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const history = useHistory();
  useEffect(() => {
    if (userInfo) {
      //history.push(redirect)
    } else {
      history.push('/login')
    }
  }, [history, userInfo])
  return (
    <div>
      <Meta title='Information n Registration' />
      <ul style={{margin: 5, padding:10}}>
      <li><Link to='/register'>Register Patient</Link></li>
      <li><Link to='/admin/patientlist'>Patient List</Link>(update patient, update patient status, delete)</li>
      </ul>
    </div>
  )
}

export default HomeScreen
