import { FormEvent } from 'react';
import { useAuth } from '../../context/AuthProvider.tsx';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  async function save(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const emailAddress = formData.get('emailAddress') as string;
    const password = formData.get('password') as string;

    const result = await auth.login(emailAddress, password);
    if (result !== null) {
      navigate('/');
    }
  }

  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <main>
      <form onSubmit={save}>
        <div>
          <label>
            Email Address
            <br />
            <input name="emailAddress" type="email" />
          </label>
        </div>
        <div>
          <label>
            Password
            <br />
            <input name="password" type="password" />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </main>
  );
};
