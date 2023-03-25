import { Outlet } from 'react-router-dom';

import NavHeader from 'components/header/NavHeader';

const MainPage = () => {
  return (
    <main className='maincontainer'>
      <div className='mainchild'>
        <header className='header'>
          <NavHeader />
        </header>
        <section className='page'>
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default MainPage;
