import { useEffect, useState } from 'react';
import { login, register } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

function Home() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('tkn');
    if (token) {
      navigate('/chats');
    }
    setIsRegister(true);
  }, []);

  const handleSendForm = () => {
    if (email && email != '' && pass && pass != '') {
      const callRegister = async () => {
        setIsLoading(false);
        let token = null;
        if (isRegister) {
          token = await register(email, pass);
        } else {
          token = await login(email, pass);
        }
        localStorage.setItem('tkn', token);
        setIsLoading(false);
        navigate('/chats');
      };
      setIsLoading(true);
      callRegister();
    } else {
      setError('El email o la contraseña no es correcto');
    }
  };

  return (
    <div className="min-h-[100vh] min-w-[100vw] flex flex-col items-center justify-center align-middle">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="bg-gray-600 rounded-lg flex flex-col gap-4 w-full md:w-[900px] m-h-[30dvh] p-4">
          <div className="flex flex-row gap-6 justify-center">
            <div className="flex flex-row gap-2">
              <input
                id="draft"
                className="peer/draft"
                type="radio"
                name="status"
                checked={isRegister}
                onClick={() => {
                  setIsRegister(true);
                }}
              />
              <label className="peer-checked/draft:text-sky-500">
                Registrarse
              </label>
            </div>
            <div className="flex flex-row gap-2">
              <input
                id="published"
                className="peer/published"
                type="radio"
                name="status"
                onClick={() => {
                  setIsRegister(false);
                }}
              />
              <label className="peer-checked/published:text-sky-500">
                Login
              </label>
            </div>
          </div>

          <div className="flex flex-row gap-8 justify-start align-middle">
            <span className="w-20 text-start p-2">Email:</span>
            <input
              className="p-2 rounded-md"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-row gap-8 justify-start align-middle">
            <span className="w-20 text-start p-2">Password:</span>
            <input
              className="p-2 rounded-md"
              type="password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
          </div>

          {/*<div className="flex flex-row gap-4 justify-between">
              <span>User name:</span>
              <input type="text" />
            </div>*/}
          <button
            className="p-2 bg-slate-200 rounded-lg text-black hover:bg-slate-300"
            onClick={() => handleSendForm()}
          >
            Entrar
          </button>
          <span
            className={` ${
              error && error.length > 0 ? 'visible' : 'hidden'
            } text-sm text-red-400`}
          >
            {error}
          </span>
        </div>
      )}
    </div>
  );
}

export default Home;
