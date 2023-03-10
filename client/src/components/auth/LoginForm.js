import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const LoginForm = () => {
    //Context
    const { loginUser } = useContext(AuthContext)

    //History
    const history = useNavigate()

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const { username, password } = loginForm

    const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    const login = async event => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {
                history("/dashboard")
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Form className='my-2' onSubmit={login}>
                <Form.Group className='my-2' >
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button className='my-2'
                    variant='success'
                    type='submit'>Login</Button>
            </Form>
            <p>Don't have an account
                <Link to='/register' >
                    <Button
                        variant='info'
                        size='sm'
                        className='ml-2'>
                        Register</Button>
                </Link>
            </p>
        </>)
}

export default LoginForm